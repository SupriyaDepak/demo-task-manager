const { user, session } = require('../models');

const getUser = (user_id) => {
    return user.findOne({
        attributes: ['id', 'user_name', 'user_email'],
        where: {
            id: user_id.toString(),
        },
        raw: true,
    });
};

const getSession = (user_id) => {
    return session.findOne({
        attributes: ['user_id', 'gauth_token'],
        where: {
            user_id: user_id.toString(),
        },
        raw: true,
    });
};


// bring your own validation function
const validate = async function (decoded, request, h) {
    const { user_id, gauth_token, date, iat } = decoded;
    console.log(user_id, gauth_token, date, iat);
    //do your checks to see if the user is valid
    var validUser = false;
    await getSession(user_id).then((res) => {
        if (res) {
            console.log(res);
            //time check here
            validUser = true;
        }
    })
    if (true === validUser){
        return { isValid: true };
    }else {
        return { isValid: false };
    }
};

module.exports=validate;