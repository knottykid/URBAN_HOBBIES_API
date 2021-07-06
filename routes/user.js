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

    const currentUser = await User.findById(req.body.user._id);

    const follow = await User.findByIdAndUpdate(
      currentUser,
      { $addToSet: { following: user } },
      { new: true }
    );
    await User.findByIdAndUpdate(user, {
      $addToSet: { followers: currentUser },
    });

    return res.json(follow);
  } catch (err) {
    return res.status(500).json({ error: err });
  }
});

//unFollow the user
router.put("/:userId/unFollow", isLoggedIn, async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);

    const currentUser = await User.findById(req.body.user._id);

    const follow = await User.findByIdAndUpdate(
      currentUser,
      { $pull: { following: user } },
      { new: true }
    );
    await User.findByIdAndUpdate(user, {
      $pull: { followers: currentUser },
    });

    return res.json(follow);
  } catch (err) {
    return res.status(500).json({ error: err });
  }
});

module.exports = router;
