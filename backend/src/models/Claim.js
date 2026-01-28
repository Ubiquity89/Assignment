const mongoose = require("mongoose");

const claimSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  deal: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Deal",
  },
  status: {
    type: String,
    enum: ["pending", "approved"],
    default: "pending",
  },
  claimedAt: {
    type: Date,
    default: Date.now,
  },
});

claimSchema.index({ user: 1, deal: 1 }, { unique: true });

module.exports = mongoose.model("Claim", claimSchema);
