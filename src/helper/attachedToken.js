const jwt = require('jsonwebtoken');
const CustomError = require('../error/customError');
function attachedToken(payload) {
    let d = {
        accesstoken: generateAccessToken(payload),
    }
    return d
}

function generateAccessToken(payload) {
    return jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, { expiresIn: process.env.ACCESS_TOKEN_EXPIRY });
}

function validateToken(token, secret) {
    try {
        return jwt.verify(token, secret);
    } catch (error) {
        console.error('Invalid token:', error.message);
        throw new CustomError(error?.message == 'invalid signature' ? 'Invalid Token' : error?.message, 403);
    }
}

module.exports = {
    attachedToken, validateToken
}