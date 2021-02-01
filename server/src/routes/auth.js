const express = require("express");

const router = express.Router();

const { requireAuth } = require("../middleware/auth");
const authController = require("../controllers/auth");

router.post("/signup", authController.signUpPost);
router.post("/login", authController.loginPost);

module.exports = router;
