const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const UserSchema = new Schema(
  {
    fullName: { type: String, required: true, min: 7, max: 128 },
    email: {
      type: String,
      required: [true, "can't be blank"],
      lowercase: true,
      unique: true,
    },
    password: { type: String, required: [true, "can't be blank"], max: 1024 },
    phoneNumber: { type: Number },
    address: { type: String },
    isAdmin: { type: Boolean, default: false },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", UserSchema);
