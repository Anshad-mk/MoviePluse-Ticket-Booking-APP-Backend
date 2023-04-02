const mongoose = require("mongoose");
const bcrypt = require('bcrypt')
const userSchema = new mongoose.Schema({
  email: {
    type: String,
    require: [true, " Email is require"],
    unique: true,
    
  },
  password: {
    type: String,
    require: [true, " Email is require"],
  },
  phone: {
    type: String,
    require: [true, " Phone is require"],
  },
  isBlocked: {
    type: Boolean,
    require: true,
  }
  

});

  userSchema.pre('save',async function (next) {
    const salt = await bcrypt.genSalt()
    this.password = await bcrypt.hash(this.password, salt)
  })



module.exports = mongoose.model("user", userSchema);

// const data = await userMode.create({name:'anshad'})
