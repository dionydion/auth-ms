import express from "express";
import mongoose from "mongoose";
import bcrypt from "bcrypt";

require("dotenv").config();
const userRoutes = require("./routes/UserRoutes");

const app = express();
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use(userRoutes);

mongoose.connect(process.env.MONGO_DB_URI || "").then(() => {
  console.log("Connected to Mongo DB");
  app.listen(process.env.PORT || 5000, () => {
    console.log(`Listening on port: ${process.env.PORT}`);
  });
});
