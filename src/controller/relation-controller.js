const { Op } = require("sequelize");
const { db } = require("../dbConfig/dbConfig");
const CustomError = require("../error/customError");
const { fnGet, fnUpdate, fnPost, fnDelete } = require("../helper/commonDbFn");
const { returnResponse } = require("../helper/res-helper");
const TryCatch = require("../helper/tryCatch");
const { emitUserUpdate } = require("./socket-helper");
const bcrypt = require('bcryptjs');

const getRelation = TryCatch(async (req, res, next) => {
    let RelationRecord = await fnGet(db.Relation, req.query, [
        {
            model: db.Users,
            foreignKey: 'userid',
            as: 'user'
        },
        {
            model: db.Users,
            foreignKey: 'clientid',
            as: 'client'
        },
    ]);
    return returnResponse(res, 200, 'Successfully Get Relation', RelationRecord)
}
)

const putRelation = TryCatch(async (req, res, next) => {

    await emitRelationUpdate(req.body.email, req.Relation);
    await fnUpdate(db.Relation, req.body, { id: req.body.id })
    return returnResponse(res, 200, 'Successfully Update Relation')
}
)


const postRelation = TryCatch(async (req, res, next) => {
    console.log('====================================');
    console.log(req.Relation, 'check Relation');
    console.log('====================================');
    setRelationrolenType(req.Relation, next, req.body);
    let RelationCheck = await fnGet(db.Relation, {
        [Op.or]: [
            { contact: req.body.contact },
            { email: req.body.email }
        ]
    });
    if (RelationCheck && RelationCheck.length > 0) {
        return next(new CustomError('Relation Already Exits', 409))
    }
    req.body.isActive = true
    req.body.password = bcrypt.hashSync(req.body.password + req.body.email, 10)
    let Relation = await fnPost(db.Relation, req.body);
    await createRelationRelation(req.Relation, { ...req.body, Relationid: Relation.id }, next)
    return returnResponse(res, 201, 'Successfully Added Relation');
}
)

const deleteRelation = TryCatch(async (req, res, next) => {
    if (!req.query.id) {
        throw new CustomError('id required', 400)
    }
    await fnDelete(db.Relation, req.query)
    return returnResponse(res, 200, 'Successfully Delete Relation')
}
)

module.exports = {
    getRelation, putRelation, deleteRelation, postRelation
}