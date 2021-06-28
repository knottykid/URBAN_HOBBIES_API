const router = require("express").Router();

const isLoggedIn = require("../middleware/isLoggedIn");
const User = require("../models/User.model");

// this get all the users
router.get("/", isLoggedIn, async (req, res) => {
  const allUsers = await User.find({});
  return res.status(200).json(allUsers);
});

router.get("/:userId", isLoggedIn, async (req, res) => {
  try {
    const user = await User.findById(req.params.userId).populate([
      "following",
      "followers",
    ]);

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
  try {
    const user = await User.findById(req.params.userId);
    console.log("!!", user);
    const currentUser = await User.findById(req.body.user._id);
    console.log("??", currentUser);

    User.findByIdAndUpdate(
      currentUser,
      { $addToSet: { following: user } },
      { new: true }
    ).then((data) => {});
    User.findByIdAndUpdate(
      user,
      { $addToSet: { followers: currentUser } },
      { new: true }
    ).then((response) => {
      return res.json(response);
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

//unFollow the user
router.put("/:userId/unFollow", async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    const currentUser = await User.findById(req.body.user._id);
    console.log("YES", user);
    console.log("NO", currentUser);
    if (currentUser.followers > 0) {
      User.findByIdAndUpdate(
        user,
        { $pull: { followers: currentUser } },
        { new: true }
      ).then((u) => {
        console.log("Como Te LLAMAs?", u);
        return res.json(u);
      });
    }
    if (user.following > 0) {
      User.findByIdAndUpdate(
        currentUser,
        { $pull: { following: user } },
        { new: true }
      ).then((e) => {
        console.log("Quien ERES?", e);
        return res.json(e);
      });
    }
    // return res.status(200).json("user has been unFollowed");
    // } else {
    //   res.status(403).json("you don't follow this user");
    // }
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
