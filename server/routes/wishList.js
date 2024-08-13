const express = require("express");
const { isSignedIn, isAuthenticated } = require("../controllers/auth");
const { getUserById } = require("../controllers/user");
const {
  addToWishList,
  getAllWishListItems,
  deleteItemsFromWishList,
} = require("../controllers/wishList");
const router = express.Router();

router.param("userId", getUserById);

router.post("/add/:userId", isSignedIn, isAuthenticated, addToWishList);
router.get("/all/:userId", isSignedIn, isAuthenticated, getAllWishListItems);
router.delete(
  "/delete/:userId",
  isSignedIn,
  isAuthenticated,
  deleteItemsFromWishList
);

module.exports = router;
