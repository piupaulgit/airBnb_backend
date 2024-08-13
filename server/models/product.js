const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { ObjectId } = mongoose.Schema;

const ProductSchema = new Schema(
    {
        name: {
            type: String,
            require: true,
            trim: true
        },
        description: {
            type: String
        },
        price: {
            type: Number,
            require: true
        },
        discount: {
            type: Number,
            default: 0
        },
        rating: {
            type: Number,
            default: 0
        },
        tags: {
            type: [String],
            default: []
        },
        stock: {
            type: Number,
            default: 0,
            require: true
        },
        sold: {
            type: Number,
            default: 0
        },
        category: {
            type: ObjectId,
            ref: "Category",
            required: true,
        },
        photo: {
            data: Buffer,
            contentType: String,
        },
    },
    { timestamps: true }
)

module.exports = mongoose.model("Product", ProductSchema);