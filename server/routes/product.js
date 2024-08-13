const express = require("express");
const { isSignedIn, isAuthenticated, isAdmin } = require("../controllers/auth");
const { getAllProducts, addProduct, getProductById, updateProduct, deleteProduct, getProduct, getProductsByCategory, getCategoryProducts } = require("../controllers/product");
const { getUserById } = require("../controllers/user");
const router = express.Router();

router.param("userId", getUserById);
router.param("productId", getProductById);
router.param("categoryIdForProduct", getProductsByCategory);

router.get("/all", getAllProducts);
router.get("/:productId", getProduct);
router.post("/add/:userId", isSignedIn, isAuthenticated, isAdmin, addProduct);
router.put("/update/:userId/:productId", isSignedIn, isAuthenticated, isAdmin, updateProduct);
router.delete("/delete/:userId/:productId", isSignedIn, isAuthenticated, isAdmin, deleteProduct);
router.get("/category/:categoryIdForProduct", getCategoryProducts)

module.exports = router;