const adminModel = require("../Models/AdminModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

module.exports.adminLogin = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    console.log(email, password);
    const admin = await adminModel.findOne({ email });
    console.log(admin);
    if (admin) {
      bcrypt.compare(password, admin.password, function (err, result) {
        if (result === true) {
          const token = jwt.sign({ email }, "secret");
          res.json({ token });
          console.log("Passwords match!");
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
