// Initialize express
const express = require("express");
const app = express();

app.get("/", (req, res) => {
  res.send("Viewing all the changes in the application is not supported");
});

// Initialize the port number
const port = 4000;

// Listen the port
app.listen(port);
