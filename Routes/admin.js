const express = require("express");
const router = express.Router();
const { adminLogin } = require("../Controllers/AdminAuth");
const {Register} = require("../Controllers/TheatorOwnerControllers")


const {
  theatorAccept,
  SearchMovie,
  allTheater,
  allUsers,
  addUser,
  updateMovie,
  AllMovies,
  allOwners,
  addMovie,
  deleteMovie,
  editUser,
  block,
  editMovie,
  blockMovie
} = require("../Controllers/AdminControlls");
const authMiddleware = require("../middlewares/authMiddlewares");

// http://localhost:4000/admin/edit-movie

//get

router.get("/allOwners",authMiddleware, allOwners);
router.get("/search/:key",authMiddleware, SearchMovie);
router.get("/allMovies",authMiddleware, AllMovies);
router.get("/allusers",authMiddleware, allUsers);
router.get("/TheaterReview",authMiddleware, allTheater);
router.get("/movieBlock",authMiddleware,blockMovie)

//post
router.post("/login",authMiddleware, adminLogin);
router.post("/add-movies",authMiddleware, addMovie);
router.post("/add-users",authMiddleware, addUser);
router.post("/add-Theater",authMiddleware,Register)


//put 
router.put('/edit-user',authMiddleware, editUser)
router.put('/edit-movie',authMiddleware, editMovie)

//patch
router.patch("/accept",authMiddleware, theatorAccept);
router.patch("/updateMovie",authMiddleware, updateMovie);
router.patch("/blocked",authMiddleware, block)

//delete
router.delete("/deleteMovie/:id",authMiddleware, deleteMovie);

module.exports = router;
