const mongoose = require("mongoose");
const Schema = mongoose.Schema;
import * as crypto from "crypto";
const { v4: uuidv4 } = require("uuid");
uuidv4();

const userSchema = new Schema(
    {
      email: {
        type: String,
        required: true,
        unique: true,
      },
      encry_password: {
        type: String,
        required: false,
      },
      salt: String,
      role: {
        type: Number,
        default: 0,
      },
      purchases: {
        type: Array,
        default: [],
      }
    },
    { timestamps: true }
  );

// methods for user schema
userSchema.methods = {
    authenticate: function (plainPassword:string) {
      return this.securePassword(plainPassword) === this.encry_password;
    },
    securePassword: function (plainPassword:string) {
      if (!plainPassword) return "";
      try {
        return crypto
          .createHmac("sha256", this.salt)
          .update(plainPassword)
          .digest("hex");
      } catch (error) {
        return "";
      }
    },
  };

// virtual field for password validation
// userSchema
// .virtual("password")
// .set(function (password:string) {
//   this._password = password;
//   this.salt = uuidv4();
//   this.encry_password = this.securePassword(password);
// })
// .get(function () {
//   return this._password;
// });

  module.exports = mongoose.model("User", userSchema);