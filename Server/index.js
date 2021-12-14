// Initialize express
const express = require("express");
const app = express();

// Import extra things
const cors = require("cors");
const bodyParser = require("body-parser");
const Auth = require("./routes/auth_routes");
const Post = require("./routes/post_routes");
const Chat = require("./routes/chat_routes");
const Requests = require("./routes/request_routes");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const clientUrl = "http://localhost:3000";
const phpUrl = "http://localhost/";
const sessionAge = 1000 * 60 * 60 * 24;

// Middlwares
app.use(
  cors({
    origin: clientUrl,
    credentials: true,
  })
);
app.use(bodyParser.json({ limit: "100mb" }));
app.use(bodyParser.urlencoded({ extended: true, limit: "100mb" }));
app.use(express.json());
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
app.use("/api/v1/poster", Requests);
app.use("/api/v1/poster", Chat);

// Initialize the port number
const port = 4000;

// Listen the port
app.listen(port);
