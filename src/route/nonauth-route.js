const express = require("express");
const { Login, Register } = require("../controller/auth-controller");
const route = express.Router();
route.post('/auth/login', Login);
route.post('/auth/register', Register);
module.exports = route