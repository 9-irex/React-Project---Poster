const express = require("express");
const router = express.Router();

const {
  sendRequest,
  acceptRequest,
  fetchRequest,
  fetchSuggest,
  cancelRequest,
  MostFollowed,
  MostActive
} = require("../actions/request_actions");

router.route("/suggest/:id").get(fetchSuggest);
router.route("/request/:id/:type").get(fetchRequest);
router.route("/send_request").post(sendRequest);
router.route("/accept_request").post(acceptRequest);
router.route("/cancel_request").post(cancelRequest);
router.route("/followed").get(MostFollowed);
router.route("/active").get(MostActive);

module.exports = router;
