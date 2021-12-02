const express = require("express");
const router = express.Router();

// Import actions
const {
  Register,
  Login,
  LoginView,
  LogoutUser,
} = require("../actions/auth_actions");

// Develop routes
router.route("/register").post(Register);
router.route("/login").post(Login).get(LoginView);
router.route("/logout").get(LogoutUser);
module.exports = router;
