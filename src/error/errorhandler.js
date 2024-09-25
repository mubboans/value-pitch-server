const CustomError = require("./customError");

function apiErrorHandler(err, req, res, next) {
    if (err instanceof CustomError) {
        let data = {
            message: err?.message,
            success: false,
            error: err?.error,
            status: 'Falied'
        }
        return res.status(err.code).send(data);
        // console.log('running after the return');
    }
    // else if (err instanceof CustomErrorObj) {
    //     // console.log(err, 'err check');
    //     return res.status(err.code).send({ error: err.message, status: "Failed" });
    // }
    else {
        // console.log(err, 'err come');
        return res.status(500).send({ message: err?.message ? err?.message : 'Something went wrong', success: false, status: 'Service unreachable', })
    }
}
module.exports = apiErrorHandler