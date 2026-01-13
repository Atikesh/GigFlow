

const express = require("express");
const router = express.Router();
const { createBid, getBidsForGig, hireBid } = require("../controllers/bidcontroller");
const authMiddleware = require("../middleware/authmiddleware");

router.post("/", authMiddleware, createBid);
router.get("/:gigId", authMiddleware, getBidsForGig);
router.patch("/:bidId/hire", authMiddleware, hireBid);

module.exports = router;
