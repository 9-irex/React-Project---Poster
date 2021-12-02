const sendResponse = (req, res, code, message) => {
  res.status(code).send(message);
};

module.exports = sendResponse;
