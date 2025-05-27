const mongoose = require("mongoose");
const validator = require("validator");

const clothingItemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 50,
  },
  weather: {
    type: String,
    required: true,
  },
  imageURL: {
    type: String,
    required: true,
    validator: {
      validator: (v) => validator.isURL(v),
      massage: "Link is not Valid",
    },
  },
});

module.exports = mongoose.model("clothingitem", clothingItemSchema);
