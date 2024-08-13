const Product = require("../models/product");
const formidable = require("formidable");
const _ = require("lodash");
const fs = require("fs");

exports.getProductById = async (req, res, next, id) => {
  try {
    const product = await Product.findById(id).populate("category", "name");
    req.product = product;
    next();
  } catch (err) {
    console.log(err);
  }
};

exports.getProduct = (req, res) => {
  res.status(200).json({
    status: "success",
    data: {
      product: req.product,
    },
  });
};

exports.getAllProducts = async (req, res) => {
  try {
    const queryObj = { ...req.query };
    const excludedQueries = ["sort", "limit", "page", "tags"];
    excludedQueries.forEach((el) => delete queryObj[el]);

    if (req.query.tags) {
      const tagsArray = req.query.tags.split(",");
      queryObj.tags = { $in: tagsArray };
    }

    // advance filtering
    let queryString = JSON.stringify(queryObj);
    queryString = queryString.replace(
      /\b(gte|gt|lte|lt)\b/g,
      (match) => `$${match}`
    );

    let query = Product.find(JSON.parse(queryString));

    if (req.query.sort) {
      const sortBy = req.query.sort;
      query = query.sort(sortBy);
    } else {
      query = query.sort("-createdAt");
    }

    const page = req.query.page * 1 || 1;
    const limit = req.query.limit * 1 || 50;
    const skip = (page - 1) * limit;

    query = query.skip(skip).limit(limit);

    if (req.query.page) {
      const totalPageCount = await Product.countDocuments();
      if (skip >= totalPageCount) throw new Error("This page does not exist.");
    }

    const products = await query;

    res.status(201).json({
      status: "success",
      data: {
        products: products,
      },
    });
  } catch (err) {}
};

exports.addProduct = async (req, res) => {
  let form = new formidable.IncomingForm();
  form.keepExtensions = true;

  form.parse(req, async (err, fields, file) => {
    if (err) {
      return res.status(400).json({
        error: "something wrong with file",
      });
    }

    const { name, category, price, stock } = fields;
    if (!name || !category || !price || !stock) {
      return res.status(400).json({
        error: "Please fill all the inputs",
      });
    }

    let obj = {};
    Object.keys(fields).forEach((el) => {
      obj[el] = fields[el][0];
    });

    let product = await Product.create(obj);

    if (file.photo) {
      if (file.photo.size > 3000000) {
        return res.status(400).json({
          error: "File size too big",
        });
      }

      product.photo.data = fs.readFileSync(file.photo[0].filepath);
      product.photo.contentType = file.photo[0].mimetype;
    }

    try {
      const savedProduct = await product.save();
      res.json(savedProduct);
    } catch (err) {
      return res.status(400).json({
        error: err.message,
      });
    }
  });
};

exports.updateProduct = async (req, res) => {
  let form = new formidable.IncomingForm();
  form.keepExtensions = true;

  form.parse(req, async (err, fields, file) => {
    if (err) {
      return res.status(400).json({
        error: "something wrong with file",
      });
    }

    let obj = {};
    Object.keys(fields).forEach((el) => {
      obj[el] = fields[el][0];
    });

    let product = req.product;
    product = _.extend(product, obj);

    if (file.photo) {
      if (file.photo.size > 3000000) {
        return res.status(400).json({
          error: "File size too big",
        });
      }

      product.photo.data = fs.readFileSync(file.photo[0].filepath);
      product.photo.contentType = file.photo[0].mimetype;
    }

    try {
      const savedProduct = await product.save();
      res.json(savedProduct);
    } catch (error) {
      return res.status(400).json({
        error: error.message,
      });
    }
  });
};

exports.deleteProduct = async (req, res) => {
  let product = req.product;
  try {
    await Product.deleteOne({ _id: product._id });
    res.status(201).json({
      status: "success",
      message: "Product Deleted Successfully",
    });
  } catch (err) {
    console.log(err);
  }
};

exports.getProductsByCategory = async (req, res, next, categoryId) => {
  try {
    let products;
    products = await Product.find({ category: categoryId });
    req.products = products;
  } catch (err) {
    console.log("err");
  }
  next();
};

exports.getCategoryProducts = (req, res) => {
  return res.status(201).json({
    status: "success",
    data: {
      products: req.products,
    },
  });
};
