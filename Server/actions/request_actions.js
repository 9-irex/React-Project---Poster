// import packages
const sendResponse = require("../responses/res_handler");

// Import mysql Config file
const db = require("../mysql/config");

const fetchSuggest = (req, res) => {
  const { id } = req.params;
  const query = "CALL pr_friend(?,?,?,?,?)";
  db.query(query, [id, "", "", "Suggest", ""], (error, result) => {
    if (error) {
      sendResponse(req, res, 200, { Error: error, Message: "Query Error" });
    } else {
      sendResponse(req, res, 200, { Error: null, Message: result[0] });
    }
  });
};

const fetchRequest = (req, res) => {
  const { id, type } = req.params;
  const query = "CALL pr_friend(?,?,?,?,?)";
  db.query(query, [id, "", "", type, ""], (error, result) => {
    if (error) {
      sendResponse(req, res, 200, { Error: error, Message: "Query Error" });
    } else {
      sendResponse(req, res, 200, { Error: null, Message: result[0] });
    }
  });
};

const sendRequest = (req, res) => {
  const { ReqID, From, To, Status, Date: __Date } = req.body;
  const query = "CALL pr_friend(?,?,?,?,?)";

  db.query(query, ["", From, To, Status, __Date], (error, result) => {
    if (error) {
      sendResponse(req, res, 200, { Error: error, Message: "Query Error" });
    } else {
      sendResponse(req, res, 200, {
        Error: null,
        Message: "New request has been made",
      });
    }
  });
};

const acceptRequest = (req, res) => {
  const { requestID, Status, Date: __Date } = req.body;
  const query = "CALL pr_friend(?,?,?,?,?)";

  db.query(query, [requestID, "", "", Status, __Date], (error, result) => {
    if (error) {
      sendResponse(req, res, 200, { Error: error, Message: result });
    } else {
      sendResponse(req, res, 200, { Error: null, Message: "Query Access" });
    }
  });
};

const cancelRequest = (req, res) => {
  const { requestID, Status, Date: __Date } = req.body;
  const query = "CALL pr_friend(?,?,?,?,?)";

  db.query(query, [requestID, "", "", Status, __Date], (error, result) => {
    if (error) {
      sendResponse(req, res, 200, { Error: error, Message: "Query Error" });
    } else {
      sendResponse(req, res, 200, { Error: null, Message: "Query Access" });
    }
  });
};

const MostFollowed = (req, res) => {
  const query = "CALL pr_friend(?,?,?,?,?)";
  db.query(query, ["", "", "", "MostFollowed", ""], (error, result) => {
    if (error) {
      sendResponse(req, res, 200, { Error: error, Message: "Query Error" });
    } else {
      sendResponse(req, res, 200, { Error: null, Message: result[0] });
    }
  });
};

const MostActive = (req, res) => {
  const query = "CALL pr_friend(?,?,?,?,?)";
  db.query(query, ["", "", "", "MostActive", ""], (error, result) => {
    if (error) {
      sendResponse(req, res, 200, { Error: error, Message: "Query Error" });
    } else {
      sendResponse(req, res, 200, { Error: null, Message: result[0] });
    }
  });
};

module.exports = {
  fetchSuggest,
  fetchRequest,
  acceptRequest,
  sendRequest,
  cancelRequest,
  MostFollowed,
  MostActive,
};
