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
const stripe = require("stripe")(
  "sk_test_51LeyE8HhWz2IA4nkl4hKopm3vuAdh1LCWweiZvrN2kFpkSeJr7HFCzEXnwkiwG0qZXICfGXApTbIkhuXP7gBtoju00w03Sgnsp"
);
const { v4: uuidv4 } = require("uuid");
const cloudinary = require('cloudinary').v2;

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

//ADD NEW CAR
router.post("/addcar", async (req, res) => {
  try {
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
  const { token } = req.body;
  try {
    const customer = await stripe.customers.create({
      email: token.email,
      source: token.id,
    });

    const payment = await stripe.charges.create(
      {
        amount: req.body.totalAmount * 100,
        currency: "npr",
        customer: customer.id,
        receipt_email: token.email,
      },
      {
        idempotencyKey: uuidv4(),
      }
    );

    if (payment) {
      req.body.transactionId = payment.source.id;
      const newBooking = new Booking(req.body);
      await newBooking.save();
      const car = await Car.findOne({ _id: req.body.car });
      car.bookedTimeSlots.push(req.body.bookedTimeSlots);
      await car.save();
      return res.status(200).json("Your booking has been placed successfully");
    } else {
      return res.status(400).json(err);
    }
  } catch (err) {
    return res.status(400).json(err);
  }
});

//Get All Bookings
router.get("/getallbookings", async (req, res) => {
  try {
    const bookings = await Booking.find().populate("car").populate("user");
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
// router.post("/nearestvehicle", async (req, res) => {
//   try {
//     let latitude = req.body.latitude;
//     let longitude = req.body.longitude;

//     if (!latitude && !longitude) {
//       latitude = "27.7172";
//       longitude = "85.3240";
//     }
//     const storeDate = await Car.aggregate([
//       {
//         $geoNear: {
//           near: {
//             type: "Point",
//             coordinates: [parseFloat(longitude), parseFloat(latitude)],
//           },
//           key: "location",
//           maxDistance: parseFloat(1000) * 1609,
//           distanceField: "dist.calculated",
//           spherical: true,
//         },
//       },
//     ]);

//     return res.status(200).json(storeDate);
//   } catch (err) {
//     return res.status(400).json({ success: false, err });
//   }
// });

//KNN
// Function to calculate Haversine distance between two points
function haversineDistance(point1, point2) {
  const [lat1, lon1] = point1;
  const [lat2, lon2] = point2;

  const earthRadius = 6371000; // Earth's radius in meters
  const dLat = (lat2 - lat1) * (Math.PI / 180);
  const dLon = (lon2 - lon1) * (Math.PI / 180);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * (Math.PI / 180)) *
      Math.cos(lat2 * (Math.PI / 180)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = earthRadius * c;

  return distance;
}
// kNN algorithm implementation
function kNearestNeighbors(data, queryPoint, k) {
  // Calculate distances using the Haversine formula
  data.forEach((car) => {
    car.distance = haversineDistance(
      [car.location.coordinates[1], car.location.coordinates[0]],
      [queryPoint[0], queryPoint[1]]
    );
  });

  // Sort cars based on distance
  data.sort((a, b) => a.distance - b.distance);

  // Return k nearest cars
  return data.slice(0, k);
}

router.post("/nearestvehicles", async (req, res) => {
  try {
    const latitude = parseFloat(req.body.latitude) || 27.7172;
    const longitude = parseFloat(req.body.longitude) || 85.324;
    const maxDistance = 1000 * 1609; // 1000 miles in meters
    const k = 100; // Number of nearest vehicles to find

    // Find all cars from the database
    const allCars = await Car.find({});

    // Use the kNN algorithm to find the nearest vehicles
    const nearestCars = kNearestNeighbors(allCars, [latitude, longitude], k);

   // Extract necessary information and include distance in each car object
   const sortedNearestCars = nearestCars.map((car) => {
    const { bookedTimeSlots, ...rest } = car._doc;
    return { ...rest, distance: car.distance };
  });

  // Sort the cars by distance
  const sortedCars =  sortedNearestCars.sort((a, b) => a.distance - b.distance);
  console.log("Sorted cars: ",sortedCars)


  // console.log(sortedNearestCars.map((car) => ({ id: car._id, distance: car.distance })));

    return res.status(200).json(sortedCars);
  } catch (err) {
    return res.status(400).json({ success: false, err });
  }
});
module.exports = router;
