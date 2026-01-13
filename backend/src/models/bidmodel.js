const mongoose = require("mongoose");

const bidSchema = new mongoose.Schema({
    gigId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Gig",
        required: true
    },
    freelancerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    message: { type: String, required: true },
    price: { type: Number, required: true },
    status: {
        type: String,
        enum: ["pending", "hired", "rejected"],
        default: "pending"
    }
}, { timestamps: true });

// Avoid duplicate bids on same gig by same user
bidSchema.index({ gigId: 1, freelancerId: 1 }, { unique: true });

module.exports = mongoose.model("Bid", bidSchema);
