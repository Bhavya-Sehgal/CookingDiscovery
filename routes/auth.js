const router = require("express").Router();
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

//Register
router.post("/register", async (req, res) => {
  console.log(req.body);
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPass = await bcrypt.hash(req.body.password, salt);

    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: hashedPass,
    });

    const user = await newUser.save();
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json(err);
    console.log(err);
  }
});

//Login

router.post("/login", async (req, res) => {
  console.log(req.body);
  try {
    const user = await User.findOne({ username: req.body.username });

    console.log(user);

    if (!user) return res.status(400).json("Wrong credentials");

    const validated = await bcrypt.compare(req.body.password, user.password);

    console.log(validated);
    if (!validated) return res.status(400).json("Wrong credentials");

    // generating a jwt token
    const token = jwt.sign(
      {
        data: user._id,
      },
      process.env.JWT_SECRET,
      {}
    );

    console.log(token);

    //send everything to user except password
    const { password, ...others } = user._doc;
    console.log(others);
    res.status(200).json({ data: others, token });
  } catch (err) {
    res.status(500).json(err);
    console.log(err);
  }
});

module.exports = router;
