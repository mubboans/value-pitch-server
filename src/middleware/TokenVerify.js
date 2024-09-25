const CustomError = require("../error/customError");
const { validateToken } = require("../helper/attachedToken");
const TryCatch = require("../helper/tryCatch");

const checkToken = TryCatch(async (req, res, next) => {
    let token;
    const authHeader = req.headers.authorization;
    console.log(req.url, 'url check');
    if (req.url.includes('/auth')) {
        return next()
    }
    if (authHeader && authHeader.startsWith("Bearer")) {
        token = authHeader.split(" ")[1];
    }
    if (!token) {
        throw new CustomError("Please Provide Token", 401);
    }
    try {
        console.log('hit before head');
        const head = validateToken(token, process.env.ACCESS_TOKEN_SECRET);
        // console.log(head, 'head check');
        req.user = head;
        if ((head.role || head.email) && head.id) {
            console.log(req.user, 'check Users');
            next();
        }
        else {
            throw new CustomError("Token is invalid", 403);
        }

    } catch (error) {
        throw new CustomError(error?.message ? error?.message : "Unauthorized");
    }
}
)
module.exports = checkToken