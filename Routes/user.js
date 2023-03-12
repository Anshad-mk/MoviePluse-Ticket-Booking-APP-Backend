const { register, login } = require("../Controllers/AuthControllers");
const express = require('express');
const router = express.Router();
const userMode = require("../Models/userModel");

router.post("/signup", register);
router.post('/login',login)

module.exports = router;
