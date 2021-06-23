const router = require("express").Router();

const isLoggedIn = require("../middleware/isLoggedIn");
const User = require("../models/User.model");

// this get all the users
router.get("/", isLoggedIn, (req, res) => {
  User.find({}).then((allUsers) => {
    res.json(allUsers);
  });
});

router.get("/:userId", isLoggedIn, async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    console.log("RAMBO", user);
    return res.json(user);
  } catch (error) {
    console.log(
      "Something went wrong getting the info of the user! -> ",
      error
    );
  }
});

//follow a user

router.put("/:userId/follow", isLoggedIn, async (req, res) => {
  console.log("ANY", req.body.user._id);
  // if (req.body.user._id !== req.params.userId) {
  try {
    const user = await User.findById(req.params.userId);
    console.log("!!", user);
    const currentUser = await User.findById(req.body.user._id);
    console.log("??", currentUser);

    // if (!user.followers.includes(req.body.user._id)) {

    User.findByIdAndUpdate(
      req.body.user._id,

      { $addToSet: { following: req.params.userId } },
      { new: true }
    )
      .populate("following")
      .then((data) => {
        console.log("GUGU", data);
        res.json(data);
      });
    User.findByIdAndUpdate(
      req.params.userId,
      { $addToSet: { followers: req.body.user._id } },
      { new: true }
    )
      .populate("followers")
      .then((response) => {
        console.log("GUGU", response);
        res.json(response);
      });
    // const updateUser = await User.findByIdAndUpdate(
    //   user,
    //   { $addToSet: { followers: req.body.user._id } },
    //   { new: true }
    // ).populate("followers");
    // console.log("WAIT", updateUser);
    // console.log(">>", user, ">>", currentUser);
    // //   await currentUser
    //     .findByIdAndUpdate(
    //       user,
    //       { $addToSet: { followings: req.params.userId } },
    //       { new: true }
    //     )
    //     .populate("followings");
    //   console.log(">>!", user, ">>!", currentUser);
    //   res.status(200).json("user has been followed");
    // } else {
    //   res.status(403).json("you already follow this user");
    // }
  } catch (err) {
    res.status(500).json(err);
  }
  // } else {
  //   res.status(403).json("you cant follow yourself");
  // }
});

//unFollow the user
router.put("/:userId/unFollow", async (req, res) => {
  if (req.body.user._id !== req.params.userId) {
    try {
      const user = await User.findById(req.params.userId);
      const currentUser = await User.findById(req.body.user._id);
      if (user.followers.includes(req.body.user._id)) {
        await User.findByIdAndUpdate(
          req.body.user._id,
          { $pull: { following: req.params.userId } },
          { new: true }
        ).populate("following");

        await User.findByIdAndUpdate(
          req.params.userId,
          { $pull: { followers: req.body.user._id } },
          { new: true }
        );
        res.status(200).json("user has been unFollowed");
      } else {
        res.status(403).json("you don't follow this user");
      }
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(403).json("you cant unFollow yourself");
  }
});

module.exports = router;
