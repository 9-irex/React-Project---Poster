const express = require("express");
const router = express.Router();
const {
  getChatBoxes,
  sendMesssage,
  getMessages,
  getFriends
} = require("../actions/chat_actions");

router.route("/chat_boxes/:id").get(getChatBoxes);
router.route("/send_message").post(sendMesssage);
router.route("/get_messages/:fromid/:toid/:type").get(getMessages);
router.route("/get_friends/:id").get(getFriends);

module.exports = router;
