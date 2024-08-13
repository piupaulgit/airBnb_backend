// user routes
const express = require("express");
const { isSignedIn, isAuthenticated } = require("../controllers/auth");
const router = express.Router();

const {
  getUserById, getAllUsers, getUser, updateUser, getUserWithToken,
} = require("../controllers/user");

router.param("userId", getUserById);
router.post("/getUserWithToken", getUserWithToken);
router.get("/:userId", isSignedIn, isAuthenticated, getUser);
router.get("/all", getAllUsers);
router.put("/:userId", isSignedIn, isAuthenticated, updateUser);

module.exports = router;