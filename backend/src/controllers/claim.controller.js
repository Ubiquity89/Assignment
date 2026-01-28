const Claim = require("../models/Claim");
const Deal = require("../models/Deal");
const User = require("../models/User");

exports.claimDeal = async (req, res) => {
  const { dealId } = req.params;

  console.log("=== CLAIM DEBUG ===");
  console.log("dealId from params:", dealId);
  console.log("req.userId:", req.userId);
  console.log("req.params:", req.params);
  console.log("req.body:", req.body);

  try {
    const deal = await Deal.findById(dealId);
    console.log("Found deal:", deal);
    
    if (!deal) {
      console.log("Deal not found");
      return res.status(404).json({ message: "Deal not found" });
    }

    const user = await User.findById(req.userId);
    console.log("Found user:", user ? { id: user._id, email: user.email, isVerified: user.isVerified } : null);

    if (deal.isLocked && !user.isVerified) {
      console.log("Deal locked and user not verified");
      return res.status(403).json({
        message: "Verification required to claim this deal"
      });
    }

    console.log("Creating claim...");
    const claim = await Claim.create({
      user: req.userId,
      deal: dealId
    });
    console.log("Claim created:", claim);

    res.status(201).json({ message: "Deal claimed", claim });
  } catch (error) {
    console.error("Claim error:", error);
    console.error("Error code:", error.code);
    console.error("Error message:", error.message);
    
    if (error.code === 11000) {
      console.log("Duplicate claim error");
      return res.status(400).json({ message: "Deal already claimed" });
    }
    res.status(500).json({ message: "Claim failed" });
  }
};

exports.getMyClaims = async (req, res) => {
  try {
    const claims = await Claim.find({ user: req.userId }).populate("deal");
    res.json(claims);
  } catch {
    res.status(500).json({ message: "Failed to fetch claims" });
  }
};
