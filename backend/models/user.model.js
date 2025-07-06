const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please enter your Name!"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Please enter your Email!"],
      unique: true,
      trim: true,
      lowercase: true,
      match: [
        /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, //regex for matching the email attributes
        "Please enter a valid Email Address!",
      ],
    },
    role: {
      type: String,
      enum: ["mentee", "mentor", "admin"], // Only Mentee, Mentor in User Interface
      default: "mentee",
    },
    profilePic: {
      type: String // cloudinary url
    },
    company: {
      type: String,
      trim: true,
      default: "Not Specified"
    },
    experience: {
      type: Number,
      min: [0, "Experience cannot be negative"] 
    },
    password: {
      type: String,
      trim: true,
      required: [true, "Please enter your Password"],
      minlength: [6, "Password must be at least 6 characters long"],
    },
    // Additional fields for mentorship platform
    bio: {
      type: String,
      trim: true,
      maxlength: [500, "Bio cannot exceed 500 characters"]
    },
    education: {
      type: String,
      trim: true
    },
    goals: {
      type: String,
      trim: true,
      maxlength: [300, "Goals cannot exceed 300 characters"]
    },
    areasOfInterest: [{
      type: String,
      trim: true
    }],
    // Mentor specific fields
    domainExpertise: [{
      type: String,
      trim: true
    }],
    linkedinProfile: {
      type: String,
      trim: true
    },
    hourlyRate: {
      type: Number,
      min: [0, "Hourly rate cannot be negative"]
    },
    availability: [{
      day: {
        type: String,
        enum: ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"]
      },
      slots: [{
        startTime: String,
        endTime: String
      }]
    }],
    isVerified: {
      type: Boolean,
      default: false
    },
    rating: {
      type: Number,
      default: 0,
      min: 0,
      max: 5
    },
    totalSessions: {
      type: Number,
      default: 0
    },
    // Subscription plan
    subscriptionPlan: {
      type: String,
      enum: ["free", "pro"],
      default: "free"
    },
    // Email verification
    isEmailVerified: {
      type: Boolean,
      default: false
    },
    emailVerificationToken: String,
    emailVerificationExpires: Date
  },
  {
    timestamps: true // Add createdAt & updatedAt
  }
)

const User = mongoose.model("User", userSchema);

module.exports = User