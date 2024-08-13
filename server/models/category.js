const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CategorySchema = new Schema(
    {
        name: {
            type: String,
            require: true,
            unique: true,
            trim: true
        },
        popular: {
            type: Boolean,
            default: false
        },
        image: {
            data: Buffer,
            contentType: String
        }
    },
    { timestamps: true }
)

module.exports = mongoose.model("Category", CategorySchema);