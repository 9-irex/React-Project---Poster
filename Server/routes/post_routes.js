const express = require("express");
const router = express.Router();

const {
  SendPost,
  Upload,
  GetAllPosts,
  Like,
  Share,
  Unlike,
} = require("../actions/post_actions");

router.route("/manage_posts").post(SendPost);
router.route("/all_posts").get(GetAllPosts);
router.route("/upload").post(Upload);
router.route("/like").post(Like);
router.route("/unlike").post(Unlike);
router.route("/share").post(Share);

module.exports = router;
