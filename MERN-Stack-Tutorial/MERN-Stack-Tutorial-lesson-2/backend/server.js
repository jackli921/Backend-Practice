require("dotenv").config();

const mongoose = require('mongoose')
const express = require("express");
const workoutRoutes = require("./routes/workouts");
const cors = require('cors')

//express app
const app = express();
app.use(cors())

//middleware
app.use(express.json())

app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

// routes
app.use("/api/workouts", workoutRoutes);

// connect to db
mongoose.connect("mongodb://localhost:27017/ninja")
  .then(()=> {
    app.listen(process.env.PORT, () => {
      console.log("Connected to DB & Listening on port", process.env.PORT);
    });
  })
  .catch((err)=> console.log(err))