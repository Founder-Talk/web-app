const Message = require("../models/message.model");
const Session = require("../models/session.model");
const User = require("../models/user.model");
const { z } = require("zod");

// Send a message
const sendMessage = async (req, res) => {
    try {
        const schema = z.object({
            sessionId: z.string(),
            content: z.string().min(1, "Message content is required").max(1000),
            messageType: z.enum(["text", "file", "image"]).default("text"),
            fileUrl: z.string().optional()
        }).strict();

        const { success, data, error } = schema.safeParse(req.body);
        if (error || !success) {
            return res.status(400).json({
                message: "Invalid message data",
                error: error?.errors
            });
        }

        const { sessionId, content, messageType, fileUrl } = data;

        // Check if session exists and user is part of it
        const session = await Session.findOne({
            _id: sessionId,
            $or: [{ mentor: req.user.id }, { mentee: req.user.id }],
            status: { $in: ["accepted", "completed"] }
        });

        if (!session) {
            return res.status(404).json({
                message: "Session not found or not accessible"
            });
        }

        // Determine receiver
        const receiver = session.mentor.toString() === req.user.id ? session.mentee : session.mentor;

        const message = await Message.create({
            session: sessionId,
            sender: req.user.id,
            receiver,
            content,
            messageType,
            fileUrl
        });

        const populatedMessage = await Message.findById(message._id)
            .populate('sender', 'name profilePic')
            .populate('receiver', 'name profilePic');

        res.status(201).json({
            message: "Message sent successfully",
            data: populatedMessage
        });
    } catch (err) {
        return res.status(500).json({
            message: err.message
        });
    }
};

// Get messages for a session
const getSessionMessages = async (req, res) => {
    try {
        const { sessionId } = req.params;
        const { page = 1, limit = 50 } = req.query;

        // Check if session exists and user is part of it
        const session = await Session.findOne({
            _id: sessionId,
            $or: [{ mentor: req.user.id }, { mentee: req.user.id }]
        });

        if (!session) {
            return res.status(404).json({
                message: "Session not found or not accessible"
            });
        }

        const skip = (parseInt(page) - 1) * parseInt(limit);

        const messages = await Message.find({ session: sessionId })
            .populate('sender', 'name profilePic')
            .populate('receiver', 'name profilePic')
            .skip(skip)
            .limit(parseInt(limit))
            .sort({ createdAt: -1 });

        const total = await Message.countDocuments({ session: sessionId });

        res.status(200).json({
            messages: messages.reverse(), // Return in chronological order
            pagination: {
                currentPage: parseInt(page),
                totalPages: Math.ceil(total / parseInt(limit)),
                totalMessages: total,
                hasNext: skip + messages.length < total,
                hasPrev: parseInt(page) > 1
            }
        });
    } catch (err) {
        return res.status(500).json({
            message: err.message
        });
    }
};

// Mark messages as read
const markMessagesAsRead = async (req, res) => {
    try {
        const { sessionId } = req.params;

        // Check if session exists and user is part of it
        const session = await Session.findOne({
            _id: sessionId,
            $or: [{ mentor: req.user.id }, { mentee: req.user.id }]
        });

        if (!session) {
            return res.status(404).json({
                message: "Session not found or not accessible"
            });
        }

        // Mark all unread messages sent to current user as read
        await Message.updateMany(
            {
                session: sessionId,
                receiver: req.user.id,
                isRead: false
            },
            {
                isRead: true,
                readAt: new Date()
            }
        );

        res.status(200).json({
            message: "Messages marked as read"
        });
    } catch (err) {
        return res.status(500).json({
            message: err.message
        });
    }
};

// Get unread message count
const getUnreadMessageCount = async (req, res) => {
    try {
        const { sessionId } = req.params;

        // Check if session exists and user is part of it
        const session = await Session.findOne({
            _id: sessionId,
            $or: [{ mentor: req.user.id }, { mentee: req.user.id }]
        });

        if (!session) {
            return res.status(404).json({
                message: "Session not found or not accessible"
            });
        }

        const unreadCount = await Message.countDocuments({
            session: sessionId,
            receiver: req.user.id,
            isRead: false
        });

        res.status(200).json({
            unreadCount
        });
    } catch (err) {
        return res.status(500).json({
            message: err.message
        });
    }
};

// Delete a message (only sender can delete)
const deleteMessage = async (req, res) => {
    try {
        const { messageId } = req.params;

        const message = await Message.findOne({
            _id: messageId,
            sender: req.user.id
        });

        if (!message) {
            return res.status(404).json({
                message: "Message not found or you don't have permission to delete it"
            });
        }

        await Message.findByIdAndDelete(messageId);

        res.status(200).json({
            message: "Message deleted successfully"
        });
    } catch (err) {
        return res.status(500).json({
            message: err.message
        });
    }
};

module.exports = {
    sendMessage,
    getSessionMessages,
    markMessagesAsRead,
    getUnreadMessageCount,
    deleteMessage
}; 