const Category = require("../models/category");
const formidable = require("formidable");
const _ = require("lodash");
const fs = require("fs");

exports.getCategoryById = async(req, res, next, id) => {
  try {
    const category = await Category.findById(id);
    req.category = category;
    next();
  } catch (err) {
    console.log(err);
  }
};

exports.addCategory = async (req, res) => {
  let form = new formidable.IncomingForm();
  form.keepExtensions = true;

  form.parse(req, async (err, fields, file) => {
    if (err) {
      return res.status(400).json({
        error: "something wrong with file",
      });
    }

    const { name } = fields;
    if (!name) {
      return res.status(400).json({
        error: "Please fill all the inputs",
      });
    }

    let obj = {};
    Object.keys(fields).forEach(el => {
      obj[el] = fields[el][0]
    })

    let category = await Category.create(obj);

    if (file.image) {
      if (file.image.size > 3000000) {
        return res.status(400).json({
          error: "File size too big",
        });
      }

      category.image.data = fs.readFileSync(file.image[0].filepath);
      category.image.contentType = file.image[0].mimetype;
    }

    try {
      const saveCategory = await category.save();
      res.json(saveCategory);
    } catch (err) {
      return res.status(400).json({
        error: err.message,
      });
    }
  });
};

exports.getAllCategories = async (req, res) => {
  try {
    const categories = await Category.find();
    res.status(201).json({
      status: "success",
      data: {
        categories: categories,
      },
    });
  } catch (err) {
    console.log(err);
  }
};

exports.updateCategory =  async (req, res) => {
  let form = new formidable.IncomingForm();
  form.keepExtensions = true;

  form.parse(req, async (err, fields, file) => {
    if (err) {
      return res.status(400).json({
        error: "something wrong with file",
      });
    }

    let obj = {};
    Object.keys(fields).forEach(el => {
      obj[el] = fields[el][0]
    })

    let category = req.category;
    category = _.extend(category, obj);

    if (file.image) {
      if (file.image.size > 3000000) {
        return res.status(400).json({
          error: "File size too big",
        });
      }

      category.image.data = fs.readFileSync(file.image[0].filepath);
      category.image.contentType = file.image[0].mimetype;
    }

    try {
      const savedCategory = await category.save();
      res.json(savedCategory);
    } catch (err) {
      return res.status(400).json({
        error: err.message,
      });
    }
  });
}

exports.deleteCategory = async (req, res) => {
  const category = req.category;
  try{
    await Category.deleteOne({ "_id" :  category._id});
    res.status(201).json({
      status: "success",
      message: "Deleted Successfully"
    });
  }catch(err){
    console.log(err)
  }
}

