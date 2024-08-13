const express = require("express");
const { isSignedIn, isAuthenticated, isAdmin } = require("../controllers/auth");
const { addCategory, getAllCategories, getCategoryById, deleteCategory, updateCategory } = require("../controllers/category");
const { getUserById } = require("../controllers/user");
const router = express.Router();

router.param("userId", getUserById);
router.param("categoryId", getCategoryById);


router.post("/add/:userId", isSignedIn, isAuthenticated, isAdmin, addCategory);
router.get("/all", getAllCategories);
router.put("/update/:userId/:categoryId", isSignedIn, isAuthenticated, isAdmin, updateCategory);
router.delete("/delete/:userId/:categoryId", isSignedIn, isAuthenticated, isAdmin, deleteCategory)

module.exports = router;