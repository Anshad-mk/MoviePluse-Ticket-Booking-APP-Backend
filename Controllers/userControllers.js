const userModel = require("../Models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const MovieModel = require("../Models/MovieModel");
const TheaterOwnerModel = require("../Models/TheaterOwnerModel");
const ShowModel = require("../Models/ShowModel");
const BookingModel = require("../Models/BookingModel.js");


const handleErrors = (err) => {
  let errors = { email: '', password: '' }

  console.log(err)
  if (err.message === 'incorrect email') {
    errors.email = 'That email is not registered'
  }

  if (err.message === 'incorrect password') {
    errors.password = 'That password is incorrect'
  }

  if (err.code === 11000) {
    errors.email = 'Email is already registered'
    return errors
  }

  if (err.message.includes('Users validation failed')) {
    Object.values(err.errors).forEach(({ properties }) => {
      errors[properties.path] = properties.message
    })
  }
  return errors
}

module.exports.register = async (req, res) => {
  try {
    const { email, name, password, phone } = req.body
    const action = { isBlocked: true }
    const user = await userModel.create({
      email,
      name,
      phone,
      password,
      ...action,
    })
    res.json({ user: user._id, created: true })
  } catch (err) {
    console.log(err, 'Error from server,register')
    const errors = handleErrors(err)
    res.json({ errors, created: false })
  }
}

module.exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body
    const user = await userModel.findOne({ email })
    if (user) {
      bcrypt.compare(password, user.password, function (err, result) {
        if (result === true) {
          const token = jwt.sign({ email }, 'SuperSecretKey')
          res.json({ created: true, token })
        } else {
          res.json({ error: 'Invalid email or password' })
          console.log('Passwords do not match.')
        }
      })
    } else {
      res.json({ error: 'Invalid email or password' })
    }
  } catch (error) {
    console.log(error)
    res.send(error)
  }
}
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
