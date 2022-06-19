const router = require("express").Router();
const User = require("../models/User");
const Post = require("../models/Post");
const Cuisine = require("../models/Cuisine");
const isloggedin = require("../middleware/isloggedin.js");

//CREATE POST

router.post("/", isloggedin, async (req, res) => {
  console.log(req.headers);
  console.log(req.body.cuisine);
  let x;
  try {
    x = await Cuisine.findOne({ name: req.body.cuisine });
    // console.log(x, 122334455);
    if (!x) {
      const newCuisine = new Cuisine({ name: req.body.cuisine });
      const savedCuisine = await newCuisine.save();
      console.log(savedCuisine);
      if (!savedCuisine) {
        console.log(error);
        res.status(500).json("NOT FOUND");
      }
      // res.status(200).json(savedCuisine);
      x = savedCuisine;
    }
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
  const newPost = new Post({
    ...req.body,
    username: req.user,
    cuisine: x,
  });

  // console.log(newPost);
  try {
    const savedPost = await newPost.save();
    res.status(200).json(savedPost);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

//UPDATE POST

router.put("/:id", isloggedin, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    // console.log(post.username);
    // console.log(req.user._id, 11111);
    // console.log(post.username.toString() == req.user._id.toString());
    if (post.username.toString() == req.user._id.toString()) {
      try {
        const updatedPost = await Post.findByIdAndUpdate(
          req.params.id,
          {
            // $set: req.body,
            // ...post,
            ...req.body,
            username: req.user,
          },
          { new: true }
        );
        res.status(200).json(updatedPost);
      } catch (err) {
        console.log(err);
        res.status(500).json(err);
      }
    } else {
      res.status(400).json("You can only update your post");
    }
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

//DELETE POST

router.delete("/:id", isloggedin, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (post.username.toString() == req.user._id.toString()) {
      try {
        console.log(post.cuisine);
        let x;
        x = await Post.find({ cuisine: post.cuisine });
        if (x.length == 1) {
          await Cuisine.deleteOne({ _id: post.cuisine });
        }

        await post.delete();
        res.status(200).json("Post has been Deleted");
      } catch (err) {
        res.status(500).json(err);
      }
    } else {
      res.status(400).json("You can delete only your post");
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET POST

router.get("/get/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id)
      .populate("cuisine")
      .populate("username");
    // console.log(post);
    res.status(200).json(post);
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET ALL POSTS

router.get("/allPosts", async (req, res) => {
  const username = req.query.user;
  const cuisinename = req.query.cuisine;
  try {
    let posts;
    if (username) {
      posts = await Post.find({ username: username })
        .populate("cuisine")
        .populate("username");
    } else if (cuisinename) {
      posts = await Post.find({
        cuisine: cuisinename,
      })
        .populate("cuisine")
        .populate("username");
      // console.log(posts);
    } else {
      posts = await Post.find().populate("cuisine").populate("username");
    }
    // console.log(posts);
    res.status(200).json(posts);
  } catch (err) {
    res.status(500).json(err);
  }
});

//get 4 post
router.get("/", async (req, res) => {
  try {
    let posts;
    posts = await Post.find().limit(4).populate("cuisine").populate("username");
    // console.log(posts);
    res.status(200).json(posts);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

module.exports = router;
