const MovieModel = require("../Models/MovieModel");
const TheaterOwnerModel = require("../Models/TheaterOwnerModel");
// const ObjectId =require('mongoose')
module.exports.theatorAccept = async (req, res, next) => {
  try {
    const { email } = await req.body;
    TheaterOwnerModel.updateOne({ email: email }, { accepted: true })
      .then((resp) => {
        res.status(200).send({ msg: "user accepted" });
      })
      .catch((err) => {
        res.status(404).send(err);
      });
  } catch (error) {
    res.status(404).send(error);
  }
};

module.exports.allOwners = async (req, res, next) => {
  try {
    TheaterOwnerModel.find({}, { password: 0 }).then((response) => {
      res.status(200).json(response);
    });
  } catch (error) {
    res.status(404).send(error);
  }
};

module.exports.addMovie = async (req, res, next) => {
  // { "moviename":"name", "releasedate":"date",
  // "description":"dis", "poster1":"pos1",
  // "poster2":"pos1", "poster3":"pos1",
  //     "trailerlink":"link"
  //   }

  try {
    const {
      moviename,
      releasedate,
      description,
      poster1,
      poster2,
      poster3,
      trailerlink,
      genre,
      language,
      rating,
    } = req.body;
    const Movie = {
      moviename: moviename,
      releasedate:new Date(releasedate),
      description: description,
      poster1: poster1,
      poster2: poster2,
      poster3: poster3,
      genre: genre,
      rating:rating,
      language: language,
      trailerlink: trailerlink,
    };

    MovieModel.create(Movie).then((resp) => {
      res.status(200).send({ msg: "Movie Added successfully" });
    });
  } catch (error) {
    res.status(404).send(error);
  }
};

module.exports.editMovie = async (req, res, next) => {
  try {
    const id = req.params.id;
 MovieModel.findOne({_id:id}).then((resp)=>{
  res.status(200).send(resp)
 }).catch((err)=>{
  res.status(402).send(err)
 })
  } catch (error) {
    console.log(error);
  }
 
};

module.exports.updateMovie = async (req,res,next)=>{
  try {
    const {
      _id,
      moviename,
      releasedate,
      description,
      poster1,
      poster2,
      poster3,
      trailerlink,
      genre,
      rating,
      language,
    } = req.body;
    
    
     MovieModel.updateOne({_id:_id},{$set:{
      moviename: moviename,
      releasedate: new Date(releasedate),
      description: description,
      poster1: poster1,
      poster2: poster2,
      poster3: poster3,
      genre: genre,
      rating:rating,
      language: language,
      trailerlink: trailerlink,
    }}).then((resp)=>{
      res.status(200).send({msg:"Movie updated succefully", resp })
    })
  } catch (error) {
    res.status(404).send(error)
  }
}

module.exports.deleteMovie = async (req, res, next) => {
  try {
    const id = req.params.id;
 MovieModel.deleteOne({_id:id}).then((resp)=>{
  res.status(200).send(resp)
 }).catch((err)=>{
  res.status(402).send(err)
 })
  } catch (error) {
    console.log(error);
  }

};

module.exports.SearchMovie = async(req,res,next)=>{
  const searchkey = req.params.key
  try {
MovieModel.find()
  } catch (error) {
    res.status(402).send(error)
  }

}
