const express = require('express');
const logger = require("morgan");
const mongoose = require('mongoose');
const config = require('./config');
const excerciseModel = require('./models/exerciseModel');
const PORT = process.env.PORT || 3000;

const Exercise = require("./exerciseModel.js");

const app = express();

const db = config.get('mongoURI');

app.use(logger("dev"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/custommethoddb", { useNewUrlParser: true });

// mongoose
//   .connect(db, { useNewUrlParser: true, useCreateIndex: true, useFindAndModify: false })
//   .then(() => console.log('MongoDB Connected...'))
//   .catch(err => console.log(err));

  db.Exercise.create({ name: "Exercises" })
  .then(dbExercise=> {
    console.log(dbExercise);
  })
  .catch(({ message }) => {
    console.log(message);
  });

app.get("/notes", (req, res) => {
  db.Note.find({})
    .then(dbNote => {
      res.json(dbNote);
    })
    .catch(err => {
      res.json(err);
    });
});

app.get("/user", (req, res) => {
  db.User.find({})
    .then(dbUser => {
      res.json(dbUser);
    })
    .catch(err => {
      res.json(err);
    });
});

app.post("/submit", ({ body }, res) => {
  db.Note.create(body)
    .then(({ _id }) => db.User.findOneAndUpdate({}, { $push: { notes: _id } }, { new: true }))
    .then(dbUser => {
      res.json(dbUser);
    })
    .catch(err => {
      res.json(err);
    });
});

app.get("/populateduser", (req, res) => {
  db.User.find({})
    .populate("notes")
    .then(dbUser => {
      res.json(dbUser);
    })
    .catch(err => {
      res.json(err);
    });
});

app.listen(PORT, () => {
  console.log(`App running on port ${PORT}!`);
});
