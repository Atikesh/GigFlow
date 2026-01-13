const jwt = require("jsonwebtoken");
const User = require("../models/usermodel");

const authmiddleware = async (req, res, next) => {
    try {
        const token = req.header("Authorization")?.replace("Bearer ", "");

        if (!token) {
            return res.status(401).json({ msg: "No token, authorization denied" });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

        req.user = await User.findById(decoded.userId).select("-password");

        next();

    } catch (error) {
        return res.status(401).json({ msg: "Invalid Token" });
    }
};

module.exports = authmiddleware;
