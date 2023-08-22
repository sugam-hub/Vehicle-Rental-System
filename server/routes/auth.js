const router = require("express").Router();
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const CryptoJS = require("crypto-js");

// REGISTER
router.post("/register", async (req, res) => {
  function checkPasswordValidation(value) {
    let regex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (regex.test(value)) {
      return true;
    } else {
      return false;
    }
  }

  function checkEmail(value) {
    let regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (regex.test(value)) {
      return true;
    } else {
      return false;
    }
  }

  function checkPhone(value) {
    // let regex = /^(1[ \-\+]{0,3}|\+1[ -\+]{0,3}|\+1|\+)?((\(\+?1-[2-9][0-9]{1,2}\))|(\(\+?[2-8][0-9][0-9]\))|(\(\+?[1-9][0-9]\))|(\(\+?[17]\))|(\([2-9][2-9]\))|([ \-\.]{0,3}[0-9]{2,4}))?([ \-\.][0-9])?([ \-\.]{0,3}[0-9]{2,4}){2,3}$/;
    let regex = /^(?:[+0]9)?[0-9]{10}$/;
    if (regex.test(value)) {
      return true;
    } else {
      return false;
    }
  }

  function checkAddress(value) {
    let regex = /^[a-zA-Z0-9\s,'-]*$/;
    if (regex.test(value)) {
      return true;
    } else {
      return false;
    }
  }

  const validPassword = checkPasswordValidation(req.body.password);
  const validEmail = checkEmail(req.body.email);
  const validPhone = checkPhone(req.body.phone);
  const validAddress = checkAddress(req.body.address);

  const {
    username,
    email,
    password,
    confirmPassword,
    phone,
    address,
    admin,
    lat,
    lon,
  } = req.body;

  const alreadyExistUser = await User.findOne({ email });
  if (alreadyExistUser) {
    return res
      .status(400)
      .json({ success: false, error: "User already exist" });
  }

  if (
    validPassword &&
    validEmail &&
    validPhone &&
    validAddress &&
    password == confirmPassword
  ) {
    const newUser = new User({
      name: username,
      email: email,
      password: CryptoJS.AES.encrypt(password, process.env.PASS_SEC).toString(),
      confirmPassword: CryptoJS.AES.encrypt(
        confirmPassword,
        process.env.PASS_SEC
      ).toString(),
      isAdmin: admin,
      phone: phone,
      address: address,
      lat: lat,
      lon: lon,
    });

    try {
      const savedUser = await newUser.save();
      return res.status(200).json({ status: 200, savedUser });
    } catch (err) {
      return res.status(500).json(err);
    }
  } else if (!validPassword) {
    return res
      .status(403)
      .json({ success: false, error: "Enter strong password" });
  } else if (!validEmail) {
    return res.status(403).json({ success: false, error: "Enter valid email" });
  } else if (!validPhone) {
    return res
      .status(403)
      .json({ success: false, error: "Enter valid phone number." });
  } else if (!validAddress) {
    return res
      .status(403)
      .json({ success: false, error: "Enter valid address" });
  } else if (password !== confirmPassword) {
    return res.status(402).json({
      success: false,
      error: "Password and Confirm Password aren't same",
    });
  } else {
    return res
      .status(403)
      .json({ success: false, error: "Enter valid credentials" });
  }
});

//LOGIN
router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res
        .status(401)
        .json({ success: false, error: "User not found!!!" });
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

//GET ALL USERS
router.get("/getallusers", async (req, res) => {
  const query = req.query.new;
  try {
    const user = query
      ? await User.find().sort({ _id: 1 }).limit(5)
      : await User.find();
    return res.status(200).json(user);
  } catch (err) {
    return res.status(500).json(err);
  }
});

//DELETE USER
router.post("/deleteuser", async (req, res) => {
  try {
    await User.findOneAndDelete({ _id: req.body.userid });

    return res.status(200).json("User deleted successfully...");
  } catch (err) {
    return res.status(402).json(err);
  }
});

//UPDATE USER
router.put("/edituser/:userid", async (req, res) => {
  function checkPasswordValidation(value) {
    let regex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (regex.test(value)) {
      return true;
    } else {
      return false;
    }
  }

  function checkEmail(value) {
    let regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (regex.test(value)) {
      return true;
    } else {
      return false;
    }
  }

  function checkPhone(value) {
    // let regex = /^(1[ \-\+]{0,3}|\+1[ -\+]{0,3}|\+1|\+)?((\(\+?1-[2-9][0-9]{1,2}\))|(\(\+?[2-8][0-9][0-9]\))|(\(\+?[1-9][0-9]\))|(\(\+?[17]\))|(\([2-9][2-9]\))|([ \-\.]{0,3}[0-9]{2,4}))?([ \-\.][0-9])?([ \-\.]{0,3}[0-9]{2,4}){2,3}$/;
    let regex = /^(?:[+0]9)?[0-9]{10}$/;
    if (regex.test(value)) {
      return true;
    } else {
      return false;
    }
  }

  function checkAddress(value) {
    let regex = /^[a-zA-Z0-9\s,'-]*$/;
    if (regex.test(value)) {
      return true;
    } else {
      return false;
    }
  }

  const name = req.body.editName;
  const phone = req.body.editPhone;
  const address = req.body.editAddress;
  const password = req.body.editPassword;
  const confirmPassword = req.body.editConfirmPassword;
  const userId = req.params.userid;

  const validPassword = checkPasswordValidation(password);
  const validPhone = checkPhone(phone);
  const validAddress = checkAddress(address);

  if (
    password !== confirmPassword ||
    !validPassword ||
    !validPhone ||
    !validAddress
  ) {
    return res.status(400).json("Invalid credentials or password mismatch");
  }

  try {
    const encryptedPassword = CryptoJS.AES.encrypt(
      password,
      process.env.PASS_SEC
    ).toString();
    const encryptedConfirmPassword = CryptoJS.AES.encrypt(
      confirmPassword,
      process.env.PASS_SEC
    ).toString();

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      {
        $set: {
          name,
          password: encryptedPassword,
          phone,
          address,
          confirmPassword: encryptedConfirmPassword,
        },
      },
      { new: true }
    );

    return res.status(200).send(updatedUser);
  } catch (err) {
    return res.status(500).json(err);
  }
});

module.exports = router;
