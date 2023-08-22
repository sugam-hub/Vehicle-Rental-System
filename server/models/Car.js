const mongoose = require("mongoose");

const CarSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    name: { type: String, required: true },
    fuelType: { type: String, required: true },
    capacity: { type: String, required: true },
    price: { type: Number, required: true },
    phone: { type: String },
    image: {
      type: String,
      required: true,
    },
    location: {
      type: { type: String },
      coordinates: { type: Array },
    },
    address: { type: String, require: true },
    bookedTimeSlots: [
      {
        from: { type: String, required: true },
        to: { type: String, required: true },
      },
    ],
  },
  { timestamps: true }
);

CarSchema.index({ location: "2dsphere" });

module.exports = mongoose.model("Car", CarSchema);
