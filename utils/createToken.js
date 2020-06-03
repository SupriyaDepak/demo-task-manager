/**
 * use this to create JWT Token
 */
const JWT   = require('jsonwebtoken');
const key = require('../config/envConfig')
// const token = JWT.sign(obj, secret);


const createToken = (user_id, gauth_token) =>{
const payload = {
    user_id: user_id,
    gauth_token: gauth_token,
    date:new Date(),
  };

  return JWT.sign(payload, key);
}

module.exports = createToken;

//console.log(createToken(0,'nasdlijadlkijasdoijasdoijasdoijasd'));