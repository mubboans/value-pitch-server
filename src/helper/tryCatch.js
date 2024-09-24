const CustomError = require("../error/customError");

const TryCatch = (func) => {
    return (req, res, next) => {
        return Promise.resolve(func(req, res, next)).catch((e) => {
            console.log(e, 'error throw from trycatch ');
            throw new CustomError(e?.message ? e?.message : 'Something went wrong', e?.code ? e?.code : 400)
        });
    }
}

module.exports = TryCatch