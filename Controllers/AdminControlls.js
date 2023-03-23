const MovieModel = require("../Models/MovieModel");
const TheaterOwnerModel = require("../Models/TheaterOwnerModel");
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
    } = req.body;
    const Movie = {
      moviename: moviename,
      releasedate: Date(releasedate),
      description: description,
      poster1: poster1,
      poster2: poster2,
      poster3: poster3,
      genre: genre,
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
 MovieModel.findOne({})
  } catch (error) {
    console.log(error);
  }
 
};

module.exports.deleteMovie = async (req, res, next) => {};
