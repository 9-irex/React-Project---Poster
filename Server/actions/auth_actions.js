// Import packages
const sendResponse = require("../responses/res_handler");
const Bcrypt = require("bcrypt");
const saltRounds = 10;
var sessionHoster;

// Session User Object - String the session as an object
const UserSessionObject = {
  UserID: "",
  Username: "",
  Password: "",
  Avatar: "",
  Status: "",
};

// Import mysql Config file
const db = require("../mysql/config");

const Register = async (req, res) => {
  // Fetch JSON data from the request
  const {
    Name,
    Email,
    Phone,
    Gender,
    Birthday,
    Username,
    Password,
    Status,
    Avatar,
    Date,
    Type,
  } = req.body;

  // Hashing the password
  Bcrypt.hash(Password, saltRounds, (err, hash) => {
    if (err) {
      sendResponse(req, res, 200, { "Hash Error": error });
    } else {
      // Create Mysql Query
      const query = "CALL pr_auth(?,?,?,?,?,?,?,?,?,?,?)";
      db.query(
        query,
        [
          Name,
          Email,
          Phone,
          Gender,
          Birthday,
          Username,
          hash,
          Status,
          Avatar,
          Date,
          Type,
        ],
        (error, result) => {
          if (error) {
            sendResponse(req, res, 204, {
              Error: error,
              Message: "Query Error",
            });
          } else {
            sendResponse(req, res, 200, {
              Error: null,
              Message: result[0][0].Message,
            });
          }
        }
      );
    }
  });
};

const Login = async (req, res) => {
  // Fetch JSON data from the request
  const { Username, Password, Type } = req.body;

  // Create Mysql Query
  const query = "CALL pr_auth(?,?,?,?,?,?,?,?,?,?,?)";
  await db.query(
    query,
    ["", "", "", "", "", Username, "", "", "", "", Type],
    (error, result) => {
      // Checking any query error
      if (error == null) {
        // Checking if am not returning back a row of data from mysql
        if (result[0][0].Message != undefined) {
          sendResponse(req, res, 200, {
            Error: null,
            Message: result[0][0].Message,
          });
        } else {
          // Initializing UserObjects For Stroing The Session
          UserSessionObject.UserID = result[0][0].UserID;
          UserSessionObject.Username = result[0][0].Username;
          UserSessionObject.Password = result[0][0].Password;
          UserSessionObject.Avatar =
            result[0][0].Avatar.length == 1
              ? // Image - A
                "/Images/Avatars/Image - " + result[0][0].Avatar + ".jpg"
              : "/Images/Uploads/" + result[0][0].Avatar;
          UserSessionObject.Status = result[0][0].Status;

          // Setting up the session
          sessionHoster = req.session;

          // Hashing The Password
          Bcrypt.compare(Password, result[0][0].Password, (error, result) => {
            if (error) {
              sendResponse(req, res, 200, { "Hash Error": error });
            } else {
              if (result) {
                // Now assign the session to the sessionHoster Variabe
                sessionHoster.userCredentials = UserSessionObject;
                sendResponse(req, res, 200, {
                  Error: null,
                  Message: UserSessionObject,
                });
              } else {
                sendResponse(req, res, 200, {
                  Error: null,
                  Message: "Password Not Matched",
                });
              }
            }
          });
        }
      } else {
        sendResponse(req, res, 200, { Error: error, Message: "Query Error" });
      }
    }
  );
};

const isLogged = (req, res) => {
  if (!req.session.userCredentials) {
    sendResponse(req, res, 200, { isLoggedIn: false, userCredentials: null });
  } else {
    sendResponse(req, res, 200, {
      isLoggedIn: true,
      userCredentials: req.session.userCredentials,
    });
  }
};

const LogoutUser = (req, res) => {
  req.session.destroy();
  res.send("Session has been destroyed");
};

const getDetails = (req, res) => {
  const { id } = req.params;
  const query = "CALL pr_auth(?,?,?,?,?,?,?,?,?,?,?)";
  db.query(
    query,
    [id, "", "", "", "", "", "", "", "", "", ""],
    (error, result) => {
      if (error) {
        sendResponse(req, res, 200, { Error: error, Message: "Query Error" });
      } else {
        sendResponse(req, res, 200, { Error: null, Message: result });
      }
    }
  );
};

module.exports = { Register, Login, isLogged, LogoutUser, getDetails };
