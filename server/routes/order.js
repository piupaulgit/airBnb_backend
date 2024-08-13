const express = require("express");
const { isAuthenticated, isSignedIn, isAdmin } = require("../controllers/auth");
const {
  addOrder,
  getAllOrdersForUser,
  getAllOrdersForAdmin,
} = require("../controllers/order");
const { getUserById } = require("../controllers/user");
const router = express.Router();

router.param("userId", getUserById);

router.post("/add/:userId", isSignedIn, isAuthenticated, addOrder);
router.get(
  "/all/:userId",
  isSignedIn,
  isAuthenticated,
  isAdmin,
  getAllOrdersForUser
);
router.get(
  "/admin/all/:userId",
  isSignedIn,
  isAuthenticated,
  isAdmin,
  getAllOrdersForAdmin
);

module.exports = router;
