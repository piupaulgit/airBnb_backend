const express = require("express");
const { isSignedIn, isAuthenticated, isAdmin } = require("../controllers/auth");
const { addBanner, getAllBanners, deleteBanner, updateBanner, getBannerById } = require("../controllers/banner");
const { getUserById } = require("../controllers/user");
const router = express.Router();


router.param("userId", getUserById);
router.param("bannerId", getBannerById);


router.post("/add/:userId", isSignedIn, isAuthenticated, isAdmin, addBanner);
router.put("/update/:userId/:bannerId", isSignedIn, isAuthenticated, isAdmin, updateBanner);
router.get("/all", getAllBanners);
router.delete("/delete/:userId/:bannerId", isSignedIn, isAuthenticated, isAdmin, deleteBanner);

module.exports = router;