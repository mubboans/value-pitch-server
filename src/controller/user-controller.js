const { Op } = require("sequelize");
const { db } = require("../dbConfig/dbConfig");
const CustomError = require("../error/customError");
const { fnGet, fnUpdate, fnPost, fnDelete } = require("../helper/commonDbFn");
const { returnResponse } = require("../helper/res-helper");
const TryCatch = require("../helper/tryCatch");
const { emitUserUpdate } = require("./socket-helper");
const bcrypt = require('bcryptjs');

const getUser = TryCatch(async (req, res, next) => {
    if (req.user.role == 'admin') {
        req.query = {
            ...req.query,
        }
    }
    else if (req.user.role == 'client') {
        req.query = {
            ...req.query,
            [Op.or]: [
                { role: 'user' },
                { role: 'client' }
            ]
        }
    }
    let userRecord = await fnGet(db.Users, req.query);
    return returnResponse(res, 200, 'Successfully Get User', userRecord)
}
)

const putUser = TryCatch(async (req, res, next) => {

    await emitUserUpdate(req.body.email, req.user);
    await fnUpdate(db.Users, req.body, { id: req.body.id })
    return returnResponse(res, 200, 'Successfully Update User')
}
)


const postUser = TryCatch(async (req, res, next) => {
    console.log('====================================');
    console.log(req.user, 'check User');
    console.log('====================================');
    setUserrolenType(req.user, next, req.body);
    req.body = {
        ...req.body,
        ...(req.user.role == 'client' ? { role: 'user' } : { role: req.body.role }),
        ...(req.user.role == 'client' ? { type: 'user' } : { type: req.body.type })
    }
    let userCheck = await fnGet(db.Users, {
        [Op.or]: [
            { contact: req.body.contact },
            { email: req.body.email }
        ]
    });
    if (userCheck && userCheck.length > 0) {
        return next(new CustomError('User Already Exits', 409))
    }
    req.body.isActive = true
    req.body.password = bcrypt.hashSync(req.body.password + req.body.email, 10)
    let user = await fnPost(db.Users, req.body);
    await createUserRelation(req.user, { ...req.body, userid: user.id }, next)
    return returnResponse(res, 201, 'Successfully Added User');
}
)

const deleteUser = TryCatch(async (req, res, next) => {
    if (!req.query.id) {
        throw new CustomError('id required', 400)
    }
    await fnDelete(db.Users, req.query)
    return returnResponse(res, 200, 'Successfully Delete User')
}
)
async function setUserrolenType(user, next, body) {

    if (user.role == 'admin') {
        if (!body.role || !body.type) {
            return next(new CustomError('role and type require for admin to create user', 400))
        }
    }
    else if (user.role == 'client') {

        if (!body.firstname || !body.lastname || !body.email || !body.contact || !body.otherdetail) {
            return next(new CustomError('Invalid Data to create user', 400))
        }
    }
    else {
        return next(new CustomError('User not allow to add user', 401))
    }
}
async function createUserRelation(user, body, next) {
    try {
        let reqbody = { ...body }
        if (user.role == 'admin') {
            if (body.type == 'user' && body.role == 'client') {
                reqbody = {
                    ...reqbody,
                    adminid: user.id,
                    relationtype: '00',
                    clientid: reqbody.userid
                }
                delete reqbody.userid;
            }
            else if (body.type == 'user' && body.role == 'user') {
                reqbody = {
                    ...reqbody,
                    adminid: user.id,
                    relationtype: '01'
                }
            }
        }
        else if (user.role == 'client') {
            if (body.role == 'client') {
                reqbody = {
                    ...reqbody,
                    clientid: user.id,
                    relationtype: '02'
                }
            } else {
                reqbody = {
                    ...reqbody,
                    clientid: user.id,
                    relationtype: '03'
                }
            }
            // if (!body.role == 'user' || !body.type == 'user') return next(new CustomError('Client can only add user', 400))

        }
        await fnPost(db.Relation, reqbody);
    } catch (error) {
        console.log(error, 'error in creating users');
    }
}
module.exports = {
    deleteUser, getUser, postUser, putUser
}