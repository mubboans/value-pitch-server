const CustomError = require("../error/customError");

const fnGet = async (model, query = {}) => {
    query = {
        where: query,
        order: [["id", "DESC"]]
    }
    try {
        let returnRecord = await model.findAll(query);
        return returnRecord;
    } catch (error) {
        throw new CustomError(error?.message, 500)
    }
}
const fnUpdate = async (model, obj, condition) => {
    try {
        const data = await model.update(obj, { where: condition });
        if (data[0] !== 0) {
            return true
        }
        else {
            throw new CustomError('No Record Found To Update', 404)
        }
    } catch (error) {
        throw new CustomError(error?.message, 500)
    }
}
const fnPost = async (model, obj) => {
    try {
        let user = await model.create(obj);
        return user;
    } catch (error) {
        throw new CustomError(error?.message, 400)
    }
}
const fnDelete = async (model, condition) => {
    try {
        const record = await model.destroy({ where: condition });
        if (record == 1 || record > 1) {
            return true
        }
        else {
            throw new CustomError('No Record Found To Delete', 404)
        }
    } catch (error) {
        throw new CustomError(error?.message, 400)
    }
}
module.exports = {
    fnGet, fnUpdate, fnDelete, fnPost
}

