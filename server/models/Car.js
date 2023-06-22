const mongoose = require("mongoose");

const CarSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    name: { type: String, required: true },
    fuelType: { type: String, required: true },
    capacity: { type: String, required: true },
    price: { type: Number, required: true },
    image: {
      type: String,
      required: true,
    },
    lat: { type: String },
    lon: { type: String },
    address: { type: String },
    bookedTimeSlots: [
      {
        from: { type: String, required: true },
        to: { type: String, required: true },
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Car", CarSchema);
