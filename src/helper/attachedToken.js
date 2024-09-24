const jwt = require('jsonwebtoken');
function attachedToken(payload) {
    let d = {
        accesstoken: generateAccessToken(payload),
    }
    return d
}

function generateAccessToken(payload) {
    return jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, { expiresIn: process.env.ACCESS_TOKEN_EXPIRY });
}
module.exports = {
    attachedToken,
}