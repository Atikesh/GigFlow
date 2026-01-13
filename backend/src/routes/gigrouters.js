

const express = require("express");
const router = express.Router();
const { getGigs, getGigById, createGig } = require("../controllers/gigcontroller");
const authMiddleware = require("../middleware/authmiddleware");

// GET all gigs
router.get("/", getGigs);

// GET single gig
router.get("/:id", getGigById);

// CREATE gig
router.post("/", authMiddleware, createGig);

module.exports = router;
