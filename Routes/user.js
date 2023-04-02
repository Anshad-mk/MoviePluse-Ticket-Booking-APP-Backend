const { register, login ,Movielist,singleMovie,emailauth } = require("../Controllers/userControllers");
const express = require('express');
const router = express.Router();
const userMode = require("../Models/userModel");


// http://localhost:4000/Movielist
router.post("/signup", register);
router.post('/login',login)
router.get('/Movielist',Movielist)
router.get('/Movie/:id',singleMovie)
router.post('/emailauth',emailauth)

module.exports = router;
