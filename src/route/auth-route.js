const express = require("express");
const { getUser, postUser, putUser, deleteUser } = require("../controller/user-controller");
const { getRelation, postRelation, putRelation, deleteRelation } = require("../controller/relation-controller");

const route = express.Router();

route.route('/user').get(getUser).post(postUser).put(putUser).delete(deleteUser)
route.route('/relation').get(getRelation).post(postRelation).put(putRelation).delete(deleteRelation)
module.exports = route