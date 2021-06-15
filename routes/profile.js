const router = require("express").Router();
const User = require("../models/User.model");
const isLoggedIn = require("../middleware/isLoggedIn");
const Hobbies = require("../models/Hobbies.model");
// const upload = require("../middleware/cloudinary");

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

router.put(`/update`, isLoggedIn, async (req, res) => {
  const { username, age, gender, neighborhood, postalCode, hobbies } = req.body;
  console.log("HOBO:", hobbies);

  /*
  const allHobbieIdPromise = hobbies.map(e => {Hobby.findOne({name: e})})

  const allHobbieIds = await Promise.all(allHobbieIdsPromise)

  const ids = allHobbieIds.map(e => e._id)
  */

  User.find({
    $or: [
      { username },
      { postalCode },
      { age },
      { gender },
      { neighborhood },
      // { hobbies },
    ],
  }).then((allUsers) => {
    const allNotMe = allUsers.filter(
      (eachUser) => eachUser._id.toString() !== req.user._id.toString()
    );
    if (allNotMe.length) {
      // OPPSIE, WE CAN'T UPDATE
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
    )
      // .populate("hobbies")
      .then((betterUser) => {
        console.log("New Noise:", betterUser);

        console.log("YOYOYOY:", typeof hobbies);
        res.json({ user: betterUser });
      });
  });
});

module.exports = router;
