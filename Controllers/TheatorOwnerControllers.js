const TheaterOwnerModel = require("../Models/TheaterOwnerModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const handleErrors = (err) => {
  let errors = { email: "", password: "" };

  if (err.code === 11000) {
    errors.email = "Email is already registered";
    return errors;
  }
};

module.exports.Register = async (req, res, next) => {
  try {
    const { email, phone, password } = req.body;
    const autherize = { accepted: false };
    const TheaterOwner = await TheaterOwnerModel.create({
      email,
      phone,
      password,
      ...autherize,
    });
    res.json({ TheaterOwner, created: true });
  } catch (error) {
    const errors = handleErrors(error);
    res.json({ errors, created: false });
  }
};

module.exports.Login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    console.log(email, password);
    const TheatOwner = await TheaterOwnerModel.findOne({ email });
    console.log(TheatOwner);
    if (TheatOwner) {
      bcrypt.compare(password, TheatOwner.password, function (err, result) {
        if (result === true) {
          const token = jwt.sign({ email }, "secret");
          if (TheatOwner.accepted === true) {
            res.json({ token: token, created: true });
            console.log("Password match");
          } else {
            res.json({ token: token, error: "Admin Not accepted" });
          }
        } else {
          res.json({ error: "Invalid email or password" });
          console.log("Passwords do not match.");
        }
      });
    } else {
      res.json({ error: "Invalid email or password" });
    }
  } catch (error) {
    res.status(404).send(error);
  }
};

module.exports.AutherizedCheck = async (req, res, next) => {
  const { email } = req.user;
  try {
    TheaterOwnerModel.findOne({ email: email })
      .then((resp) => {
        res.json({ resp });
      })
      .catch((err) => {
        res.json({ msg: "cannot find user" });
      });
  } catch (error) {
    res.status(404).send(error);
  }
};

module.exports.addscreen = async (req, res, next) => {
  const { email } = req.user;

  const data = {
    name: req.body.moviename,
    seating_capacity: req.body.totalcount,
    row: req.body.rowcount,
    column: req.body.columncount,
    screen_type: req.body.screentype,
  };

  try {
    TheaterOwnerModel.updateOne({ email: email }, { $push: { screens: data } })
      .then((resp) => {
        res.json({created:true})
      })
      .catch((err) => {
        res.json({created:false,err})
      });
  } catch (error) {
    res.status(404).send(error);
  }
};

module.exports.ViewScreen = async (req, res, next) => {
  const { email } = req.user;
  try {
    TheaterOwnerModel.findOne({ email }).then((resp) => {
      res.json(resp);
    });
  } catch (error) {
    res.status(404).send(error);
  }
};

module.exports.deleteScreen = async (req,res,next)=>{
  const {email} = req.user;
  
  
}
