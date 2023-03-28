import express from "express";
import mongoose from "mongoose";

require("dotenv").config();

const app = express();

app.get("/", (req, res) => {
  res.send("Hello World");
});

mongoose.connect(process.env.MONGO_DB_URI || "").then(() => {
  console.log("Connected to Mongo DB");
  app.listen(process.env.PORT || 5000, () => {
    console.log(`Listening on port: ${process.env.PORT}`);
  });
});
