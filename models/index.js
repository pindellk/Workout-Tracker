const mongoose = require("mongoose");
const options = { discrimatorKey: "kind" };

const exerciseSchema = new mongoose.Schema({
    type: {
        type: String,
        required: true,
        enum: ["resistance", "cardio"],
    },
    name: {
        type: String,
        trim: true,
        required: "Exercise name is required"
    },
    duration: {
        type: Number,
        required: true
    }
}, options);

const Exercise = mongoose.model("Exercise", exerciseSchema);

const resistanceSchema = new mongoose.Schema({
    weight: {
        type: Number,
        required: true
    },
    reps: {
        type: Number,
        required: true
    },
    sets: {
        type: Number,
        required: true
    }
}, options);

const Resistance = Exercise.discriminator("Resistance", resistanceSchema);

const cardioSchema = new mongoose.Schema({
    distance: {
        type: Number,
        required: true
    }
}, options);

const Cardio = Exercise.discriminator("Cardio", cardioSchema);

const workoutSchema = new mongoose.Schema ({
    day: {
        type: Date,
        required: true
    },
    exercises: [resistanceSchema, cardioSchema]
});

const Workout = mongoose.model("Workout", workoutSchema);

module.exports = {
    Resistance,
    Cardio,
    Workout
};