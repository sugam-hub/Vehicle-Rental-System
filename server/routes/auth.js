const router = require("express").Router();
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const CryptoJS = require("crypto-js");

// REGISTER
router.post("/register", async (req, res) => {
  const { username, password, confirmPassword, admin } = req.body;
  const newUser = new User({
    name: username,
    password: CryptoJS.AES.encrypt(password, process.env.PASS_SEC).toString(),
    confirmPassword: CryptoJS.AES.encrypt(
      confirmPassword,
      process.env.PASS_SEC
    ).toString(),
    isAdmin: admin,
  });

  try {
    const savedUser = await newUser.save();
    return res.status(200).json({ status: 200, savedUser });
  } catch (err) {
    return res.status(500).json(err);
  }
});

//LOGIN
router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ name: req.body.username });
    if (!user) {
      return res.status(401).json("User not found!!!");
    }

    const hashedPassword = CryptoJS.AES.decrypt(
      user.password,
      process.env.PASS_SEC
    ).toString(CryptoJS.enc.Utf8);

    const accessToken = jwt.sign(
      {
        id: user._id,
      },
      process.env.JWT_SEC,
      {
        expiresIn: "3d",
      }
    );

    if (hashedPassword !== req.body.password) {
      return res.status(401).json("Wrong Credentials!!!");
    } else {
      const { password, confirmPassword, ...otherInfo } = user._doc;
      return res.status(200).json({ status: 200, otherInfo, accessToken });
    }
  } catch (err) {
    return res.status(500).json(err);
  }
});

module.exports = router;
