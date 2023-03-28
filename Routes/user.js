const { register, login ,Movielist,singleMovie } = require("../Controllers/userControllers");
const express = require('express');
const router = express.Router();
const userMode = require("../Models/userModel");


// http://localhost:4000/Movie/:id
router.post("/signup", register);
router.post('/login',login)
router.get('/Movielist',Movielist)
router.get('/Movie/:id',singleMovie)

module.exports = router;
