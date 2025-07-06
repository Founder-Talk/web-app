const express = require("express");
const router = express.Router();

const {
    createSession,
    getUserSessions,
    acceptSession,
    rejectSession,
    completeSession,
    cancelSession,
    getSessionDetails,
    addSessionFeedback
} = require("../controllers/sessionController");

const authMiddleware = require("../middlewares/authMiddleware");

// All session routes require authentication
router.use(authMiddleware);

// Session management
router.post("/", createSession);
router.get("/", getUserSessions);
router.get("/:sessionId", getSessionDetails);

// Session actions
router.put("/:sessionId/accept", acceptSession);
router.put("/:sessionId/reject", rejectSession);
router.put("/:sessionId/complete", completeSession);
router.put("/:sessionId/cancel", cancelSession);

// Feedback
router.post("/:sessionId/feedback", addSessionFeedback);

module.exports = router; 