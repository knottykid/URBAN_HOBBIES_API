const { Schema, model } = require("mongoose");
const NEIGHBORHOOD_ENUM = require("../utils/hoods");

const userSchema = new Schema(
  {
    name: { type: String, required: true },
    username: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    profilePic: {
      type: String,
      default:
        "https://res.cloudinary.com/dzxo1mr9i/image/upload/v1623014144/user-silhouette_giarjw.png",
    },
    following: [{ type: Schema.Types.ObjectId, ref: "User" }],
    followers: [{ type: Schema.Types.ObjectId, ref: "User" }],
    location: { type: String, default: "Berlin" },
    neighborhood: { type: String, enum: NEIGHBORHOOD_ENUM },
    postalCode: { type: String },
    age: { type: Number },
    hobbies: [String],
    gender: { type: String },
  },
  {
    timestamps: true,
  }
);

const User = model("User", userSchema);

module.exports = User;
