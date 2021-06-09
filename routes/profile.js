const router = require("express").Router();
const User = require("../models/User.model");
const isLoggedIn = require("../middleware/isLoggedIn");
// const upload = require("../middleware/cloudinary");

router.post("/profile", isLoggedIn, (req, res) => {
  const { fullName, email, age, postalCode, gender, neighborhood } = req.body;

  if (!fullName || !email || !age || !postalCode || !gender || !neighborhood) {
    return res
      .status(400)
      .json({ errorMessage: "you need to complete the form before submit" });
  }

  User.create({
    fullName,
    email,
    age,
    postalCode,
    gender,
    neighborhood,
    user: req.user_id,
  }).then((goodUser) => {
    User.findByIdAndUpdate(
      req.user._id,
      {
        $addToSet: { newValues: goodUser._id },
      },
      { new: true }
    ).then((superUser) => {
      res.json({ message: "you did it!", user: superUser });
    });
  });
});

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
