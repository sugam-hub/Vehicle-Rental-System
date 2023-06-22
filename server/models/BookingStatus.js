const mongoose = require("mongoose");

const BookingStatusSchema = new mongoose.Schema({
  car: { type: mongoose.Schema.Types.ObjectId, ref: "Car" },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  status: { type: Boolean },
});

module.exports = mongoose.model("BookingStatus", BookingStatusSchema);
