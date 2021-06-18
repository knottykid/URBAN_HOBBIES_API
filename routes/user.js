const router = require("express").Router();

const isLoggedIn = require("../middleware/isLoggedIn");
const User = require("../models/User.model");

router.get("/", isLoggedIn, (req, res) => {
  User.find({}).then((allUsers) => {
    res.json(allUsers);
  });
});

router.get("/:userId", isLoggedIn, async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);

    return res.json(user);
  } catch (error) {
    console.log(
      "Something went wrong getting the info of the user! -> ",
      error
    );
  }
  // User.findById({ username: req.params.userId }).then((theUser) => {
  //   if (!theUser) {
  //     return res
  //       .status(404)
  //       .json({ errMessage: "User with this name does not exist" });
  //   }
  //   return res.json({ user: theUser });
  // });
});
// router.get("/:userId", isLoggedIn, async (req, res) => {
//   try {
//     const dynamicUser = await User.findOne({ username: req.params.userId });
//     if (!dynamicUser) {
//       return res
//         .status(404)
//         .json({ errMessage: "User with this name does not exist" });
//     }
//     return res.json({ user: dynamicUser });
//   } catch (error) {}
// });

// router.get("/:userId", isLoggedIn, (req, res) => {
//   User.findById(req.params.userId)
//     // .populate("hobbies")
//     .then((theUser) => {
//       if (!theUser) {
//         return res
//           .status(404)
//           .json({ errMessage: "User with this name does not exist" });
//       }
//       console.log("THE USER", theUser);
//       return res.json({ user: theUser });
//     });
// });

module.exports = router;
