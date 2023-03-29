import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { Request, Response } from "express";

var UserModel = require("../models/UserModel");
const saltRounds = 10;

exports.signup = (req: Request, res: Response) => {
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

exports.login = (req: Request, res: Response) => {};
