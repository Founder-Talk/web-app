const express = require("express");
const router = express.Router();

const {
    verifyMentor,
    getPendingMentors,
    getPlatformStats,
    getAllUsers,
    getAllSessions,
    deleteUser
} = require("../controllers/adminController");

const authMiddleware = require("../middlewares/authMiddleware");

// All admin routes require authentication
router.use(authMiddleware);

// Mentor verification
router.get("/mentors/pending", getPendingMentors);
router.put("/mentors/:mentorId/verify", verifyMentor);

// Platform statistics
router.get("/stats", getPlatformStats);

// User management
router.get("/users", getAllUsers);
router.delete("/users/:userId", deleteUser);

// Session management
router.get("/sessions", getAllSessions);

module.exports = router; 