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
    let hashPass = body.email + body.password;
    if (bcrypt.compareSync(hashPass, userRecord.password)) {
        if (!userRecord.isActive) throw new CustomError('It seems your account is Freeze', 403);
        if (userRecord.deletionDate) throw CustomError('It seem your account is deleted', 403);

        const newPayload = {
            id: userRecord.id, email: userRecord.email, role: userRecord.role, type: userRecord.type,
        };
        let data = attachedToken(newPayload)
        return returnResponse(res, 200, 'Login Succesfully',
            // {
            //     ...data, role: userDetails.role,
            //     id: userDetails.id,
            //     isVerified: userDetails.isVerified,
            //     rejectionreason: userDetails.rejectionreason,
            //     email: userDetails.email,
            //     linkDevice: userDetails.linkDevice,
            //     status: userDetails.status,
            //     userDetailId: userDetails.userdetail[0]?.id,
            //     userdetail: userDetails.userdetail
            // }
            loginReponse(userDetails, data)
        );
    }
    throw new CustomError("Account detail not match")
})

const Register = TryCatch(async (req, res) => {

})
module.exports = {
    Login, Register
}