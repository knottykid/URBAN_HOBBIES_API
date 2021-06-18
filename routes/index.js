const router = require("express").Router();
const authRoutes = require("./auth");
const userRoutes = require("./user");
const profileRoutes = require("./profile");
const hobbiesRoutes = require("./hobbies");
// const uploadPictureRoutes = require("./uploadPicture");
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
/* GET home page */
router.get("/", (req, res, next) => {
  res.json("All good in here");
});

router.use("/auth", authRoutes);
router.use("/users", userRoutes);
router.use("/profile", profileRoutes);
router.use("/hobbies", hobbiesRoutes);
// router.use("/uploadPicture/:id", uploadPictureRoutes);
module.exports = router;
