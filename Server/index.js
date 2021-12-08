// Initialize express
const express = require("express");
const app = express();

// Import extra things
const cors = require("cors");
const bodyParser = require("body-parser");
const Auth = require("./routes/auth_routes");
const Post = require("./routes/post_routes");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const clientUrl = "http://localhost:3000";
const sessionAge = 1000 * 60 * 60 * 24;

// Middlwares
app.use(
  cors({
    origin: [clientUrl],
    methods: ["GET", "POST"],
    credentials: true,
  })
);
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

// Setting Session
app.use(
  session({
    secret: "UserSession",
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: sessionAge },
  })
);

// call routes
app.use("/api/v1/poster", Auth);
app.use("/api/v1/poster", Post);

// Initialize the port number
const port = 4000;

// Listen the port
app.listen(port);
