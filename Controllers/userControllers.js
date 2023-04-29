const userModel = require("../Models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const MovieModel = require("../Models/MovieModel");
const TheaterOwnerModel = require("../Models/TheaterOwnerModel");
const ShowModel = require("../Models/ShowModel");
const BookingModel = require("../Models/BookingModel.js");
const { createOrder } = require("../Config.js/Razorpay");

const handleErrors = (err) => {
  let errors = { email: "", password: "" };

  if (err.message === "incorrect email") {
    errors.email = "That email is not registered";
  }

  if (err.message === "incorrect password") {
    errors.password = "That password is incorrect";
  }

  if (err.code === 11000) {
    errors.email = "Email is already registered";
    return errors;
  }

  if (err.message.includes("Users validation failed")) {
    Object.values(err.errors).forEach(({ properties }) => {
      errors[properties.path] = properties.message;
    });
  }
  return errors;
};

module.exports.register = async (req, res) => {
  try {
    const { email, name, password, phone } = req.body;
    const action = { isBlocked: true };
    const user = await userModel.create({
      email,
      name,
      phone,
      password,
      verified: false,
      ...action,
    });
    res.json({ user: user._id, created: true });
  } catch (err) {
    // console.log(err, 'Error from server,register')
    const errors = handleErrors(err);
    res.json({ errors, created: false });
  }
};

module.exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await userModel.findOne({ email });
    if (user) {
      bcrypt.compare(password, user.password, function (err, result) {
        if (result === true) {
          if (user.isBlocked) {
            res.status(401).json({ error: "user Blocked Contact admin" });
          } else if (!user.verified) {
            res.status(401).json({ error: "user Not verified" });
          } else {
            const token = jwt.sign({ email }, "secret");
            res.json({ created: true, token });
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
  } catch (error) {
    console.log(error);
    res.send(error);
  }
};
module.exports.Movielist = async (req, res, next) => {
  try {
    MovieModel.find({}).then((resp) => {
      res.status(200).json(resp);
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
    // console.log(req.body);
  } catch (error) {
    console.log(error);
  }
};

module.exports.findtheater = async (req, res, next) => {
  const MovieId = req.params.id;
  try {
    TheaterOwnerModel.find({ "screens.shows.MovieID": MovieId }).then(
      (resp) => {
        // console.log(resp);
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
      BookingDate: req.body.BookingDate.split("T")[0],
      CompletPayment:false,
      user: {
        email: email,
      },
      show: {
        date: req.body.show.date.split("T")[0],
        time: req.body.show.time,
        SeatNumber: req.body.show.SeatNumber,
        price: req.body.show.price,
        TotelPrice: req.body.show.TotelPrice,
      },
      movie: req.body.movie,
      theater: req.body.theater,
    })
      .then((resp) => {
        // console.log(resp);
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

module.exports.verifyNumber = async (req, res, next) => {
  let number = req.body.number.split("+91")[1];
  // console.log(number)
  userModel
    .updateOne({ phone: number }, { $set: { verified: req.body.verified } })
    .then((resp) => {
      // console.log(resp)

      if (resp.matchedCount > 0) {
        res.status(200).send({ verified: true, resp });
      } else if (resp.modifiedCount == 0 || resp.matchedCount == 0) {
        res.status(200).send({ err: "Not Verified", resp });
      }
    })
    .catch((err) => {
      res.status(200).send(err);
    });
};

module.exports.searchMovie = async (req, res, next) => {
  let key = req.query.key.toLowerCase(); // convert the search query to lowercase
  const limit = req.query.limit;
  try {
    const resp = await MovieModel.find({
      moviename: { $regex: new RegExp(key, "i") },
    }).limit(Number(limit));
    res.status(200).send(resp);
    // console.log(resp);
  } catch (error) {
    console.error(error);
    res.status(500).send("An error occurred while processing the request");
  }
};

module.exports.seatusage = async (req, res, next) => {
  try {
    const date = req.body.date.split("T")[0];
    let screenseats = await ShowModel.findOne(
      { "theater.screen._id": req.body.screen_id },
      { "theater.screen": true }
    );
    BookingModel.find(
      {
        "show.date": new Date(date),
        "show.time": req.body.time,
        "theater.screen._id": req.body.screen_id,
      },
      { show: true, theater: true }
    ).then((resp) => {
      let seats = [];
      resp.map((value) => {
        seats.push(...value.show.SeatNumber);
      });
      res.status(200).send({ seats, screenseats });
    });
  } catch (error) {
    res.status(404).send(error);
  }
};

module.exports.order = async (req, res, next) => {
  const { email } = req.user;
  const { amount } = req.body;
  const order = await createOrder(amount);
  order.userEmail = email;
  order.userName = email.split("@")[0];
  res.send(order);
};
module.exports.confirmPayment = async (req,res,next)=>{
  const {email} = req.user;
  console.log(req.body.bookingid)
  const details = await BookingModel.find({ 'user.email': email })
  BookingModel.updateOne({_id:req.body.bookingid},{CompletPayment:true}).then((response)=>{
    res.status(200).send({response,details})
    console.log(response)
  })
}

module.exports.newrelease = async (req, res, next) => {
  try {
    MovieModel
      .find().sort({"releasedate": -1}).limit(8)
      .then((resp) => {
        res.json(resp)
      })
      .catch((err) => {
        res.json(err)
      })
  } catch (error) {
    res.status(404).send(error)
  }
}

module.exports.categorymovie = async (req, res, next) => {
  try {
    var category = req.params.category
    console.log(category);
    MovieModel.find({ genre: category }).then((resp) => {
      console.log(resp);
      res.json(resp);
    });
  } catch (error) {}
};

module.exports.viewbooking = async (req, res, next) => {
  const { email } = req.user
  const user = await userModel.find({ email: email })
  BookingModel.find({ 'user.email': email }).then((show) => {
    res.status(200).send({ show, user })
  })
}