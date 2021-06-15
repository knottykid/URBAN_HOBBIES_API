const router = require("express").Router();

const User = require("../models/User.model");

router.get("/:userId", (req, res) => {
  User.findById(req.params.userId)
    .populate("hobbies")
    .then((theUser) => {
      if (!theUser) {
        return res
          .status(404)
          .json({ errMessage: "User with this name does not exist" });
      }
      console.log("THE USER", theUser);
      return res.json({ user: theUser });
    });
});

module.exports = router;
