const Bid = require("../models/bidmodel");
const Gig = require("../models/gigmodel");

const createBid = async (req, res) => {
    try {
        const { gigId, message, price } = req.body;

        // Check gig exists
        const gig = await Gig.findById(gigId);
        if (!gig) return res.status(404).json({ msg: "Gig not found" });

        // Prevent owner from bidding
        if (gig.ownerId.toString() === req.user._id.toString()) {
            return res.status(403).json({ msg: "You cannot bid on your own gig" });
        }

        // Prevent same freelancer from submitting multiple bids
        const alreadyBid = await Bid.findOne({
            gigId,
            freelancerId: req.user._id
        });

        if (alreadyBid) {
            return res.status(400).json({ msg: "You already submitted a bid for this gig" });
        }

        const bid = await Bid.create({
            gigId,
            freelancerId: req.user._id,
            message,
            price
        });

        res.status(201).json(bid);

    } catch (err) {
        res.status(500).json({ msg: "Server Error" });
    }
};

const getBidsForGig = async (req, res) => {
    try {
        const gigId = req.params.gigId;

        const gig = await Gig.findById(gigId);
        if (!gig) return res.status(404).json({ msg: "Gig not found" });

        const bids = await Bid.find({ gigId }).populate("freelancerId", "username email");

        res.status(200).json(bids);
    } catch (err) {
        res.status(500).json({ msg: "Server Error" });
    }
};

const hireBid = async (req, res) => {
    const bidId = req.params.bidId;

    const bid = await Bid.findById(bidId);
    const gig = await Gig.findById(bid.gigId);

    gig.status = "assigned";
    gig.assignedTo = bid.freelancerId;
    await gig.save();

    bid.status = "hired";
    await bid.save();

    await Bid.updateMany(
        { gigId: gig._id, _id: { $ne: bidId } },
        { status: "rejected" }
    );

    res.status(200).json({ msg: "Hired successfully" });
};


module.exports = { createBid, getBidsForGig, hireBid };
