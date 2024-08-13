const express = require("express");
const { isSignedIn, isAuthenticated } = require("../controllers/auth");
const {
  addToCart,
  getAllCartProducts,
  changeItemCountInCart,
  deleteItemsFromCart,
  getTotalNumberOfItemsInCart,
} = require("../controllers/cart");
const { getUserById } = require("../controllers/user");
const router = express.Router();

router.param("userId", getUserById);

router.post("/add/:userId", isSignedIn, isAuthenticated, addToCart);
router.get("/all/:userId", isSignedIn, isAuthenticated, getAllCartProducts);
router.get(
  "/totalNumberOfItemsInCart/:userId",
  isSignedIn,
  isAuthenticated,
  getTotalNumberOfItemsInCart
);
router.put(
  "/changeCount/:userId",
  isSignedIn,
  isAuthenticated,
  changeItemCountInCart
);
router.delete(
  "/delete/:userId",
  isSignedIn,
  isAuthenticated,
  deleteItemsFromCart
);

module.exports = router;
