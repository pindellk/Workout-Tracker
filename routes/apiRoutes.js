// Establish dependencies
const router = require("express").Router();
const mongoose = require("mongoose");

// Import model methods
const { Workout } = require("../models");

// Get all workouts
router.get("/api/workouts", (req, res) => {
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
router.post("/api/workouts", (req, res) => {
    Workout.create(req.body)
        .then(workout => {
            res.json(workout)
        })
        .catch(error => {
            res.status(400).json(error);
        });
});

// Update workout with exercise data
router.put("/api/workouts/:id", (req, res) => {
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
router.get("/api/workouts/range", (req, res) => {
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

module.exports = router;