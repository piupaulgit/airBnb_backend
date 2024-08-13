const jwt = require('jsonwebtoken');
const User = require("../models/user");

exports.getUserWithToken = async (req, res) => {
  const token = req.body.token;
  if (!token) {
    return res.sendStatus(401);
  }

  const user = jwt.verify(token, process.env.SECRETKEY, { algorithms: ['HS256'] });
  res.status(200).json({
    statue: 'success',
    user
  });
}

exports.getUserById = async (req, res, next, id) => {
  try {
    const user = await User.findById(id);
    if (!user) {
      return res.status(400).json({
        error: "User not there in DB",
      });
    }
    req.profile = user;
    next();
  } catch {
    return res.status(400).json({
      error: "Somthing went wrong",
    });
  }
};

exports.getUser = async (req, res) => {
  req.profile.salt = undefined;
  req.profile.encry_password = undefined;
  res.status(201).json({
    status: "success",
    data: {
      user: req.profile,
    },
  });
};

exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    return res.status(400).json({
      error: "No User found",
    });
  }
};

exports.updateUser = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(
      { _id: req.profile._id },
      { $set: req.body },
      { new: true, useFindAndModify: false }
    );

    res.status(201).json({
      status: "success",
      data: {
        user: user,
      },
    });
  } catch (err) {
    console.log("err");
  }
};
