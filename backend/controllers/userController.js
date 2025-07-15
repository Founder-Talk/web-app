const User = require("../models/user.model");
const bcrypt = require('bcrypt');
const crypto = require('crypto');
const { z } = require("zod");
const generateToken = require("../utils/generateToken");
const { sendVerificationEmail } = require("../utils/emailService");
const saltRounds = 10;
const { uploadOnCloudinary } = require('../utils/cloudinary');

/* Signup and Signin Controllers */
const userSignup = async (req, res) => {
    try {
        /* Zod Validation */
        const schema = (z.object({
            name: z.string(),
            email: z.string().email(),
            role: z.enum(["mentee", "mentor"]).optional(), // Optional
            company: z.string().optional(), // Optional
            experience: z.number().optional(), 
            profilePic: z.string().url().optional(), // Optional
            password: z.string().min(6)
        })).strict(); // Disallow unknown keys

        const { success, error, data } = schema.safeParse(req.body);
        if (error || !success) {
            return res.status(400).json({
                message: "Invalid Credentials",
                data
            });
        }
        const { name, email, role, company, experience, password } = data;
        const user = await User.find({ email });

        if (user.length > 0) {
            return res.status(400).json({
                message: "User already exists"
            });
        }

        const salt = await bcrypt.genSalt(saltRounds);
        const hashedPassword = await bcrypt.hash(password, salt);
        
        // Generate 6-digit OTP
        const emailVerificationOTP = Math.floor(100000 + Math.random() * 900000).toString();
        const emailVerificationExpires = new Date(Date.now() + 15 * 60 * 1000); // 15 minutes
        
        const createdUser = await User.create({
            name,
            email,
            role,
            company,
            experience,
            password: hashedPassword,
            emailVerificationOTP,
            emailVerificationExpires
        });

        // Send OTP email
        const emailSent = await sendVerificationEmail(email, emailVerificationOTP, name);
        
        if (!emailSent) {
            // If email fails, still create user but log the error
            console.error('Failed to send verification email to:', email);
        }

        return res.status(201).json({
            _id: createdUser._id,
            name: createdUser.name,
            email: createdUser.email,
            role: createdUser.role,
            company: createdUser.company,
            experience: createdUser.experience,
            isEmailVerified: createdUser.isEmailVerified,
            message: emailSent ? "Account created successfully! Please check your email for the OTP to verify your account." : "Account created successfully! Please check your email for the OTP (email delivery may be delayed)."
        });

    } catch (err) {
        return res.status(500).json({
            message: err.message
        });
    }
}

const userSignin = async (req, res) => {
    try {
        /* Zod Validation */
        const schema = (z.object({
            email: z.string().email(),
            password: z.string().min(6),
            role: z.enum(["mentee", "mentor"]).optional(),
        })).strict(); // Disallow unknown keys

        const { success, data, error } = schema.safeParse(req.body);
        if (error || !success) {
            return res.status(400).json({
                message: "Invalid Credentials"
            });
        }

        const { email, password } = data;

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({
                message: "User doesn't exist"
            });
        }

        const result = await bcrypt.compare(password, user.password);
        if (!result) {
            return res.status(401).json({
                message: "Wrong password"
            });
        }

        // Check if email is verified
        if (!user.isEmailVerified) {
            return res.status(401).json({
                message: "Please verify your email address before signing in. Check your inbox for the verification link.",
                isEmailVerified: false
            });
        }

        const token = generateToken(user._id, user.email);

        return res.status(200).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
            company: user.company,
            experience: user.experience,
            bio: user.bio,
            education: user.education,
            goals: user.goals,
            areasOfInterest: user.areasOfInterest,
            domainExpertise: user.domainExpertise,
            linkedinProfile: user.linkedinProfile,
            hourlyRate: user.hourlyRate,
            availability: user.availability,
            // isVerified: user.isVerified,
            rating: user.rating,
            totalSessions: user.totalSessions,
            subscriptionPlan: user.subscriptionPlan,
            isEmailVerified: user.isEmailVerified,
            token: token
        });

    } catch (err) {
        return res.status(500).json({
            message: err.message
        });
    }
}

const logout = (req, res) => {
    try {
        return res.status(200).json({
            message: "Logged out successfully. Please remove the token from client storage."
        });
    } catch (err) {
        return res.status(500).json({
            message: err.message
        });
    }
}

// Get user profile
const getUserProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password');
        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }
        res.status(200).json(user);
    } catch (err) {
        return res.status(500).json({
            message: err.message
        });
    }
}

// Update user profile
const updateUserProfile = async (req, res) => {
    try {
        let profilePicUrl = undefined;
        if (req.file) {
            const cloudinaryResult = await uploadOnCloudinary(req.file.path);
            profilePicUrl = cloudinaryResult?.secure_url;
        }
        const schema = z.object({
            name: z.string().optional(),
            bio: z.string().max(500).optional(),
            education: z.string().optional(),
            goals: z.string().max(300).optional(),
            areasOfInterest: z.array(z.string()).optional(),
            company: z.string().optional(),
            experience: z.number().min(0).optional(),
            profilePic: z.string().url().optional(),
            // Mentor specific fields
            domainExpertise: z.array(z.string()).optional(),
            linkedinProfile: z.string().optional(),
            hourlyRate: z.number().min(0).optional(),
            availability: z.array(z.object({
                day: z.enum(["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"]),
                slots: z.array(z.object({
                    startTime: z.string(),
                    endTime: z.string()
                }))
            })).optional()
        }).strict();

        const { success, data, error } = schema.safeParse(req.body);
        if (error || !success) {
            return res.status(400).json({
                message: "Invalid data provided"
            });
        }
        if (profilePicUrl) {
            data.profilePic = profilePicUrl;
        }
        const user = await User.findByIdAndUpdate(
            req.user.id,
            { $set: data },
            { new: true, runValidators: true }
        ).select('-password');

        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        res.status(200).json({
            message: "Profile updated successfully",
            user
        });
    } catch (err) {
        return res.status(500).json({
            message: err.message
        });
    }
}

