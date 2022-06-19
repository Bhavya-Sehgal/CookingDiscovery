const router = require("express").Router();
const Cuisine = require("../models/Cuisine");
const Post = require("../models/Post");

// CREATE CUISINE

// router.post("/", async (req, res) => {
//   const newCuisine = new Cuisine(req.body);
//   try {
//     const savedCuisine = await newCuisine.save();
//     res.status(200).json(savedCuisine);
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

//GET CUISINE

router.get("/", async (req, res) => {
  try {
    // const cuisines = await Post.find(cuisine);
    // console.log(cusines);
    const cuisines = await Cuisine.find();
    res.status(200).json(cuisines);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
