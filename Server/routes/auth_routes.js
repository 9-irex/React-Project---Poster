const express = require("express");
const router = express.Router();

// Import actions
const { Register, Login, Load } = require("../actions/auth_actions");

// Develop routes
router.route("/register").post(Register);
router.route("/login").post(Login);
router.route("/").get(Load);

module.exports = router;
