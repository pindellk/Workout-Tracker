// Establish dependencies
const express = require("express");
const app = express();

// Set up port for deployment
const PORT = process.env.PORT || 5000;

// Body parser middleware express app to handle data
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(__dirname + '/public'));

// Point our server to specific routes
require("./routes/apiRoutes")(app);
require("./routes/htmlRoutes")(app);

// Server listener
app.listen(PORT, () => {
    console.log("App listening on PORT: " + PORT)
});
