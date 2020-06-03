const mongoose = require("mongoose");

const ServiceSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, min: 7, max: 128 },
    description: { type: String, required: true, min: 7, max: 128 },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Service", ServiceSchema);
