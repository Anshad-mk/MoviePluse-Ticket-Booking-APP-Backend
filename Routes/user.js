const {
  register,
  login,
  findShow,
  order,
  confirmPayment,
  Movielist,
  singleMovie,
  emailauth,
  findtheater,
  seatbooking,
  verifyNumber,
  searchMovie,
  seatusage,
  newrelease,
  categorymovie  
} = require("../Controllers/userControllers");
const express = require("express");
const router = express.Router();
const verifyAuth = require("../middlewares/authMiddlewares");

// http://localhost:4000/seatusage

// get
router.get("/Movielist", Movielist);
router.get("/Movie/:id", singleMovie);
router.get("/findtheater/:id", findtheater);
router.get("/findShow/:id", findShow);
router.get("/search", searchMovie);
router.get('/new-release', newrelease)
router.get('/categorymovie/:category',categorymovie)

//post
router.post("/signup", register);
router.post("/login", login);
router.post("/seatbook", verifyAuth, seatbooking);
router.post("/emailauth", emailauth);
router.post("/verifyNumber", verifyNumber);
router.post("/seatusage", seatusage);
router.post("/order", verifyAuth, order);
router.post("/confirmPayment", verifyAuth, confirmPayment);

module.exports = router;
