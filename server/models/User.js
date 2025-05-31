const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: String,
  password: String,
  macros: {
    protein: Number,
    carbs: Number,
    fats: Number,
    calories: Number,
  },
  weightLog: [{ date: String, weight: Number }],
  workouts: [{ date: String, title: String, notes: String }],
  phases: [{ type: String, start: String, end: String }],
});

module.exports = mongoose.model("User", userSchema);
