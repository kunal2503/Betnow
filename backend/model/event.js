const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim : true
    },
    category: {
      type: String,
      required: true,
      trim: true,
      lowerCase : true
    },
    startTime: {
      type: Date,
    },
    endTime: {
      type: Date,
    },
    status: {
      type: String,
      default: "live",
      enum: ["live", "completed", "cancelled",],
      lowerCase : true
    },
   totalYesAmount: {
      type: Number,
      default: 0,
      min : 0
    },
   totalNoAmount: {
      type: Number,
      default: 0,
      min : 0
    },
    totalNoQuantity: {
      type: Number,
      default: 0,
      min : 0
    },
    totalYesQuantity: {
      type: Number,
      default: 0,
      min : 0
    },
    yesPrice: {
        type: Number,
        default : 5,
        min : 0.5
    },
    noPrice: {
        type: Number,
        default : 5,
        min : 0.5
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref : "user"
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("event", eventSchema);
