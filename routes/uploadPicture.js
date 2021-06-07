const router = require("express").Router();
const User = require("../models/User.model");

const upload = require("../middleware/cloudinary");

router.post(
  "/uploadPicture/:id",

  upload.single("profilePic"),
  (req, res) => {
    console.log(req);
    const profilePic = req.file.path;
    const id = req.params.id;

    User.findByIdAndUpdate(id, { profilePic })
      .then(() => {
        res.json({ picFromServer: profilePic });
      })
      .catch((err) => {
        console.log(err);
      });
  }
);

module.exports = router;
