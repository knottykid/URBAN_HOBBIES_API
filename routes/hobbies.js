const router = require("express").Router();
const auth = require("../middleware/isLoggedIn");
const mongoose = require("mongoose");
const Hobbies = require("../models/Hobbies.model");
const User = require("../models/User.model");

router.get("/", (req, res) => {
  Hobbies.find({}).then((allHobbies) => {
    res.json(allHobbies);
  });
});
//display single hobbies info
router.get("/:hobbyId", async (req, res) => {
  try {
    const hobby = await Hobbies.findById(req.params.hobbyId);

    return res.json(hobby);
  } catch (error) {
    console.log("Something went wrong getting the info on a hobby! -> ", error);
  }

  // .then((hobby) => {
  //   res.json(hobby);
  // })
  // .catch((err) => {
  //   console.log(
  //     "Something went wrong getting the info on a hobbie! -> ",
  //     err
  //   );
  // });
});

//create a new hobby
router.post("/add", auth, async (req, res) => {
  const oldHobby = await Hobbies.findOne({ name: req.body.name });
  try {
    if (oldHobby) {
      return (
        res.status(400),
        json({ errorMessage: "This Hobby already exist", key: "name" })
      );
    }
    const { name, description, image, neighborhood, postalCode } = req.body;

    const newHobby = await Hobbies.create({
      name,
      description,
      image,
      neighborhood,
      postalCode,
      // createdBy: user._id,
    });
    return res.json({ hobbies: newHobby });
  } catch (error) {
    console.log("HELLO ERROR", error);
    res.json(500).json({ errorMessage: error.message });
  }
});

// const toId = mongoose.Types.ObjectId;
// //user join the hobby
// router.get("/:hobbyId/join", (req, res) => {
//   Hobbies.findById({ id: req.params.hobbyId })
//     .populate("members")
//     .then((hobby) => {
//       console.log("YO:", hobby);
//       User.findByIdAndUpdate(
//         console.log(req.user),
//         req.user._id,
//         { $pull: { hobbies: hobby_id } },
//         { new: true }
//       ).then((updatedUser) => {
//         console.log("DAS:", updatedUser);
//         res.json(updatedUser);
//       });
//     });
// });
// router.post("/:hobbyId/join", (req, res) => {
//   const { _id, userId } = req.body;

//   Hobbies.findByIdAndUpdate(_id, { $push: { users: userId } }, { new: true })
//     .populate("members")
//     .then((updatedHobby) => {
//       console.log("WWW", updatedHobby);
//       User.findByIdAndUpdate(
//         userId,
//         { $push: { hobbies: updatedHobby._id } },
//         { new: true }
//       ).then((userUpdated) => {
//         console.log("YELL", userUpdate);
//         res.status(201).json({ user: userUpdated, hobby: updatedHobby });
//       });
//     })
//     .catch((err) => {
//       res.status(400).json({ message: "Something went wrong" }, err);
//     });
// });

//add hobbies to the user
//! adding slug to the hobbies and user model afterwards
// router.get("/:hobbyId/join", auth, async (req, res) => {
//   const member = await Hobbies.find({ members: req.user._id });
//   const hobby = await Hobbies.findOneAndUpdate(
//     req.params.hobbyId,
//     { $addToSet: { members: req.session.user._id } },
//     { new: true }
//   ).populate("members");
//   const isMember = hobby.members.find(
//     (user) => user.username === req.user.username
//   );
//   if (isMember) {
//     return res.json({ status: member });
//   }
//   await User.findByIdAndUpdate(
//     req.user._id,
//     { $addToSet: { hobbies: hobby._id } },
//     { new: true }
//   );
//   res.json({ hobbies: hobby, members: member, user: req.user._id });
// });

//create a new Hobby

// router.post("/add", auth, (req, res) => {
//   Hobbies.findOne({
//     hobbies: req.body.hobbies,
//   })
//     .populate("createdBy")
//     .then((hobby) => {
//       if (hobby) {
//         return res.status(400).json({
//           errorMessage: "You already picked that one",
//           key: "hobbies",
//         });
//       }

//       const { name, description, neighborhood, postalCode } = req.body;

//       Hobbies.create({
//         name,
//         description,
//         neighborhood,
//         postalCode,
//         createdBy: user._id,

//         // members: members.split(",").map((e) => e.trim()),
//       })
//         .then((createdHobbies) => {
//           Hobbies.findByIdAndUpdate(
//             req.user._id,
//             { $addToSet: { newHobby: createdHobbies._id } },
//             { new: true }
//           )
//             .populate("createdBy")
//             .then((updatedHobbies) => {
//               res.json({ hobbies: updatedHobbies });
//             });
//           res.json({ hobby: createdHobbies });
//         })
//         .catch((error) => {
//           console.log(error);
//           res.json(500, { errorMessage: error.message });
//         });
//     });
// });

module.exports = router;
