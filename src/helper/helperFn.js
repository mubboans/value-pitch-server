const moment = require("moment-timezone");
const emailRegex =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

function ValidateEmail(email) {
    if (emailRegex.test(email)) {
        return true;
    } else {
        return false;
    }
}

const getCurrentFormatedDate = () => {

    return moment(new Date())
        .tz(process.env.TIMEZONE)
        .format("YYYY-MM-DD HH:mm:ss")
        .toString();
    // return momentjsDate(new Date()).format('YYYY-MM-DD HH:mm:ss')
};


module.exports = {
    ValidateEmail,
    getCurrentFormatedDate
}