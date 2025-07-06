const express = require("express");
const router = express.Router();

const {
    sendMessage,
    getSessionMessages,
    markMessagesAsRead,
    getUnreadMessageCount,
    deleteMessage
} = require("../controllers/messageController");

const authMiddleware = require("../middlewares/authMiddleware");

// All message routes require authentication
router.use(authMiddleware);

// Message management
router.post("/", sendMessage);
router.get("/session/:sessionId", getSessionMessages);
router.put("/session/:sessionId/read", markMessagesAsRead);
router.get("/session/:sessionId/unread", getUnreadMessageCount);
router.delete("/:messageId", deleteMessage);

module.exports = router; 