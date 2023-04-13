const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
dotenv.config();

//CONNECTING DATABASE
mongoose.set("strictQuery", true);
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("Database connected successfully!!");
  })
  .catch((err) => {
    console.log(err);
  });

//IMPORTING ROUTES
const authRoute = require("./routes/auth");
const carRoute = require("./routes/car");

//USE ROUTES
app.use(cors());
app.use(express.json());
app.use("/api/auth", authRoute);
app.use("/api/auth", carRoute);
app.use("/api/auth", carRoute);

app.listen(process.env.PORT || 6000, () => {
  console.log("Backend server is running in PORT: " + `${process.env.PORT}`);
});
