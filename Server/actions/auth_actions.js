// Import packages
const Bcrypt = require("bcrypt");
const saltRounds = 10;

const UserSessionObject = {
  UserID: "",
  Username: "",
  Password: "",
  Status: "",
};

// Impoert Config file
const db = require("../mysql/config");

const Register = async (req, res) => {
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

  Bcrypt.hash(Password, saltRounds, (err, hash) => {
    if (err) {
      console.log(err);
    } else {
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
        (err, result) => {
          res.send({ Error: err, Message: result[0][0].Message });
        }
      );
    }
  });
};

const Login = (req, res) => {
  const { Username, Password, Type } = req.body;
  const query = "CALL pr_auth(?,?,?,?,?,?,?,?,?,?,?)";
  db.query(
    query,
    ["", "", "", "", "", Username, "", "", "", "", Type],
    (err, result) => {
      if (err === null) {
        // Initializing UserObjects
        UserSessionObject.UserID = result[0][0].UserID;
        UserSessionObject.Username = result[0][0].Username;
        UserSessionObject.Password = result[0][0].Password;
        UserSessionObject.Status = result[0][0].Status;

        Bcrypt.compare(Password, result[0][0].Password, (error, result) => {
          if (result) {
            // Set the session
            // req.session.userCredentials = UserSessionObject;

            res.send({ Error: null, Message: UserSessionObject });
          } else {
            res.send({ Error: error, Message: "No" });
          }
        });
      } else {
        console.log(err);
      }
    }
  );
};

module.exports = { Register, Login };
