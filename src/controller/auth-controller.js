const { db } = require("../dbConfig/dbConfig");
const CustomError = require("../error/customError");
const { attachedToken } = require("../helper/attachedToken");
const { fnGet, fnUpdate, fnPost, fnDelete } = require("../helper/commonDbFn");
const { returnResponse } = require("../helper/res-helper");
const TryCatch = require("../helper/tryCatch")
const bcrypt = require('bcryptjs');
const Login = TryCatch(async (req, res) => {
    let body = req.body;
    let userRecord = await fnGet(db.Users, { email: body.email });
    if (userRecord && userRecord.length > 0) {
        userRecord = userRecord[0];
    }
    else {
        return next(CustomError("No User Found", 404))
    }
    let hashPass = body.password + body.email;
    if (bcrypt.compareSync(hashPass, userRecord.password)) {
        if (!userRecord.isActive) throw new CustomError('It seems your account is Freeze', 403);
        if (userRecord.deletionDate) throw CustomError('It seem your account is deleted', 403);

        const newPayload = {
            id: userRecord.id, email: userRecord.email, role: userRecord.role, type: userRecord.type,
        };
        let data = attachedToken(newPayload)
        return returnResponse(res, 200, 'Login Succesfully',
            {
                id: userRecord.id,
                email: userRecord.email,
                type: userRecord.type, role: userRecord.role, ...data
            }
        );
    }
    throw new CustomError("Account detail not match", 404)
})

const Register = TryCatch(async (req, res, next) => {
    let body = req.body;
    let userRecord = await fnGet(db.Users, { contact: body.contact });
    if (userRecord && userRecord.length > 0) {
        return next(new CustomError('User Already Exits', 409))
    }
    body.password = bcrypt.hashSync(body.password + body.email, 10)  //encrypt password 
    let userDetail = await fnPost(db.Users, { ...body, role: 'user', type: 'user', isActive: true });
    const newPayload = {
        id: userDetail.id, email: userDetail.email, role: userDetail.role, type: userDetail.type,
    };
    let data = attachedToken(newPayload)
    return returnResponse(res, 200, 'Login Succesfully',
        {
            id: userRecord.id,
            email: userRecord.email,
            type: userRecord.type, role: userRecord.role, ...data
        }
    );
})
module.exports = {
    Login, Register
}