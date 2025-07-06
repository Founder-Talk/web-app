const express = require("express");
const router = express.Router();

const { 
    userSignup, 
    userSignin, 
    logout, 
    getUserProfile, 
    updateUserProfile, 
    getAllMentors, 
    getMentorDetails, 
    updateSubscriptionPlan,
    verifyEmail,
    resendVerificationEmail
} = require("../controllers/userController");
const authMiddleware = require("../middlewares/authMiddleware");

// Public routes
router.post("/signup", userSignup);
router.post("/signin", userSignin);
router.post("/logout", logout);

router.post("/verify-email", verifyEmail);
router.post("/resend-verification", resendVerificationEmail);

// Protected routes
router.get("/profile", authMiddleware, getUserProfile);
router.put("/profile", authMiddleware, updateUserProfile);
router.put("/subscription", authMiddleware, updateSubscriptionPlan);

// Mentor search (public but can be enhanced with auth for personalized results)
router.get("/mentors", getAllMentors);
router.get("/mentors/:mentorId", getMentorDetails);

// Test route
router.get("/", authMiddleware, (req, res) => {
    res.send("AuthMiddleware Activated!");
});

module.exports = router;