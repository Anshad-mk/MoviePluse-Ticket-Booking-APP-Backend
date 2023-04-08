const express = require('express');
const { Login , Register ,AutherizedCheck ,addscreen ,ViewScreen ,deleteScreen,AddShow ,Screen } = require('../Controllers/TheatorOwnerControllers')
const authMiddleware = require('../middlewares/authMiddlewares')
const router = express.Router()


// http://localhost:4000/theater/addShow
router.post("/login",Login);
router.post("/register",Register);
router.get("/checkAutherized",authMiddleware,AutherizedCheck)
router.post("/add-screen",authMiddleware,addscreen)
router.get("/view-screen",authMiddleware,ViewScreen)
router.delete("/view-screen",authMiddleware,deleteScreen)
router.post("/addShow",authMiddleware,AddShow)
router.get("/screen",authMiddleware,Screen)


module.exports = router;
