const express = require('express');
const { Login , Register,ScreennedMovies  ,AutherizedCheck ,addscreen ,ViewScreen ,deleteScreen,AddShow ,Screen,reservations } = require('../Controllers/TheatorOwnerControllers')
const authMiddleware = require('../middlewares/authMiddlewares')
const router = express.Router()


// http://localhost:4000/theater/show-Screened-Movies
router.post("/login",Login);
router.post("/register",Register);
router.get("/checkAutherized",authMiddleware,AutherizedCheck)
router.post("/add-screen",authMiddleware,addscreen)
router.get("/view-screen",authMiddleware,ViewScreen)
router.delete("/view-screen",authMiddleware,deleteScreen)
router.post("/addShow",authMiddleware,AddShow)
router.get("/screen",authMiddleware,Screen)
router.get("/show-Screened-Movies",authMiddleware,ScreennedMovies)
router.get("/reservations",authMiddleware,reservations)


module.exports = router;
