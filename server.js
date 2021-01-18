// Establish dependencies
const express = require("express");
const app = express();
const mongoose = require("mongoose");

// Set up port for deployment
const PORT = process.env.PORT || 5000;

// Body parser middleware express app to handle data
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(__dirname + "/public"));

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/workout", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

// Point our server to specific routes
app.use(require("./routes/apiRoutes"));
app.use(require("./routes/htmlRoutes"));

// Server listener
app.listen(PORT, () => {
  console.log("App listening on PORT: " + PORT);
});
