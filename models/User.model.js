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
    contacts: [{ type: Schema.Types.ObjectId, ref: "User" }],
    // hobbies: [{ type: Schema.Types.ObjectId, ref: "Hobbies" }],
    // location: String,
    //coords: [String],
    neighborhood: { type: String, enum: NEIGHBORHOOD_ENUM },
    postalCode: { type: Number },
    age: { type: Number },
    hobbies: [String],
    gender: { type: String },
    // hobbiesTest
  },
  {
    timestamps: true,
  }
);

const User = model("User", userSchema);

module.exports = User;
