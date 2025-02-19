const express = require("express");
const { registerUser, loginUser } = require("../controllers/authController");
const validateUser = require("../middleware/ValidateUser");
const validateRequest = require("../middleware/validateRequest");

const router = express.Router();

router.post("/register", validateUser, validateRequest, registerUser);
router.post("/login", loginUser);

module.exports = router;