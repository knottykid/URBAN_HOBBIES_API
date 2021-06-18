const router = require("express").Router();
const User = require("../models/User.model");
const isLoggedIn = require("../middleware/isLoggedIn");
const Hobbies = require("../models/Hobbies.model");
const Session = require("../models/Session.model");
// const upload = require("../middleware/cloudinary");

// router.get("/:userId", async (req, res) => {
//   try {
//     const dynamicUser = await User.findOne({ username: req.params.userId });
//     // const dynamicUser = await User.findById(req.params.userId);
//     if (!dynamicUser) {
//       return res
//         .status(404)
//         .json({ errMessage: "User with this name does not exist" });
//     }
//     return res.json(dynamicUser);
//   } catch (error) {
//     console.log("oh oh", error);
//   }
// });

// router.post("/profile", isLoggedIn, (req, res) => {
//   const { hobbies } =
//     req.body;

//     return res
//       .status(400)
//       .json({ errorMessage: "you need to complete the form before submit" });
//   }

//   }).then((goodUser) => {
//     User.findByIdAndUpdate(
//       req.user._id,
//       {
//         $addToSet: { newValues: goodUser._id },
//       },
//       { new: true }
//     ).then((superUser) => {
//       res.json({ message: "you did it!", user: superUser });
//     });
//   });
// });

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
