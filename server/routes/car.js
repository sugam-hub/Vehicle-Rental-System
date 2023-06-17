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

//ADD NEW CAR
router.post("/addcar", upload.single("image"), async (req, res) => {
  const newCar = new Car({
    name: req.body.name,
    price: req.body.price,
    fuelType: req.body.fuelType,
    capacity: req.body.capacity,
    image: req.body.image,
    address: req.body.address,
  });

  try {
    const savedCar = await newCar.save();
    return res.status(200).json(savedCar);
  } catch (err) {
    return res.status(403).json(err);
  }
});

//EDIT CAR
router.post("/editcar", async (req, res) => {
  try {
    const car = await Car.findOne({ _id: req.body._id });
    (car.name = req.body.name),
      (car.price = req.body.price),
      (car.fuelType = req.body.fuelType),
      (car.capacity = req.body.capacity),
      (car.image = req.body.image),
      await car.save();
    return res.status(200).json(car);
  } catch (err) {
    return res.status(402).json(err);
  }
});

//DELETE CAR
router.post("/deletecar", async (req, res) => {
  try {
    await Car.findOneAndDelete({ _id: req.body.carid });

    return res.status(200).json("Car deleted successfully...");
  } catch (err) {
    return res.status(402).json(err);
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

//Get All Bookings
router.get("/getallbookings", async (req, res) => {
  try {
    const bookings = await Booking.find().populate("car");
    // bookings.car = await Car.findById();
    return res.status(200).json(bookings);
  } catch (err) {
    return res.status(400).json(err);
  }
});

//SEARCH CAR
router.get("/search", async (req, res) => {
  try {
    var search = req.body.search;
    var carData = await Car.find({
      name: { $regex: ".*" + search + ".*", $options: "i" },
    });
    if (carData.length > 0) {
      return res
        .status(200)
        .send({ success: true, msg: "Product Details", data: carData });
    } else {
      return res.status(200).send({ success: true, msg: "Data not found!" });
    }
  } catch (err) {
    return res.status(400).json(err);
  }
});

module.exports = router;
