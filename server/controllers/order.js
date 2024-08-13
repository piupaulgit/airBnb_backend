const { Order } = require("../models/order");

exports.addOrder = async (req, res) => {
  try {
    const newOrder = await Order.create(req.body.order);
    res.json({
      status: "success",
      data: newOrder,
      message: "Your order has been placed successfully",
    });
  } catch (err) {
    res.json({
      status: "error",
      message: "Internal server error",
    });
  }
};

exports.getAllOrdersForUser = async (req, res) => {
  const userId = req.params.userId;
  try {
    const orders = await Order.find({ user: userId }).populate("user", "name");
    res.json({
      statue: "success",
      data: orders,
      message: "Orders fetched successfully",
    });
  } catch (err) {
    re.json({
      status: "error",
      message: "internal server error",
    });
  }
};

exports.getAllOrdersForAdmin = async (req, res) => {
  try {
    const orders = await Order.find().populate("user", "name");
    res.json({
      statue: "success",
      data: orders,
      message: "Orders fetched successfully",
    });
  } catch (err) {
    re.json({
      status: "error",
      message: "internal server error",
    });
  }
};

exports.updateOrderStatus = (req, res) => {};
