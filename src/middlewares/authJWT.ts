import { NextFunction, Request, Response } from "express";
import jwt, { JwtHeader } from "jsonwebtoken";

var UserModel = require("../models/UserModel");
require("dotenv").config();

const secretKey = process.env.JWT_SECRET || "";

const verifyToken = (req: Request, res: Response, next: NextFunction) => {
  console.log(req.headers.authorization);
  if (
    req.headers &&
    req.headers.authorization &&
    req.headers.authorization.split(" ")[0] == "Bearer"
  ) {
    let decoded;
    try {
      decoded = jwt.verify(req.headers.authorization.split(" ")[1], secretKey);
    } catch (err) {
      res.status(401).send({
        message: err,
      });
    }
    req.body.user = decoded.role;
    next();
  } else {
    res.status(401).send({
      message: "JWT verification failed",
    });
  }
};

module.exports = verifyToken;
