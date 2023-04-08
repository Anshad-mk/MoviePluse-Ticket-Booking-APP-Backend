const mongoose = require("mongoose");
const bcrypt = require("bcrypt");



const screenSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  seating_capacity: {
    type: Number,
    required: true,
  },
  row: {
    type: Number,
    required: true,
  },
  column: {
    type: Number,
    required: true,
  },
  screen_type: {
    type: String,
    required: true,
  }
});


const theaterOwnerSchema = new mongoose.Schema({
  email: {
    type: String,
    require: [true, " Email is require"],
    unique: true,
  },
  name: {
    type: String,
    require: [true, " Name is require"],
  },
  place: {
    type: String,
    require: [true, " Place is require"],
  },
  password: {
    type: String,
    require: [true, " Password is require"],
  },
  phone: {
    type: String,
    require: [true, " Phone is require"],
  },
  accepted: {
    type: Boolean,
  },
  screens: [screenSchema],
});

theaterOwnerSchema.pre("save", async function (next) {
  const salt = await bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password, salt);
});

module.exports = mongoose.model("theaters", theaterOwnerSchema);

