const express = require("express");
const { getUser, postUser, putUser, deleteUser } = require("../controller/user-controller");
const route = express.Router();

route.route('/user').get(getUser).post(postUser).put(putUser).delete(deleteUser)

module.exports = route