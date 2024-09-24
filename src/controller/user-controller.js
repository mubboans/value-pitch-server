const { db } = require("../dbConfig/dbConfig");
const CustomError = require("../error/customError");
const { fnGet, fnUpdate, fnPost, fnDelete } = require("../helper/commonDbFn");
const { returnResponse } = require("../helper/res-helper");
const TryCatch = require("../helper/tryCatch")

const getUser = TryCatch(async (req, res, next) => {
    let userRecord = await fnGet(db.Users, req.query);
    return returnResponse(res, 200, 'Successfully Get User', userRecord)
}
)

const putUser = TryCatch(async (req, res, next) => {
    await fnUpdate(db.Users, req.body, { id: req.body.id })

    return returnResponse(res, 200, 'Successfully Update User')
}
)


const postUser = TryCatch(async (req, res, next) => {
    await fnPost(db.Users, req.body);
    return returnResponse(res, 201, 'Successfully Added User');
}
)

const deleteUser = TryCatch(async (req, res, next) => {
    if (!req.query.id) {
        throw new CustomError('id required', 400)
    }
    await fnDelete(User, req.query)
    return returnResponse(res, 200, 'Successfully Delete User')
}
)

module.exports = {
    deleteUser, getUser, postUser, putUser
}