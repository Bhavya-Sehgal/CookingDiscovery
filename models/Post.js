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
      // required: true,
    },
    username: {
      type: mongoose.Schema.Types.ObjectId,
      // required: true,
      ref: "User",
    },
    cuisine: {
      // type: String,
      type: mongoose.Schema.Types.ObjectId,
      // required: true,
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
    // categories: {
    //   type: Array,
    //   required: false,
    // },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Post", postSchema);
