const express = require("express");
const {getUser} = require("../controllers/userController");
const protect = require("../middleware/authMiddleware");

const router = express.Router();

// router.get("/profile", protect, getProfile);
// router.put("/profile", protect, updateProfile);
router.get("/search", protect, getUser);

module.exports = router;
