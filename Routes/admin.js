const express = require('express');
const router = express.Router();
const { adminLogin} = require("../Controllers/AdminAuth");
const {theatorAccept,SearchMovie,updateMovie,allOwners,addMovie,editMovie,deleteMovie } = require('../Controllers/AdminControlls')


// http://localhost:4000/admin/

//get
router.get('/allOwners',allOwners)
router.get('/editMovie/:id',editMovie)
router.get('/search/:key',SearchMovie)

//post 
router.post('/login', adminLogin);
router.post('/addMovie',addMovie)


//patch
router.patch('/accept',theatorAccept)
router.patch('/updateMovie',updateMovie)

//delete
router.delete('/deleteMovie/:id',deleteMovie)





module.exports = router;