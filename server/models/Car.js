const { Timestamp } = require("mongodb");
const mongoose = require("mongoose");

const CarSchema = new mongoose.Schema(
  {
    name: { type: String, require: true },
    brand: { type: String, require: true },
    price: { type: Number, require: true },
    image:{
      data: Buffer,
      contentType: String
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Car", CarSchema);
