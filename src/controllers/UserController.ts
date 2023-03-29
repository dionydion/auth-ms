import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { Request, Response } from "express";

var UserModel = require("../models/UserModel");
const saltRounds = 10;
require("dotenv").config();

const secretKey = process.env.JWT_SECRET || "";

exports.signup = (req: Request, res: Response) => {
  /*
    Use the bcrypt library to generate passwordSalt and passwordHash for the user
    */
  bcrypt.genSalt(saltRounds, (err, salt) => {
    bcrypt.hash(req.body.password, salt, (err, hash) => {
      const user = new UserModel({
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        email: req.body.email,
        role: req.body.role,
        passwordSalt: salt,
        passwordHash: hash,
      });
      const createdUser = user
        .save()
        .then((result) => {
          res.status(200).json(result);
        })
        .catch((error) => {
          console.log(error);
          res.status(500).send({
            message: error,
          });
        });
    });
  });
};

exports.login = (req: Request, res: Response) => {
  /* Use the bcrypt library to check if user is the same */
  const user = UserModel.findOne({ email: req.body.email })
    .then((user) => {
      if (user) {
        bcrypt.compare(req.body.password, user.passwordHash, (err, result) => {
          if (!result) {
            return res.status(401).send({
              accessToken: null,
              message: "Invalid Password",
            });
          }

          var token = jwt.sign(
            {
              id: user.id,
              role: user.role,
            },
            secretKey,
            {
              expiresIn: "86400",
            }
          );

          res.status(200).send({
            user: {
              id: user.id,
              email: user.email,
              role: user.role,
            },
            message: "Login successful",
            accessToken: token,
          });
        });
      } else {
        res.status(500).send({
          message: "Unable to find User",
        });
      }
    })
    .catch((error) => {
      res.status(500).send({
        message: error,
      });
    });
};
