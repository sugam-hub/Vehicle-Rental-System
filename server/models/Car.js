const mongoose = require("mongoose");

const CarSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    fuelType: { type: String, required: true },
    capacity: { type: String, required: true },
    price: { type: Number, required: true },
    image: {
      type: String,
      required: true,
    },
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
