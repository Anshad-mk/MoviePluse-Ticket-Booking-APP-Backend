const userModel = require("../Models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const MovieModel = require("../Models/MovieModel");
const TheaterOwnerModel = require("../Models/TheaterOwnerModel");
const ShowModel = require("../Models/ShowModel");
const BookingModel = require("../Models/BookingModel.js");

module.exports.register = async (req, res) => {
  try {
    const { email, phone, password } = req.body;
    const user = await userModel.create({
      email,
      phone,
      password,
      isBlocked: false,
    });
    res.status(200).send({ user });
  } catch (error) {
    console.log(error);
  }
};

module.exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    console.log(email, password);
    const user = await userModel.findOne({ email });
    console.log(user);
    if (user) {
      bcrypt.compare(password, user.password, function (err, result) {
        if (result === true) {
          if (user.isBlocked) {
            res.status(401).json({ error: "user Blocked Contact admin" });
          } else {
            const token = jwt.sign({ email }, "secret");
            res.json({ token });
            console.log("Passwords match!");
          }
          //   res.status(200).send({msg:"user logged in"})
        } else {
          res.status(401).json({ error: "Invalid email or password" });
          console.log("Passwords do not match.");
        }
      });
    } else {
      res.status(401).json({ error: "Invalid email or password" });
    }
  } catch (error) {}
};

module.exports.Movielist = async (req, res, next) => {
  try {
    MovieModel.find({}).then((resp) => {
      res.json(resp);
    });
  } catch (error) {
    res.status(404).send(error);
  }
};
module.exports.singleMovie = async (req, res, next) => {
  // console.log()
  try {
    MovieModel.findOne({ _id: req.params.id }).then((resp) => {
      res.json(resp);
    });
  } catch (error) {}
};

module.exports.emailauth = async (req, res, next) => {
  try {
    console.log(req.body);
  } catch (error) {
    console.log(error);
  }
};

module.exports.findtheater = async (req, res, next) => {
  const MovieId = req.params.id;
  try {
    TheaterOwnerModel.find({ "screens.shows.MovieID": MovieId }).then(
      (resp) => {
        console.log(resp);
        res.json(resp);
      }
    );
  } catch (error) {}
};

module.exports.findShow = async (req, res, next) => {
  const id = req.params.id;
  try {
    ShowModel.find({ "Movie._id": id }).then((resp) => {
      res.status(200).send(resp);
    });
  } catch (error) {
    res.status(404).send(error);
  }
};

module.exports.seatbooking = async (req, res, next) => {
  const { email } = req.user;

  try {
    BookingModel.create({
      user: {
        email: email,
      },
      show: {
        date: req.body.show.date,
        time: req.body.show.time,
        SeatNumber: req.body.show.SeatNumber,
        price: req.body.show.price,
        TotelPrice: req.body.show.TotelPrice,
      },
      movie: req.body.movie,
      theater: req.body.theater,
    })
      .then((resp) => {
        console.log(resp);
        res.status(200).send(resp);
      })
      .catch((err) => {
        console.log(err);
      });
  } catch (error) {
    console.log(error);
    res.status(404).send(error);
  }
};
