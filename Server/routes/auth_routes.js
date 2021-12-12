const express = require("express");
const router = express.Router();

// Import actions
const {
  Register,
  Login,
  isLogged,
  LogoutUser,
  MostFollowed
} = require("../actions/auth_actions");

// Develop routes
router.route("/register").post(Register);
router.route("/login").post(Login).get(isLogged);
router.route("/logout").get(LogoutUser);
module.exports = router;
