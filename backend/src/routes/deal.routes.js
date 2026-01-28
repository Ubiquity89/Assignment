const express = require("express");
const router = express.Router();
const { getAllDeals, getDeal } = require("../controllers/deal.controller");

router.get("/", getAllDeals);
router.get("/:id", getDeal);

module.exports = router;
