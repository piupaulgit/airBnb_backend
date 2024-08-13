const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { ObjectId } = mongoose.Schema;

const productCartSchema = new mongoose.Schema({
    product: {
      type: ObjectId,
      ref: "Product",
    },
    count: Number
  });

const OrderSchema = new Schema(
    {
        products: [productCartSchema],
        transaction_id: {},
        amount: {
          type: Number,
        },
        totalDiscount : {
            type: Number
        },
        shippingAddress: {
          type: String
        },
        billingAddress: {
            type: String
        },
        mobile:{
          type: Number
        },
        status: {
          type: String, 
          default: "confirmed",
          enum: ["confirmed", "inProcess", "shipped", "delivered", "cancelled"],
        },
        updated: Date,
        user: {
          type: ObjectId,
          ref: "User",
        }
    },
    { timestamps: true }
)

const ProductCart = mongoose.model("ProductCart", productCartSchema);
const Order = mongoose.model("Order", OrderSchema);

module.exports = { Order, ProductCart };