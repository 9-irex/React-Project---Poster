const express = require("express");
const router = express.Router();

const { SendPost, Upload, GetPosts } = require("../actions/post_actions");

router.route("/posts").post(SendPost).get(GetPosts);
router.route("/upload").post(Upload);

module.exports = router;
