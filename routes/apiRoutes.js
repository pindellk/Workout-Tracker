// Establish dependencies
const e = require("express");
const mongoose = require("mongoose");

// Import model methods
const { Workout } = require("../models");

// Mongoose connection
mongoose.connect(
    process.env.MONGODB_URI || "mongodb://localhost/workout", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
});

module.exports = (app) => {
    // Get all workouts
    app.get("/api/workouts", (req, res) => {
        Workout.find({})
            .sort({ date: -1 })
            .then(workouts => {
                res.json(workouts);
            })
            .catch(error => {
                res.status(400).json(error);
            });
    });

    // Create new workout
    app.post("/api/workouts", (req, res) => {
        Workout.create(req.body)
            .then(workout => {
                res.json(workout)
            })
            .catch(error => {
                res.status(400).json(error);
            });
    });

    // Update workout with exercise data
    app.put("/api/workouts/:id", (req, res) => {
        const id = req.params.id;
        const exercises = req.body;

        Workout.findOneAndUpdate(
            id,
            {
                $inc: { totalDuration: +req.body.duration },
                $push: { exercises: exercises }
            },
            { new: true })
            .then(workout => {
                res.json(workout)
            })
            .catch(error => {
                res.status(400).json(error);
            });
    });

    // Get last 7 days' workouts
    app.get("/api/workouts/range", (req, res) => {
        Workout.find({})
            .sort({ date: -1 })
            .limit(7)
            .then(workout => {
                res.json(workout)
            })
            .catch((error) => {
                res.status(400).json(error);
            });
    });

};