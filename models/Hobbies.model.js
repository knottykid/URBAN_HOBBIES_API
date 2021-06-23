const { Schema, model } = require("mongoose");
const NEIGHBORHOOD_ENUM = require("../utils/hoods");

const HobbiesSchema = new Schema({
  name: String,
  image: String,
  location: String,
  description: String,
  neighborhood: { type: String, enum: NEIGHBORHOOD_ENUM },
  postalCode: { type: [Number] },
});

const Hobbies = model("Hobbies", HobbiesSchema);

module.exports = Hobbies;
