const Gig = require("../models/gigmodel");

// GET all gigs
const getGigs = async (req, res) => {
    try {
        const search = req.query.search || "";

        const gigs = await Gig.find({
            title: { $regex: search, $options: "i" }
        })
        .populate("ownerId", "username email")
        .populate("assignedTo", "username email");

        return res.status(200).json(gigs);

    } catch (error) {
        return res.status(500).json({ msg: "Server Error" });
    }
};


// GET single gig by ID
const getGigById = async (req, res) => {
    try {
        const gig = await Gig.findById(req.params.id)
            .populate("ownerId", "username email")
            .populate("assignedTo", "username email");

        if (!gig) {
            return res.status(404).json({ msg: "Gig not found" });
        }

        return res.status(200).json(gig);

    } catch (error) {
        return res.status(500).json({ msg: "Server Error" });
    }
};


// CREATE new gig
const createGig = async (req, res) => {
    try {
        const { title, description, budget } = req.body;

        const gig = await Gig.create({
            title,
            description,
            budget,
            ownerId: req.user._id
        });

        return res.status(201).json(gig);

    } catch (error) {
        return res.status(500).json({ msg: "Server Error" });
    }
};

module.exports = { getGigs, getGigById, createGig };
