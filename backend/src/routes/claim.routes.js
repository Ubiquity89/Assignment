const express = require("express");
const router = express.Router();

const { claimDeal, getMyClaims } = require("../controllers/claim.controller");
const authMiddleware = require("../middleware/auth.middleware");

router.post("/:dealId", authMiddleware, claimDeal);
router.get("/my", authMiddleware, getMyClaims);

module.exports = router;
