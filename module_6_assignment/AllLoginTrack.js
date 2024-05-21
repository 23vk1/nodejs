const libExpress = require('express');
const User = require('./utils');

const LoginTrack = (req, res, next)=>{
    if(req.session.token != null){
        
    }
    else{
        next();
    }

}





module.exports = LoginTrack;




