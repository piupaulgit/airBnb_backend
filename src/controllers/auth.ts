const User = require("../models/user");
const jsonToken = require("jsonwebtoken");
import { Request, Response } from 'express';
const { expressjwt: jwt } = require("express-jwt");

// register controller
exports.register = async (req:Request, res:Response) => {
  try {
    const newUser = await User.create(req.body);

    res.status(201).json({
      status: "success",
      message: "Congratulations! You are added.",
      data: {
        user: newUser,
      },
    });
  } catch (err) {
    console.log(err);
  }
};

exports.login = async (req:Request, res:Response) => {
    const { email, password } = req.body;
    try {
      const user = await User.findOne({ email });
  
      if (!user) {
        return res
          .status(401)
          .json({ status: 'error', message: "Authentication failed. User not found." });
      }
  
      if (!user.authenticate(password)) {
        return res.status(401).json({
          status: 'error',
          message: "Authentication failed. Email password does not match",
        });
      }
  
      const token = jsonToken.sign({ _id: user._id, email: user.email, role: user.role }, process.env.SECRETKEY);
  
      res.cookie("token", token);
  
      return res.status(200).json({
        status: 'success',
        message: `Congratulation! You are logged in now.`,
        user: {
          _id: user._id,
          email: user.email,
          role: user.role,
          accessToken: token
        },
      });
    } catch (err) {
      console.log(err);
    }
  };