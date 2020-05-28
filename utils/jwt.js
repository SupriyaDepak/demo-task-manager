const jwt = require('jsonwebtoken');
const logger = require('./logger');
const secretKey = 'sdeddevew3dmkm';


const jwtSign = (payload) => {
  return jwt.sign(payload, secretKey, { expiresIn: 60 * 40 });
};


const jwtVerify = (payload) => {
  return jwt.verify(payload, secretKey);
};


module.exports = { jwtSign, jwtVerify };
