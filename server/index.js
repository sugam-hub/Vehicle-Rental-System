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

//USE ROUTES
app.use(cors());
app.use(express.json());
app.use("/api/auth", authRoute);

app.listen(process.env.PORT || 6000, () => {
  console.log("Backend server is running in PORT: " + `${process.env.PORT}`);
});
