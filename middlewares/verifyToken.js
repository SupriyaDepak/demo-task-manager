const logger = require('../utils/logger');
const jwt = require('../utils/jwt');
const {
  ENTERING_TO, MIDDLEWARE, METHOD, SUCCESS_MESSAGE, ERROR_MESSAGE,
} = require('../constants/constantLogger');
const {
  STATUS_CODE, TOKEN_EXIPRED_ERROR,
} = require('../constants/constant');


const verifyToken = async (req, res, next) => {
  logger.info(`${ENTERING_TO} ${MIDDLEWARE} ${METHOD.VERIFY_TOKEN}`);
  try {
    const { authorization } = req.headers;
    if (authorization && authorization.startsWith('Bearer') && authorization.split(' ')[1]) {
      const response = await jwt.jwtVerify(authorization.split(' ')[1]);
      logger.info(SUCCESS_MESSAGE.VERIFY_TOKEN);
      req.body.leadId = req.headers.authorization;
      req.body.lead_id = response.lead_id;
      //console.log(req.body);
      next();
    } else {
      res.status(STATUS_CODE.FORBIDDEN);
      res.send();
    }
  } catch (error) {
    logger.error(ERROR_MESSAGE.VERIFY_TOKEN);
    if (error.name === TOKEN_EXIPRED_ERROR) {
      res.status(STATUS_CODE.JWT_TOKEN_EXPIRED);
      res.send(JSON.stringify({status:'error', message:'Token Expired'}));
    } else {
      res.status(STATUS_CODE.FORBIDDEN);
      res.send(JSON.stringify({status:'error', message:'Forbidden'}));
    }
  }
};


module.exports = { verifyToken };
