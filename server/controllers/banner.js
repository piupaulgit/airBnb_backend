const Banner = require("../models/banner");
const formidable = require("formidable");
const _ = require("lodash");
const fs = require("fs");

exports.getBannerById = async(req, res, next, id) => {
  try{
    const banner = await Banner.findById(id);
    req.banner = banner;
    next()
  }catch(err){
    console.log(err)
  }
}

exports.addBanner = async (req, res) => {
  let form = new formidable.IncomingForm();
  form.keepExtensions = true;

  form.parse(req, async (err, fields, file) => {
    if (err) {
      return res.status(400).json({
        error: "something wrong with file",
      });
    }

    const { title, subTitle, type } = fields;
    if (!title || !subTitle || !type) {
      return res.status(400).json({
        error: "Please fill all the inputs",
      });
    }

    let obj = {};
    Object.keys(fields).forEach(el => {
      obj[el] = fields[el][0]
    })

    let banner = await Banner.create(obj);

    if (file.image) {
      if (file.image.size > 3000000) {
        return res.status(400).json({
          error: "File size too big",
        });
      }

      banner.image.data = fs.readFileSync(file.image[0].filepath);
      banner.image.contentType = file.image[0].mimetype;
    }

    try {
      const savedBanner = await banner.save();
      res.json(savedBanner);
    } catch (err) {
      return res.status(400).json({
        error: err.message,
      });
    }
  });
};

exports.updateBanner = async(req, res) => {
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

    let banner = req.banner;
    banner = _.extend(banner, obj);

    if (file.image) {
      if (file.image.size > 3000000) {
        return res.status(400).json({
          error: "File size too big",
        });
      }

      banner.image.data = fs.readFileSync(file.image[0].filepath);
      banner.image.contentType = file.image[0].mimetype;
    }

    try {
      const savedBanner = await banner.save();
      res.json(savedBanner);
    } catch (err) {
      return res.status(400).json({
        error: err.message,
      });
    }
  });
}

exports.getAllBanners = async (req, res) => {
  try {
    const banners = await Banner.find();
    res.status(200).json({
      status: "success",
      data: {
        banners: banners,
      },
    });
  } catch (err) {
    console.log(err);
  }
};

exports.deleteBanner = async (req, res) => {
  try {
    const banner = await Banner.deleteOne({ _id: req.banner._id });
    res.status(200).json({
      status: "success",
      data: {
        banner: banner,
      },
    });
  } catch (err) {
    console.log(err);
  }
};
