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
    }
  },
  {
    timestamps: true // Add createdAt & updatedAt
  }
)

const User = mongoose.model("User", userSchema);

module.exports = User