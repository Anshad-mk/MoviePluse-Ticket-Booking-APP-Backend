const userModel = require('../Models/userModel')
const bcrypt =require('bcrypt')

module.exports.register = async (req,res)=>{
try {
    const {email,phone,password} = req.body;
     const user = await userModel.create({email,phone,password})
    
} catch (error) {
    console.log(error)
}

}

module.exports.login =async (req,res,next)=>{
    try {
        const {email,password} = req.body
        console.log(email,password)
         const user = await userModel.findOne({email})
         console.log(user)
         if(user){
            bcrypt.compare(password, user.password, function(err, result) {
                if (result === true) {
                  console.log('Passwords match!');
                } else {
                  console.log('Passwords do not match.');
                }
              });
         }
    } catch (error) {
        
    }
}