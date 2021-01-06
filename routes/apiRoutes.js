// Establish dependencies
const e = require("express");
const mongoose = require("mongoose");

// Import model methods
const { Exercise, Resistance, Cardio, Workout } = require("../models");

// Mongoose connection
mongoose.connect(
    process.env.MONGODB_URI || "mongodb://localhost/workout", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
});

module.exports = (app) => {
    app.post("/api/workouts", (req, res) => {
        const workout = new Workout({ day: new Date() });
        workout.save(function (err) {
            if (err) {
                console.log(err);
            };
        });
        return res.json(workout);
    });

    app.put("/api/workouts/:id", (req, res) => {
        const id = req.params.id;
        const exercises = req.body;

        Workout.findOneAndUpdate(
            id,
            { $push: { exercises: exercises } },
            { new: true },
            function (err, workout) {
                if (err) {
                    console.log(err)
                }
                return res.json(workout);
            });
    });

    app.get("/api/workouts", (req, res) => {
        Workout.find().lean().exec(function (err, workouts) {
            if (err) {
                console.log(err)
            }
            return res.json(workouts);
        });
    });

    app.get("/api/workouts/:id", (req, res) => {
        const id = req.params.id;
        Workout.findById(id).exec(function (err, workout) {
            if (err) {
                console.log(err)
            }
            res.send(res.json(workout));
        });
    });

    // app.get("/api/workouts/range", (req, res) => {

    // })
};
