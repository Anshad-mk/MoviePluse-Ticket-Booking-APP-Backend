const mongoose = require("mongoose");
const bcrypt = require('bcrypt')
const userSchema = new mongoose.Schema({
  email:{
     type:String,
     required:true,
     unique:true
  },
  name:{
     type:String,
     required:true,
  },
  phone:{
     type:String,
     required:true
  },
  password:{
     type:String,
     required:true
  },
  isBlocked: {
     type: Boolean,
   },
   verified:{
    type: Boolean,
   }
})


  userSchema.pre('save',async function (next) {
    const salt = await bcrypt.genSalt()
    this.password = await bcrypt.hash(this.password, salt)
  })



module.exports = mongoose.model("user", userSchema);

// const data = await userMode.create({name:'anshad'})
