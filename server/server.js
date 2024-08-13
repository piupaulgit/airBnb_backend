require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const app = express();

// routes
const authRoutes = require("./routes/auth");
const bannerRoutes = require("./routes/banner");
const categoryRoutes = require("./routes/category");
const orderRoutes = require("./routes/order");
const productRoutes = require("./routes/product");
const userRoutes = require("./routes/user");
const cartRoutes = require("./routes/cart");
const wishListRoutes = require("./routes/wishList");

// db connection
mongoose
  .connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("BD connected");
  })
  .catch((err) => {
    console.log(err);
  });

// middlewares
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());

// port
const port = process.env.PORT || 8000;

// my routes
app.use("/api/auth", authRoutes);
app.use("/api/banner", bannerRoutes);
app.use("/api/category", categoryRoutes);
app.use("/api/order", orderRoutes);
app.use("/api/products", productRoutes);
app.use("/api/user", userRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/wishlist", wishListRoutes);

// starting server
app.listen(port, () =>
  console.log(`Example app listening at http://localhost:${port}`)
);
