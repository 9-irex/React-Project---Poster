const express = require("express");
const router = express.Router();

const { SendPost, Upload, GetAllPosts } = require("../actions/post_actions");

router.route("/manage_posts").post(SendPost);
router.route("/all_posts").get(GetAllPosts);
router.route("/upload").post(Upload);

module.exports = router;
