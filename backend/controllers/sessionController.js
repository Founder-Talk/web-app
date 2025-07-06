const Session = require("../models/session.model");
const User = require("../models/user.model");
const { z } = require("zod");

// Create a new session request
const createSession = async (req, res) => {
    try {
        const schema = z.object({
            mentorId: z.string(),
            title: z.string().min(1, "Title is required"),
            description: z.string().optional(),
            scheduledDate: z.string().datetime(),
            duration: z.number().min(15).max(480),
            sessionType: z.enum(["chat", "video", "async"]).default("chat")
        }).strict();

        const { success, data, error } = schema.safeParse(req.body);
        if (error || !success) {
            return res.status(400).json({
                message: "Invalid data provided",
                error: error?.errors
            });
        }

        const { mentorId, title, description, scheduledDate, duration, sessionType } = data;

        // Check if mentor exists and is verified
        const mentor = await User.findOne({ _id: mentorId, role: "mentor", isVerified: true });
        if (!mentor) {
            return res.status(404).json({
                message: "Mentor not found or not verified"
            });
        }

        // Check if mentee exists
        const mentee = await User.findById(req.user.id);
        if (!mentee || mentee.role !== "mentee") {
            return res.status(403).json({
                message: "Only mentees can create session requests"
            });
        }

        // Check if the scheduled date is in the future
        const sessionDate = new Date(scheduledDate);
        if (sessionDate <= new Date()) {
            return res.status(400).json({
                message: "Session must be scheduled for a future date"
            });
        }

        // Calculate session amount if mentor has hourly rate
        let amount = 0;
        if (mentor.hourlyRate) {
            amount = (mentor.hourlyRate * duration) / 60; // Convert minutes to hours
        }

        const session = await Session.create({
            mentor: mentorId,
            mentee: req.user.id,
            title,
            description,
            scheduledDate: sessionDate,
            duration,
            sessionType,
            amount
        });

        const populatedSession = await Session.findById(session._id)
            .populate('mentor', 'name email profilePic')
            .populate('mentee', 'name email profilePic');

        res.status(201).json({
            message: "Session request created successfully",
            session: populatedSession
        });
    } catch (err) {
        return res.status(500).json({
            message: err.message
        });
    }
};

