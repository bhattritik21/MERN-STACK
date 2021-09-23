const Register = require("../models/register");
const jwt = require("jsonwebtoken");

const auth = async(req,res,next)=>{
    try{
   const token = req.cookies.jwt;
   const verifyUser = jwt.verify(token,"Leonidas00756");
//    console.log(verifyUser);

   const user = await Register.findOne({_id:verifyUser._id});
//    console.log(user);

  req.user=user;
  req.token=token;

   next();
    }
    catch(e){
        res.send(e);

    }
}

module.exports = auth;