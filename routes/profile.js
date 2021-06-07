const router = require("express").Router();
const User = require("../models/User.model");
const isLoggedIn = require("../middleware/isLoggedIn");
const upload = require("../middleware/cloudinary");

router.put(`/update`, isLoggedIn, (req, res) => {
  // router.put(`/update`, (req, res) => {

  const { username, email } = req.body;

  // if (username.length < 8) {
  //   // deal with it
  // }

  // if (email.length < 8) {
  //   // deal with this
  // }
  User.find({ $or: [{ username }, { email }] }).then((allUsers) => {
    const allNotMe = allUsers.filter(
      (eachUser) => eachUser._id.toString() !== req.user._id.toString()
    );
    if (allNotMe.length) {
      // OPPSIE, WE CAN'T UPDATE
    }

    User.findByIdAndUpdate(
      req.user._id,
      { email, username },
      { new: true }
    ).then((newFabulousUser) => {
      res.json({ user: newFabulousUser });
    });
  });
});

module.exports = router;
