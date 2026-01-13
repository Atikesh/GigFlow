const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true,
        minlength: 6
    }
}, { timestamps: true });

// Hash password
userSchema.pre("save", async function () {
    if (!this.isModified("password")) return;

    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});

// Compare password on login
userSchema.methods.comparePassword = async function (plainPassword) {
    return await bcrypt.compare(plainPassword, this.password);
};

// JWT Token generator
userSchema.methods.generateToken = function () {
    return jwt.sign(
        {
            userId: this._id.toString(),
            email: this.email,
        },
        process.env.JWT_SECRET_KEY,
        {
            expiresIn: "30d",
        }
    );
};

module.exports = mongoose.model("User", userSchema);