// Get all mentors (for mentee dashboard)
const getAllMentors = async (req, res) => {
    try {
        const { 
            search, 
            expertise, 
            minRating, 
            maxRate, 
            page = 1, 
            limit = 10 
        } = req.query;

        // const query = { role: "mentor", isVerified: true };
        const query = { role: "mentor" };
        
        // Search by name or bio
        if (search) {
            query.$or = [
                { name: { $regex: search, $options: 'i' } },
                { bio: { $regex: search, $options: 'i' } }
            ];
        }

        // Filter by expertise
        if (expertise) {
            query.domainExpertise = { $in: [expertise] };
        }

        // Filter by minimum rating
        if (minRating) {
            query.rating = { $gte: parseFloat(minRating) };
        }

        // Filter by maximum hourly rate
        if (maxRate) {
            query.hourlyRate = { $lte: parseFloat(maxRate) };
        }

        const skip = (parseInt(page) - 1) * parseInt(limit);
        
        const mentors = await User.find(query)
            .select('name bio domainExpertise hourlyRate rating totalSessions profilePic company experience')
            .skip(skip)
            .limit(parseInt(limit))
            .sort({ rating: -1, totalSessions: -1 });

        const total = await User.countDocuments(query);

        res.status(200).json({
            mentors,
            pagination: {
                currentPage: parseInt(page),
                totalPages: Math.ceil(total / parseInt(limit)),
                totalMentors: total,
                hasNext: skip + mentors.length < total,
                hasPrev: parseInt(page) > 1
            }
        });
    } catch (err) {
        return res.status(500).json({
            message: err.message
        });
    }
}

// Get mentor details
const getMentorDetails = async (req, res) => {
    try {
        const { mentorId } = req.params;
        
        const mentor = await User.findOne({ 
            _id: mentorId, 
            role: "mentor", 
            // isVerified: true 
        }).select('-password');

        if (!mentor) {
            return res.status(404).json({
                message: "Mentor not found"
            });
        }

        res.status(200).json(mentor);
    } catch (err) {
        return res.status(500).json({
            message: err.message
        });
    }
}

// Update subscription plan
const updateSubscriptionPlan = async (req, res) => {
    try {
        const { subscriptionPlan } = req.body;
        
        if (!["free", "pro"].includes(subscriptionPlan)) {
            return res.status(400).json({
                message: "Invalid subscription plan"
            });
        }

        const user = await User.findByIdAndUpdate(
            req.user.id,
            { subscriptionPlan },
            { new: true }
        ).select('-password');

        res.status(200).json({
            message: "Subscription plan updated successfully",
            subscriptionPlan: user.subscriptionPlan
        });
    } catch (err) {
        return res.status(500).json({
            message: err.message
        });
    }
}

// POST /user/verify-email { email, otp }
const verifyEmail = async (req, res) => {
    try {
        const { email, otp } = req.body;
        if (!email || !otp) {
            return res.status(400).json({ message: "Email and OTP are required" });
        }
        const user = await User.findOne({
            email,
            emailVerificationOTP: otp,
            emailVerificationExpires: { $gt: Date.now() }
        });
        if (!user) {
            return res.status(400).json({ message: "Invalid or expired OTP" });
        }
        user.isEmailVerified = true;
        user.emailVerificationOTP = undefined;
        user.emailVerificationExpires = undefined;
        await user.save();
        return res.status(200).json({
            message: "Email verified successfully! You can now sign in to your account.",
            isEmailVerified: true
        });
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
}

const resendVerificationEmail = async (req, res) => {
    try {
        const { email } = req.body;
        console.log("Resending verification email for:", req.body);
        if (!email) {
            return res.status(400).json({ message: "Email is required" });
        }
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        if (user.isEmailVerified) {
            return res.status(400).json({ message: "Email is already verified" });
        }
        // Generate new OTP
        const emailVerificationOTP = Math.floor(100000 + Math.random() * 900000).toString();
        const emailVerificationExpires = new Date(Date.now() + 15 * 60 * 1000); // 15 minutes
        user.emailVerificationOTP = emailVerificationOTP;
        user.emailVerificationExpires = emailVerificationExpires;
        await user.save();
        // Send OTP email
        const emailSent = await sendVerificationEmail(email, emailVerificationOTP, user.name);
        if (!emailSent) {
            return res.status(500).json({ message: "Failed to send verification email. Please try again later." });
        }
        res.status(200).json({ message: "Verification OTP sent successfully! Please check your inbox." });
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
}

module.exports = {
    userSignin,
    userSignup,
    logout,
    getUserProfile,
    updateUserProfile,
    getAllMentors,
    getMentorDetails,
    updateSubscriptionPlan,
    verifyEmail,
    resendVerificationEmail
};