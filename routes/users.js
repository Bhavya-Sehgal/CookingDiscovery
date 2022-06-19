const router = require("express").Router();
const User = require("../models/User");
const Post = require("../models/Post");
const bcrypt = require("bcrypt");
const isloggedin = require("../middleware/isloggedin");

//UPDATE USER

// router.put("/:id", isloggedin, async (req, res) => {
//   if (req.body.userId === req.params.id) {
//     if (req.body.password) {
//       const salt = await bcrypt.genSalt(10);
//       req.body.password = await bcrypt.hash(req.body.password, salt);
//     }
//     try {
//       const updatedUser = await User.findByIdAndUpdate(
//         req.params.id,
//         {
//           $set: req.body,
//         },
//         { new: true }
//       );
//       res.status(200).json(updatedUser);
//     } catch (err) {
//       res.status(500).json(err);
//     }
//   } else {
//     res.status(401).json("You can update only your account");
//   }
// });

router.put("/", isloggedin, async (req, res) => {
  console.log(req.body);
  if (req.body.password) {
    const salt = await bcrypt.genSalt(10);
    req.body.password = await bcrypt.hash(req.body.password, salt);
  }
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.user._id,
      {
        // $set: req.body,
        // ...req.user,
        ...req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedUser);
  } catch (err) {
    res.status(500).json(err);
  }
});

//DELETE USER

// router.delete("/:id", isloggedin, async (req, res) => {
//   try {
//     const user = await User.findById(req.params.id.replace(/\n/g, ""));
//     if (req.body.userId === req.params.id.replace(/\n/g, "")) {
//       try {
//         await Post.deleteMany({ username: user.username });
//         await User.findByIdAndDelete(req.params.id.replace(/\n/g, ""));
//         res.status(200).json("Post has been Deleted");
//       } catch (err) {
//         res.status(500).json(err);
//       }
//     } else {
//       res.status(400).json("You can delete only your post");
//     }
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

router.delete("/", isloggedin, async (req, res) => {
  try {
    await Post.deleteMany({ username: req.user._id });
    await User.findByIdAndDelete(req.user._id);
    res.status(200).json("Post has been Deleted");
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET USER

router.get("/:id", isloggedin, async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    const { password, ...others } = user._doc;
    res.status(200).json(others);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