// Get sessions for a user (mentor or mentee)
const getUserSessions = async (req, res) => {
    try {
        const { status, page = 1, limit = 10 } = req.query;
        const user = await User.findById(req.user.id);

        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        const query = {};
        if (user.role === "mentor") {
            query.mentor = req.user.id;
        } else {
            query.mentee = req.user.id;
        }

        if (status) {
            query.status = status;
        }

        const skip = (parseInt(page) - 1) * parseInt(limit);
        
        const sessions = await Session.find(query)
            .populate('mentor', 'name email profilePic')
            .populate('mentee', 'name email profilePic')
            .skip(skip)
            .limit(parseInt(limit))
            .sort({ scheduledDate: -1 });

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

// Accept session request (mentor only)
const acceptSession = async (req, res) => {
    try {
        const { sessionId } = req.params;
        const user = await User.findById(req.user.id);

        if (!user || user.role !== "mentor") {
            return res.status(403).json({
                message: "Only mentors can accept session requests"
            });
        }

        const session = await Session.findOne({
            _id: sessionId,
            mentor: req.user.id,
            status: "pending"
        });

        if (!session) {
            return res.status(404).json({
                message: "Session request not found"
            });
        }

        session.status = "accepted";
        session.acceptedAt = new Date();
        await session.save();

        const populatedSession = await Session.findById(session._id)
            .populate('mentor', 'name email profilePic')
            .populate('mentee', 'name email profilePic');

        res.status(200).json({
            message: "Session accepted successfully",
            session: populatedSession
        });
    } catch (err) {
        return res.status(500).json({
            message: err.message
        });
    }
};

// Reject session request (mentor only)
const rejectSession = async (req, res) => {
    try {
        const { sessionId } = req.params;
        const { reason } = req.body;
        const user = await User.findById(req.user.id);

        if (!user || user.role !== "mentor") {
            return res.status(403).json({
                message: "Only mentors can reject session requests"
            });
        }

        const session = await Session.findOne({
            _id: sessionId,
            mentor: req.user.id,
            status: "pending"
        });

        if (!session) {
            return res.status(404).json({
                message: "Session request not found"
            });
        }

        session.status = "rejected";
        session.cancellationReason = reason;
        session.cancelledAt = new Date();
        session.cancelledBy = req.user.id;
        await session.save();

        const populatedSession = await Session.findById(session._id)
            .populate('mentor', 'name email profilePic')
            .populate('mentee', 'name email profilePic');

        res.status(200).json({
            message: "Session rejected successfully",
            session: populatedSession
        });
    } catch (err) {
        return res.status(500).json({
            message: err.message
        });
    }
};

// Complete session
const completeSession = async (req, res) => {
    try {
        const { sessionId } = req.params;
        const user = await User.findById(req.user.id);

        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        const session = await Session.findOne({
            _id: sessionId,
            $or: [{ mentor: req.user.id }, { mentee: req.user.id }],
            status: "accepted"
        });

        if (!session) {
            return res.status(404).json({
                message: "Session not found or not accepted"
            });
        }

        session.status = "completed";
        session.completedAt = new Date();
        await session.save();

        // Update mentor's total sessions count
        if (user.role === "mentor") {
            await User.findByIdAndUpdate(req.user.id, {
                $inc: { totalSessions: 1 }
            });
        }

        const populatedSession = await Session.findById(session._id)
            .populate('mentor', 'name email profilePic')
            .populate('mentee', 'name email profilePic');

        res.status(200).json({
            message: "Session completed successfully",
            session: populatedSession
        });
    } catch (err) {
        return res.status(500).json({
            message: err.message
        });
    }
};

// Cancel session
const cancelSession = async (req, res) => {
    try {
        const { sessionId } = req.params;
        const { reason } = req.body;
        const user = await User.findById(req.user.id);

        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        const session = await Session.findOne({
            _id: sessionId,
            $or: [{ mentor: req.user.id }, { mentee: req.user.id }],
            status: { $in: ["pending", "accepted"] }
        });

        if (!session) {
            return res.status(404).json({
                message: "Session not found or cannot be cancelled"
            });
        }

        session.status = "cancelled";
        session.cancellationReason = reason;
        session.cancelledAt = new Date();
        session.cancelledBy = req.user.id;
        await session.save();

        const populatedSession = await Session.findById(session._id)
            .populate('mentor', 'name email profilePic')
            .populate('mentee', 'name email profilePic');

        res.status(200).json({
            message: "Session cancelled successfully",
            session: populatedSession
        });
    } catch (err) {
        return res.status(500).json({
            message: err.message
        });
    }
};

// Get session details
const getSessionDetails = async (req, res) => {
    try {
        const { sessionId } = req.params;
        const user = await User.findById(req.user.id);

        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        const session = await Session.findOne({
            _id: sessionId,
            $or: [{ mentor: req.user.id }, { mentee: req.user.id }]
        }).populate('mentor', 'name email profilePic bio domainExpertise')
          .populate('mentee', 'name email profilePic');

        if (!session) {
            return res.status(404).json({
                message: "Session not found"
            });
        }

        res.status(200).json(session);
    } catch (err) {
        return res.status(500).json({
            message: err.message
        });
    }
};

// Add session feedback
const addSessionFeedback = async (req, res) => {
    try {
        const { sessionId } = req.params;
        const { rating, feedback } = req.body;

        const schema = z.object({
            rating: z.number().min(1).max(5),
            feedback: z.string().max(500).optional()
        });

        const { success, error } = schema.safeParse({ rating, feedback });
        if (!success) {
            return res.status(400).json({
                message: "Invalid feedback data",
                error: error?.errors
            });
        }

        const session = await Session.findOne({
            _id: sessionId,
            mentee: req.user.id,
            status: "completed"
        });

        if (!session) {
            return res.status(404).json({
                message: "Session not found or not completed"
            });
        }

        if (session.rating) {
            return res.status(400).json({
                message: "Feedback already provided for this session"
            });
        }

        session.rating = rating;
        session.feedback = feedback;
        await session.save();

        // Update mentor's average rating
        const mentorSessions = await Session.find({
            mentor: session.mentor,
            status: "completed",
            rating: { $exists: true }
        });

        const totalRating = mentorSessions.reduce((sum, s) => sum + s.rating, 0);
        const averageRating = totalRating / mentorSessions.length;

        await User.findByIdAndUpdate(session.mentor, {
            rating: Math.round(averageRating * 10) / 10 // Round to 1 decimal place
        });

        res.status(200).json({
            message: "Feedback submitted successfully",
            session
        });
    } catch (err) {
        return res.status(500).json({
            message: err.message
        });
    }
};

module.exports = {
    createSession,
    getUserSessions,
    acceptSession,
    rejectSession,
    completeSession,
    cancelSession,
    getSessionDetails,
    addSessionFeedback
}; 