const router = require("express").Router();
const auth = require("../middleware/isLoggedIn");
const Hobbies = require("../models/Hobbies.model");
const User = require("../models/User.model");

router.get("/", (req, res) => {
  Hobbies.find({}).then((allHobbies) => {
    res.json(allHobbies);
  });
});

router.get("/:hobbyId", (req, res) => {
  Hobbies.findById(req.params.hobbyId)
    .populate("location")
    .populate("members")
    .populate("hobbies")
    .populate("description")
    .populate("neighborhood")
    .then((hobby) => {
      res.json(hobby);
    });
});

router.post("/add", auth, (req, res) => {
  Hobbies.findOne({
    hobbies: req.body.hobbies,
  }).then((hobby) => {
    if (hobby) {
      return res
        .status(400)
        .json({ errorMessage: "You already picked that one", key: "hobbies" });
    }

    const { hobbies, location, members } = req.body;

    Hobbies.create({
      hobbies,
      location,
      members: members.split(",").map((e) => e.trim()),
    })
      .then((createdHobbies) => {
        res.json({ hobby: createdHobbies });
      })
      .catch((error) => {
        console.log(error);
        res.json(500, { errorMessage: error.message });
      });
  });
});

module.exports = router;
