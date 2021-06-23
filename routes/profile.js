const router = require("express").Router();
const User = require("../models/User.model");
const isLoggedIn = require("../middleware/isLoggedIn");
// const Hobbies = require("../models/Hobbies.model");
const Session = require("../models/Session.model");
// const upload = require("../middleware/cloudinary");

router.put(`/update`, isLoggedIn, (req, res) => {
  const { username, age, gender, neighborhood, postalCode, hobbies } = req.body;

  /*
  const allHobbieIdPromise = hobbies.map(e => {Hobby.findOne({name: e})})
  const allHobbieIds = await Promise.all(allHobbieIdsPromise)
  const ids = allHobbieIds.map(e => e._id)
  */

  User.find({
    $or: [{ username }, { postalCode }, { age }, { gender }, { neighborhood }],
  }).then((allUsers) => {
    const allNotMe = allUsers.filter(
      (eachUser) => eachUser._id.toString() !== req.user._id.toString()
    );
    if (allNotMe.length) {
    }

    User.findByIdAndUpdate(
      req.user._id,
      {
        username,
        postalCode,
        age,
        gender,
        neighborhood,
        hobbies,
      },
      { new: true }
    ).then((betterUser) => {
      res.json({ user: betterUser });
    });
  });
});

router.delete("/delete", isLoggedIn, async (req, res) => {
  try {
    await Session.deleteMany({ user: req.user._id });

    await User.findByIdAndDelete(req.user._id);
    res.status(200).json(true);
  } catch (error) {
    console.log("HELLO", error);
    res.status(500).json({ error });
  }
});

module.exports = router;
