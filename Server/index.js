// Initialize express
const express = require("express");
const app = express();

// Import extra things
const cors = require("cors");
const bodyParser = require("body-parser");
const Auth = require("./routes/auth_routes");

// Middlwares
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// call routes
app.use("/api/v1/poster", Auth);

// Initialize the port number
const port = 4000;

// Listen the port
app.listen(port);
