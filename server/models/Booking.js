const mongoose = require("mongoose");

const BookingScheme = new mongoose.Schema(
  {
    car: { type: mongoose.Schema.Types.ObjectId, ref: "cars" },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "users" },
    bookedTimeSlots: {
      from: { type: String },
      to: { type: String },
    },
    totalHour: { type: Number },
    totalAmount: { type: Number },
    transactionId: { type: String },
    driverRequired: { type: Boolean },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Booking", BookingScheme);
