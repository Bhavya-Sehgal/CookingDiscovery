const mongoose = require("mongoose");

const postSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
    },
    desc: {
      type: String,
      required: true,
    },
    photo: {
      type: String,
    },
    username: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    cuisine: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Cuisine",
    },
    ingredients: {
      type: Array,
      required: true,
    },
    directions: {
      type: Array,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Post", postSchema);
