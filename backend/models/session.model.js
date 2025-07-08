const mongoose = require("mongoose");

const sessionSchema = new mongoose.Schema(
  {
    mentor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    mentee: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      // Required only for 1-on-1 sessions
    },
    // New fields for hybrid approach
    sessionMode: {
      type: String,
      enum: ["one-on-one", "group"],
      required: true
    },
    maxParticipants: {
      type: Number,
      min: [1, "Must have at least 1 participant"],
      default: 1
    },
    participants: [{
      mentee: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
      },
      joinedAt: {
        type: Date,
        default: Date.now
      },
      status: {
        type: String,
        enum: ["joined", "attended", "no-show"],
        default: "joined"
      }
    }],
    title: {
      type: String,
      required: true,
      trim: true
    },
    description: {
      type: String,
      trim: true
    },
    scheduledDate: {
      type: Date,
      required: true
    },
    duration: {
      type: Number, // in minutes
      required: true,
      min: [15, "Session must be at least 15 minutes"],
      max: [480, "Session cannot exceed 8 hours"]
    },
    status: {
      type: String,
      enum: ["pending", "accepted", "rejected", "completed", "cancelled", "open", "full"],
      default: "pending"
    },
    sessionType: {
      type: String,
      enum: ["chat", "video", "async"],
      default: "chat"
    },
    meetingLink: {
      type: String,
      trim: true
    },
    // Payment related fields
    amount: {
      type: Number,
      min: [0, "Amount cannot be negative"]
    },
    paymentStatus: {
      type: String,
      enum: ["pending", "completed", "failed", "refunded"],
      default: "pending"
    },
    // Feedback
    rating: {
      type: Number,
      min: [1, "Rating must be at least 1"],
      max: [5, "Rating cannot exceed 5"]
    },
    feedback: {
      type: String,
      trim: true,
      maxlength: [500, "Feedback cannot exceed 500 characters"]
    },
    // Session notes
    notes: {
      type: String,
      trim: true
    },
    // Cancellation
    cancelledBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    },
    cancellationReason: {
      type: String,
      trim: true
    },
    // Timestamps for session events
    acceptedAt: Date,
    completedAt: Date,
    cancelledAt: Date
  },
  {
    timestamps: true
  }
);

// Index for better query performance
sessionSchema.index({ mentor: 1, scheduledDate: 1 });
sessionSchema.index({ mentee: 1, scheduledDate: 1 });
sessionSchema.index({ status: 1 });
sessionSchema.index({ sessionMode: 1 });

const Session = mongoose.model("Session", sessionSchema);

module.exports = Session; 