const User = require("../models/usermodel");

// HOME
const home = async (req, res) => {
    res.status(200).send("Hello HOME");
};

// REGISTER
const register = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        const userExist = await User.findOne({ email });
        if (userExist) {
            console.log("Email already exists");
            return res.status(400).json({ msg: "Email already exists" });
        }

        const user = await User.create({ username, email, password });

        return res.status(201).json({
            msg: "Registration Successful!",
            token: user.generateToken(),
            userId: user._id.toString()
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: "Server Error" });
    }
};

// LOGIN
// LOGIN
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ msg: "Invalid email or password" });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(400).json({ msg: "Invalid email or password" });
    }

    const token = user.generateToken();

    return res.status(200).json({
      msg: "Login Successful!",
      token,
      user: {
        _id: user._id,
        username: user.username,
        email: user.email
      }
    });

  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Server Error" });
  }
};


module.exports = { home, register, login };
