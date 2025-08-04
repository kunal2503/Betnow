const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    description : {
        type : String,
        default : ""
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
      enum: ["live", "completed", "cancelled", "result_declared"],
    },
    result: {
      type: String,
      default: "pending",
      enum: ["pending", "yes", "no", "cancelled"],
    },
    totalYesAmount: {
      type: Number,
      default: 0,
    },
    totalNoAmount: {
      type: Number,
      default: 0,
    },
    yesPrice: {
        type: Number,
        default : 5
    },
    noPrice: {
        type: Number,
        default : 5
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("event", eventSchema);
