const libExpress = require('express');
const Mongoose = require('mongoose');


Mongoose.connect(process.env.MONGO_URL)
.then(()=>console.log("Mongo DB Connected"))
.catch((e)=>console.log(e));



const userSchema = new Mongoose.Schema({
    username:String,
    email:String,
    password:String
});

const sessionSchema = new Mongoose.Schema({
    email:String,
    sessionId:String
})


const User = Mongoose.model('User',userSchema);
const SessionSch = Mongoose.model('Session',sessionSchema);



module.exports = {User, SessionSch}