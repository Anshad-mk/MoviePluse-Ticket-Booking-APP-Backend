const express = require('express');
const { Login ,movietime,getShows, Register,ScreennedMovies,reservationManagement  ,AutherizedCheck ,addscreen ,ViewScreen ,deleteScreen,AddShow ,Screen,reservations } = require('../Controllers/TheatorOwnerControllers')
const authMiddleware = require('../middlewares/authMiddlewares')
const router = express.Router()


// http://localhost:4000/theater/show-Screened-Movies


// get
router.get("/checkAutherized",authMiddleware,AutherizedCheck)
router.get("/view-screen",authMiddleware,ViewScreen)
router.get("/screen",authMiddleware,Screen)
router.get("/show-Screened-Movies",authMiddleware,ScreennedMovies)
router.get("/reservations",authMiddleware,reservations)
router.get("/ReservationMngmnt",authMiddleware,reservationManagement)
router.get("/getShows",authMiddleware,getShows)
router.get("/movie-time/:id",authMiddleware,movietime)


//delete
router.delete("/view-screen",authMiddleware,deleteScreen)

// post
router.post("/addShow",authMiddleware,AddShow)
router.post("/add-screen",authMiddleware,addscreen)
router.post("/login",Login);
router.post("/register",Register);

module.exports = router;
