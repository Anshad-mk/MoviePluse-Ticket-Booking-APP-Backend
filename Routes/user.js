const { register, login, findShow, Movielist,singleMovie,emailauth,findtheater } = require("../Controllers/userControllers");
const express = require('express');
const router = express.Router();
const userMode = require("../Models/userModel");


// http://localhost:4000/findShow/
router.post("/signup", register);
router.post('/login',login)
router.get('/Movielist',Movielist)
router.get('/Movie/:id',singleMovie)
router.post('/emailauth',emailauth)
router.get('/findtheater/:id',findtheater)
router.get('/findShow/:id',findShow)

module.exports = router;
