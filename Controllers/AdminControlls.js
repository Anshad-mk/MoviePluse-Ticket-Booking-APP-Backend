const MovieModel = require("../Models/MovieModel");
const TheaterOwnerModel = require("../Models/TheaterOwnerModel");
const userModel = require("../Models/userModel");
// const ObjectId =require('mongoose')

const handleErrors = (err) => {
  let errors = { email: "", password: "" };

  if (err.code === 11000) {
    errors.email = "Email is already registered";
    return errors;
  }
};

module.exports.theatorAccept = async (req, res, next) => {
  try {
    const { email, status } = await req.body;

    TheaterOwnerModel.updateOne({ email: email }, { accepted: status })
      .then((resp) => {
        if (status) {
          res.status(200).send({ msg: "user accepted" });
        } else {
          res.status(200).send({ msg: "user Rejected" });
        }
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
  console.log(req.body);
  try {
    const {
      moviename,
      releasedate,
      description,
      posterUrl1,
      posterUrl2,
      posterUrl3,
      trailerlink,
      genre,
      language,
    } = req.body;

    const Movie = {
      moviename: moviename,
      releasedate: Date(releasedate),
      description: description,
      poster1: posterUrl1,
      poster2: posterUrl2,
      poster3: posterUrl3,
      genre: genre,
      language: language,
      trailerlink: trailerlink,
    };

    MovieModel.create(Movie).then((resp) => {
      res.send({ msg: "Movie Added successfully" });
    });
  } catch (error) {
    res.status(404).send(error);
  }
};

module.exports.updateMovie = async (req, res, next) => {
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

    MovieModel.updateOne(
      { _id: _id },
      {
        $set: {
          moviename: moviename,
          releasedate: new Date(releasedate),
          description: description,
          poster1: poster1,
          poster2: poster2,
          poster3: poster3,
          genre: genre,
          rating: rating,
          language: language,
          trailerlink: trailerlink,
        },
      }
    ).then((resp) => {
      res.status(200).send({ msg: "Movie updated succefully", resp });
    });
  } catch (error) {
    res.status(404).send(error);
  }
};

module.exports.deleteMovie = async (req, res, next) => {
  try {
    const id = req.params.id;
    MovieModel.deleteOne({ _id: id })
      .then((resp) => {
        res.status(200).send(resp);
      })
      .catch((err) => {
        res.status(402).send(err);
      });
  } catch (error) {
    console.log(error);
  }
};

module.exports.SearchMovie = async (req, res, next) => {
  const searchkey = req.params.key;
  try {
    MovieModel.find();
  } catch (error) {
    res.status(402).send(error);
  }
};

module.exports.AllMovies = async (req, res, next) => {
  try {
    MovieModel.find({}).then((response) => {
      res.status(200).send(response);
    });
  } catch (error) {}
};

module.exports.addUser = async (req, res, next) => {
  console.log(req.body);
  try {
    const { email, phone, password } = req.body;
    const user = await userModel.create({ email, phone, password });
    res.send({ created: true });
  } catch (error) {
    const errors = handleErrors(error);
    res.json({ errors, created: false });
    console.log(error);
  }
};

module.exports.allUsers = async (req, res, next) => {
  try {
    userModel.find({}, { password: 0 }).then((resp) => {
      res.status(200).send(resp);
    });
  } catch (error) {
    res.status(404).send(error);
  }
};

module.exports.allTheater = async (req, res, next) => {
  try {
    TheaterOwnerModel.find({}, { password: 0 }).then((resp) => {
      res.status(200).send(resp);
    });
  } catch (error) {
    res.status(404).send(error);
  }
};

module.exports.editUser = async (req, res, next) => {
  console.log(req.body);
  const { _id, phone, email } = req.body;
  try {
    userModel
      .updateOne({ _id: _id }, { phone: phone, email: email })
      .then((resp) => {
        res.status(200).send({ msg: `user updated ${email}` });
      });
  } catch (error) {
    res.status(404).send(error);
  }
};

module.exports.block = async (req, res, next) => {
  // const id = req.params.id;
  console.log(req.body);
  try {
    userModel
      .updateOne({ _id: req.body.userid }, { isBlocked: req.body.status })
      .then((resp) => {
        console.log(resp);
        res.status(200).send({ msg: `user Blocked`, status: req.body.status });
      })
      .catch((err) => {
        res.status(404).send(err);
      });
  } catch (error) {
    res.status(404).send(error);
  }
};

module.exports.editMovie = async (req,res,next)=>{
  console.log(req.body)
  const {
    moviename,
    releasedate,
    description,
    posterUrl1,
    posterUrl2,
    posterUrl3,
    trailerlink,
    genre,
    language,
  } = req.body;

  const Movie = {
    moviename: moviename,
    releasedate: releasedate,
    description: description,
    poster1: posterUrl1,
    poster2: posterUrl2,
    poster3: posterUrl3,
    genre: genre,
    language: language,
    trailerlink: trailerlink,
  };
  
  try {
    MovieModel.updateOne({_id:req.body._id},{...Movie}).then((resp)=>{
      res.json(resp)
    }).catch((err)=>{
      res.json(err)
    })
  } catch (error) {
    res.status(404).send(error)
  }
}