const express = require('express');
const mongoose = require('mongoose');
const config = require('./config');
const workoutModel = require('./models/workoutModel');

const app = express();

const db = config.get('mongoURI');

mongoose
  .connect(db, { useNewUrlParser: true, useCreateIndex: true, useFindAndModify: false })
  .then(() => console.log('MongoDB Connected...'))
  .catch(err => console.log(err));

  /*sample
  const newAnimal = new Animal({
    name: 'Red Panda',
    isEndangered: true
  })
  newAnimal
    .save()
    .then(item => console.log(item))
    .catch(err => console.log(err));

    data from schema check accuracy
    const newWorkout = Workout({

        day: new Date().setDate(new Date().getDate()-10),
        exercises: [
          {
            type: "resistance",
            name: "Bicep Curl",
            duration: 20,
            weight: 100,
            reps: 10,
            sets: 4
          }
        ]
      })

    newWorkout
    .save()
    .then(item => console.log(item))
    .catch(err => console.log(err));
    */
