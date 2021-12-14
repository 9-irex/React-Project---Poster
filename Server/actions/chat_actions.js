// Import packages
const sendResponse = require("../responses/res_handler");

// Import mysql Config file
const db = require("../mysql/config");

const getChatBoxes = (req, res) => {
  const { id } = req.params;
  const query = "CALL pr_chat(?,?)";
  db.query(query, [id, "getChatBox"], (error, result) => {
    if (error) {
      sendResponse(req, res, 200, { Error: error, Message: "Query Failed" });
    } else {
      sendResponse(req, res, 200, { Error: null, Message: result[0] });
    }
  });
};

const getFriends = (req, res) => {
  const { id } = req.params;
  const query = "CALL pr_chat(?,?)";
  db.query(query, [id, "getFriends"], (error, result) => {
    if (error) {
      sendResponse(req, res, 200, { Error: error, Message: "Query Failed" });
    } else {
      sendResponse(req, res, 200, { Error: null, Message: result[0] });
    }
  });
};

const sendMesssage = (req, res) => {
  const { Type, From, To, _Date, GroupID, Message } = req.body;
  const query = "CALL pr_message(?,?,?,?,?,?,?,?)";
  db.query(
    query,
    ["", Type, From, To, _Date, GroupID, Message, "SendMessage"],
    (error, result) => {
      if (error) {
        sendResponse(req, res, 200, { Error: error, Message: "Query Failed" });
      } else {
        sendResponse(req, res, 200, {
          Error: null,
          Message: result[0],
        });
      }
    }
  );
};

const getMessages = (req, res) => {
  const { fromid, toid, type } = req.params;
  const query = "CALL pr_message(?,?,?,?,?,?,?,?)";

  db.query(
    query,
    ["", type, fromid, toid, "", "", "", "getMessages"],
    (err, result) => {
      if (err) {
        sendResponse(req, res, 200, { Error: error, Message: "Query Failed" });
      } else {
        sendResponse(req, res, 200, {
          Error: null,
          Message: result[0],
        });
      }
    }
  );
};

module.exports = { getChatBoxes, sendMesssage, getMessages, getFriends };
