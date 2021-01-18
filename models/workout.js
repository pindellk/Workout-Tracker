const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const workoutSchema = new Schema({
  day: {
    type: Date,
    default: Date.now,
  },
  exercises: [
    {
      type: {
        type: String,
      },
      name: {
        type: String,
      },
      weight: {
        type: Number,
      },
      sets: {
        type: Number,
      },
      reps: {
        type: Number,
      },
      duration: {
        type: Number,
      },
      distance: {
        type: Number,
      },
    },
  ],
});

workoutSchema.virtual("totalDuration").get(function () {
  let total = 0;
  for (const exercise of this.exercises) {
    total += exercise.duration;
  }
  return total;
});

workoutSchema.set("toJSON", { virtuals: true });

const Workout = mongoose.model("Workout", workoutSchema);

module.exports = Workout;
