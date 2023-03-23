const TheaterOwnerModel = require("../Models/TheaterOwnerModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

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
    res.status(200).send({ TheaterOwner });
  } catch (error) {
    console.log(error);
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
          if (TheatOwner.accepted === true) {
            console.log(result);
            const token = jwt.sign({ email }, "secret");
            res.json({ token });
            console.log("Passwords match!");
          } else {
            res.status(401).json({ error: "Admin Not accepted" });
          }
        }    else {
          res.status(401).json({ error: "Invalid email or password" });
          console.log("Passwords do not match.");
        }
      });
    } else {
      res.status(401).json({ error: "Invalid email or password" });
    }
  } catch (error) {
    res.status(404).send(error);
  }
};
