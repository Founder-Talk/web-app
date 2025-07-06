const User = require("../models/user.model");
const Session = require("../models/session.model");
const Message = require("../models/message.model");
const { z } = require("zod");

// Verify a mentor (admin only)
const verifyMentor = async (req, res) => {
    try {
        const { mentorId } = req.params;
        const { isVerified } = req.body;

        const user = await User.findById(req.user.id);
        if (!user || user.role !== "admin") {
            return res.status(403).json({
                message: "Only admins can verify mentors"
            });
        }

        const mentor = await User.findOne({ _id: mentorId, role: "mentor" });
        if (!mentor) {
            return res.status(404).json({
                message: "Mentor not found"
            });
        }

        mentor.isVerified = isVerified;
        await mentor.save();

        res.status(200).json({
            message: `Mentor ${isVerified ? 'verified' : 'unverified'} successfully`,
            mentor: {
                _id: mentor._id,
                name: mentor.name,
                email: mentor.email,
                isVerified: mentor.isVerified
            }
        });
    } catch (err) {
        return res.status(500).json({
            message: err.message
        });
    }
};

// Get all pending mentor verifications
const getPendingMentors = async (req, res) => {
    try {
        const user = await User.findById(req.user.id);
        if (!user || user.role !== "admin") {
            return res.status(403).json({
                message: "Only admins can view pending mentors"
            });
        }

        const { page = 1, limit = 10 } = req.query;
        const skip = (parseInt(page) - 1) * parseInt(limit);

        const pendingMentors = await User.find({ 
            role: "mentor", 
            isVerified: false 
        })
        .select('name email bio domainExpertise experience linkedinProfile createdAt')
        .skip(skip)
        .limit(parseInt(limit))
        .sort({ createdAt: -1 });

        const total = await User.countDocuments({ 
            role: "mentor", 
            isVerified: false 
        });

        res.status(200).json({
            pendingMentors,
            pagination: {
                currentPage: parseInt(page),
                totalPages: Math.ceil(total / parseInt(limit)),
                totalPending: total,
                hasNext: skip + pendingMentors.length < total,
                hasPrev: parseInt(page) > 1
            }
        });
    } catch (err) {
        return res.status(500).json({
            message: err.message
        });
    }
};

// Get platform statistics
const getPlatformStats = async (req, res) => {
    try {
        const user = await User.findById(req.user.id);
        if (!user || user.role !== "admin") {
            return res.status(403).json({
                message: "Only admins can view platform statistics"
            });
        }

        // Get user counts
        const totalUsers = await User.countDocuments();
        const totalMentors = await User.countDocuments({ role: "mentor" });
        const totalMentees = await User.countDocuments({ role: "mentee" });
        const verifiedMentors = await User.countDocuments({ role: "mentor", isVerified: true });
        const pendingMentors = await User.countDocuments({ role: "mentor", isVerified: false });

        // Get session counts
        const totalSessions = await Session.countDocuments();
        const completedSessions = await Session.countDocuments({ status: "completed" });
        const pendingSessions = await Session.countDocuments({ status: "pending" });
        const activeSessions = await Session.countDocuments({ status: "accepted" });

        // Get message count
        const totalMessages = await Message.countDocuments();

        // Get average rating
        const sessionsWithRating = await Session.find({ 
            status: "completed", 
            rating: { $exists: true } 
        });
        const averageRating = sessionsWithRating.length > 0 
            ? sessionsWithRating.reduce((sum, session) => sum + session.rating, 0) / sessionsWithRating.length 
            : 0;

        // Get recent activity (last 7 days)
        const sevenDaysAgo = new Date();
        sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

        const recentSessions = await Session.countDocuments({
            createdAt: { $gte: sevenDaysAgo }
        });

        const recentUsers = await User.countDocuments({
            createdAt: { $gte: sevenDaysAgo }
        });

        res.status(200).json({
            users: {
                total: totalUsers,
                mentors: totalMentors,
                mentees: totalMentees,
                verifiedMentors,
                pendingMentors
            },
            sessions: {
                total: totalSessions,
                completed: completedSessions,
                pending: pendingSessions,
                active: activeSessions
            },
            messages: {
                total: totalMessages
            },
            ratings: {
                average: Math.round(averageRating * 10) / 10,
                totalRatedSessions: sessionsWithRating.length
            },
            recentActivity: {
                sessionsLast7Days: recentSessions,
                newUsersLast7Days: recentUsers
            }
        });
    } catch (err) {
        return res.status(500).json({
            message: err.message
        });
    }
};

// Get all users (admin only)
const getAllUsers = async (req, res) => {
    try {
        const user = await User.findById(req.user.id);
        if (!user || user.role !== "admin") {
            return res.status(403).json({
                message: "Only admins can view all users"
            });
        }

        const { role, page = 1, limit = 20 } = req.query;
        const skip = (parseInt(page) - 1) * parseInt(limit);

        const query = {};
        if (role) {
            query.role = role;
        }

        const users = await User.find(query)
            .select('-password')
            .skip(skip)
            .limit(parseInt(limit))
            .sort({ createdAt: -1 });

        const total = await User.countDocuments(query);

        res.status(200).json({
            users,
            pagination: {
                currentPage: parseInt(page),
                totalPages: Math.ceil(total / parseInt(limit)),
                totalUsers: total,
                hasNext: skip + users.length < total,
                hasPrev: parseInt(page) > 1
            }
        });
    } catch (err) {
        return res.status(500).json({
            message: err.message
        });
    }
};

// Get all sessions (admin only)
const getAllSessions = async (req, res) => {
    try {
        const user = await User.findById(req.user.id);
        if (!user || user.role !== "admin") {
            return res.status(403).json({
                message: "Only admins can view all sessions"
            });
        }

        const { status, page = 1, limit = 20 } = req.query;
        const skip = (parseInt(page) - 1) * parseInt(limit);

        const query = {};
        if (status) {
            query.status = status;
        }

        const sessions = await Session.find(query)
            .populate('mentor', 'name email')
            .populate('mentee', 'name email')
            .skip(skip)
            .limit(parseInt(limit))
            .sort({ createdAt: -1 });

        const total = await Session.countDocuments(query);

        res.status(200).json({
            sessions,
            pagination: {
                currentPage: parseInt(page),
                totalPages: Math.ceil(total / parseInt(limit)),
                totalSessions: total,
                hasNext: skip + sessions.length < total,
                hasPrev: parseInt(page) > 1
            }
        });
    } catch (err) {
        return res.status(500).json({
            message: err.message
        });
    }
};

// Delete a user (admin only)
const deleteUser = async (req, res) => {
    try {
        const { userId } = req.params;
        const user = await User.findById(req.user.id);
        
        if (!user || user.role !== "admin") {
            return res.status(403).json({
                message: "Only admins can delete users"
            });
        }

        const userToDelete = await User.findById(userId);
        if (!userToDelete) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        // Delete associated sessions and messages
        await Session.deleteMany({
            $or: [{ mentor: userId }, { mentee: userId }]
        });

        await Message.deleteMany({
            $or: [{ sender: userId }, { receiver: userId }]
        });

        await User.findByIdAndDelete(userId);

        res.status(200).json({
            message: "User and associated data deleted successfully"
        });
    } catch (err) {
        return res.status(500).json({
            message: err.message
        });
    }
};

module.exports = {
    verifyMentor,
    getPendingMentors,
    getPlatformStats,
    getAllUsers,
    getAllSessions,
    deleteUser
}; 