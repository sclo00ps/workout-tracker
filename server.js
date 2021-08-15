const express = require('express');
const logger = require("morgan");
const mongoose = require('mongoose');

const PORT = process.env.PORT || 3000;

const Exercises = require("./exerciseModel.js");

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

app.get("/duration", (req, res) => {
  db.Exercises.find({})
    .aggregate(duration)
    .then(dbExercise=> {
      res.json(dbExercise);
    })
    .catch(err => {
      res.json(err);
    });
});

app.get("/limit", (req, res) => {
  db.Exercises.find({})
    .limit (10)
    .then(dbExercise => {
      res.json(dbExercise);
    })
    .catch(err => {
      res.json(err);
    });
});

app.post("/workout", ({ body }, res) => {
  db.Exercises.create(body)
    .then(({ _id }) => db.User.findOneAndUpdate({}, { $push: { exercises: _id } }, { new: true }))
    .then(dbExercise => {
      res.json(dbExercise);
    })
    .catch(err => {
      res.json(err);
    });
});

app.put("/id", (req, res) => {
  db.Exer.find({})
    .push("exercises")
    .then(dbUser => {
      res.json(dbUser);
    })
    .catch(err => {
      res.json(err);
    });
});
app.delete("/id", (req, res) => {
  db.Exer.find({})
    .destroy("exercises")
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
