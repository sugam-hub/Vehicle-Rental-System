const Car = require("../models/Car");
const router = require("express").Router();
const {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
} = require("./verifyToken");
const multer = require("multer");
const Booking = require("../models/Booking");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });

//POST CAR
router.post("/postcar", upload.single("image"), async (req, res) => {
  const newCar = new Car({
    name: req.body.name,
    price: req.body.price,
    fuelType: req.body.fuelType,
    price: req.body.price,
    capacity: req.body.capacity,
    image: req.file.path,
  });

  try {
    const savedCar = await newCar.save();
    return res.status(200).json(savedCar);
  } catch (err) {
    return res.status(500).json(err);
  }
});

//GET ALL CARS
router.get("/getallcars", async (req, res) => {
  const query = req.query.new;
  try {
    const car = query
      ? await Car.find().sort({ _id: 1 }).limit(5)
      : await Car.find();
    return res.status(200).json(car);
  } catch (err) {
    return res.status(500).json(err);
  }
});

//Book Car
router.post("/bookcar", async (req, res) => {
  req.body.transactionId = "1234";
  try {
    const newBooking = new Booking(req.body);
    await newBooking.save();
    const car = await Car.findOne({ _id: req.body.car });
    car.bookedTimeSlots.push(req.body.bookedTimeSlots);
    await car.save();
    return res.status(200).json("Your booking has been placed successfully");
  } catch (err) {
    return res.status(400).json(err);
  }
});

module.exports = router;
