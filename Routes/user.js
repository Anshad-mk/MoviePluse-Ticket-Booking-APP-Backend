const { register, login, findShow, Movielist,singleMovie,emailauth,findtheater,seatbooking,verifyNumber } = require("../Controllers/userControllers");
const express = require('express');
const router = express.Router();

const verifyAuth = require('../middlewares/authMiddlewares')


// http://localhost:4000/verifyNumber
router.post("/signup", register);
router.post('/login',login)
router.post('/seatbook',verifyAuth,seatbooking)
router.get('/Movielist',Movielist)
router.get('/Movie/:id',singleMovie)
router.post('/emailauth',emailauth)
router.get('/findtheater/:id',findtheater)
router.get('/findShow/:id',findShow)
router.post('/verifyNumber',verifyNumber)

module.exports = router;
