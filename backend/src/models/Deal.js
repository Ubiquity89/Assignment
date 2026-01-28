const mongoose = require("mongoose");

const dealSchema = new mongoose.Schema(
  {
    title: String,
    description: String,
    category: String,
    partnerName: String,
    isLocked: {
      type: Boolean,
      default: false,
    },
    eligibilityText: String,
  },
  { timestamps: true },
);

module.exports = mongoose.model("Deal", dealSchema);
