const Car = require("../models/Car");
const router = require("express").Router();
const {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
} = require("./verifyToken");
const multer = require("multer");
const Booking = require("../models/Booking");
const BookingStatus = require("../models/BookingStatus");

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
router.post("/addcar", async (req, res) => {
  const {
    user,
    name,
    fuelType,
    capacity,
    price,
    phone,
    image,
    location,
    address,
  } = req.body;

  const newCar = new Car({
    user,
    name,
    fuelType,
    capacity,
    price,
    phone,
    image,
    location,
    address,
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
    const bookings = await Booking.find().populate("car").populate("user");
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
        .send({ success: true, msg: "Car Details", data: carData });
    } else {
      return res.status(200).send({ success: true, msg: "Data not found!" });
    }
  } catch (err) {
    return res.status(400).json(err);
  }
});

// router.get("/search", async (req, res) => {
//   const { query } = req.query;

//   try {
//     let cars = await Car.find();
//     // Filter cars based on the search query
//     if (query) {
//       cars = cars.filter((car) =>
//         car.name.toLowerCase().includes(query.toLowerCase())
//       );
//     }
//     res.json(cars);
//   } catch (err) {
//     res.status(500).json({ message: "Server Error" });
//   }
// });

//DELETE BOOKING
router.post("/deletebooking", async (req, res) => {
  try {
    await Booking.findOneAndDelete({ _id: req.body.bookingid });

    return res.status(200).json("Booking deleted successfully...");
  } catch (err) {
    return res.status(402).json(err);
  }
});

// BOOKING ACCEPT OR REJECT STATUS
router.post("/status", async (req, res) => {
  try {
    const newStatus = new BookingStatus({
      car: req.body.car,
      user: req.body.user,
      status: req.body.status,
    });
    const savedStatus = await newStatus.save();
    return res.status(200).json(savedStatus);
  } catch (err) {
    return res.status(403).json(err);
  }
});

// Find nearest vehicle
router.post("/nearestvehicle", async (req, res) => {
  try {
    const latitude = req.body.latitude;
    const longitude = req.body.longitude;

    const storeDate = await Car.aggregate([
      {
        $geoNear: {
          near: {
            type: "Point",
            coordinates: [parseFloat(longitude), parseFloat(latitude)],
          },
          key: "location",
          maxDistance: parseFloat(1000) * 1609,
          distanceField: "dist.calculated",
          spherical: true,
        },
      },
    ]);
    return res.status(200).json(storeDate);
  } catch (err) {
    return res.status(400).json({ success: false, err });
  }
});
module.exports = router;
