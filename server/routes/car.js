const Car = require("../models/Car");
const router = require("express").Router();
const {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
} = require("./verifyToken");
const multer = require("multer")

const storage = multer.diskStorage({
  destination: function(req, file, cb){
    cb(null, "./uploads/")
  },
  filename: function(req,file, cb){
    cb(null, file.originalname)
  }
})

const upload = multer({storage: storage})

//POST CAR
router.post("/postcar", upload.single("image"), async (req, res) => {
  const newCar = new Car({
    name: req.body.name,
    brand: req.body.brand,
    price: req.body.price,
    image:{
      data: (req.file.filename).toString(),
      contentType: "image/png"
    }
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

module.exports = router;
