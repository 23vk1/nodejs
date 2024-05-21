// const libExpress = require('exxpress');
// const {User} = require('./utils');

const GenerateSessionId = (user)=>{
    const sessionId = user.id +"_"+ Date.now();
    return sessionId;
}

module.exports = GenerateSessionId;
