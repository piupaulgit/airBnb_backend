const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const BannerSchema = new Schema (
    {
        type: {
            type: String,
            enum: ['banner_one','banner_two','banner_three'],
            require: true,
            unique: true
        },
        title: {
            type: String,
            require: true
        },
        subTitle: {
            type: String,
            require: true
        },
        image: {
            data: Buffer,
            contentType: String
        }
    },
    { timestamps: true }
)

module.exports = mongoose.model("Banner", BannerSchema);