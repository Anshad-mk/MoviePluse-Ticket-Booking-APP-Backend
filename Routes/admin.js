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
  editMovie,
  deleteMovie,
  editUser,
  block
} = require("../Controllers/AdminControlls");

// http://localhost:4000/admin/edit-user

//get

router.get("/allOwners", allOwners);
router.get("/editMovie/:id", editMovie);
router.get("/search/:key", SearchMovie);
router.get("/allMovies", AllMovies);
router.get("/allusers", allUsers);
router.get("/TheaterReview", allTheater);

//post
router.post("/login", adminLogin);
router.post("/add-movies", addMovie);
router.post("/add-users", addUser);
router.post("/add-Theater",Register)


//put 
router.put('/edit-user',editUser)

//patch
router.patch("/accept", theatorAccept);
router.patch("/updateMovie", updateMovie);
router.patch("/blocked",block)

//delete
router.delete("/deleteMovie/:id", deleteMovie);

module.exports = router;
