const express = require('express');
const router = express.Router();
const { adminLogin} = require("../Controllers/AdminAuth");
const {theatorAccept , allOwners,addMovie,editMovie,deleteMovie } = require('../Controllers/AdminControlls')



router.post('/login', adminLogin);
router.get('/allOwners',allOwners)
router.patch('/accept',theatorAccept)
router.post('/addMovie',addMovie)
router.get('/editMovie/:id',editMovie)
// router.get('/editMovie/:id',editMovie)
router.delete('/deleteMovie/:id',deleteMovie)




module.exports = router;