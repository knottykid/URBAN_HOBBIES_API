const router = require("express").Router();

const User = require("../models/User.model");

router.get("/:userId", (req, res) => {
  User.findOne({ username: req.params.userId }).then((theUser) => {
    if (!theUser) {
      return res
        .status(404)
        .json({ errMessage: "User with this name does not exist" });
    }
    return res.json({ user: theUser });
  });
});

module.exports = router;
