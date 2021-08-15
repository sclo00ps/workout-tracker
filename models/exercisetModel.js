const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ExerciseSchema = new Schema({

  day: {
    type: Date,
    default: Date.now
  },

  type: {
    type: String,
    trim: true,
    required: "Type is Required"
  },

  name: {
    type: String,
    unique: true,
    required: true
  },

  duration: {
    type: Number,
    unique: true,
    required: true
  },

 weight: {
    type: Number,
    unique: true,
    required: true
  },
  reps: {
    type: Number,
    unique: true,
    required: true
  },
  sets: {
    type: Number,
    unique: true,
    required: true
  }
 });

const Exercise = mongoose.model("Exercise", ExerciseSchema);

module.exports = Exercise;