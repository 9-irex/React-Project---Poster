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

  const query = "CALL pr_auth(?,?,?,?,?,?,?,?,?,?,?)";
  await db.query(
    query,
    [
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
    ],
    (err, result) => {
      res.send({ Error: err, Message: result[0][0].Message });
    }
  );
};

const Login = (req, res) => {
  const { Username, Password, Type } = req.body;

  const query = "CALL pr_auth(?,?,?,?,?,?,?,?,?,?,?)";
  db.query(
    query,
    ["", "", "", "", "", Username, Password, "", "", "", Type],
    (err, result) => {
      res.send({ Error: err, Message: result[0][0].Message });
    }
  );
};

const Load = (req, res) => {
  res.send("Load ");
};

module.exports = { Register, Login, Load };
