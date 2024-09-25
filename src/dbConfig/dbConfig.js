const { Sequelize, DataTypes } = require('sequelize');
const { Users } = require('../models/Users');
const { Relation } = require('../models/Relation');

const sequelize = new Sequelize(process.env.DB, process.env.USER,
    process.env.PASSWORD, {
    host: process.env.HOST,
    dialect: process.env.DB_DIALECT,
    operationsAliases: false,
    logging: false,
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
})

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;
async function dbConnect() {
    try {
        db.Users = await Users(sequelize, Sequelize);
        db.Relation = await Relation(sequelize, Sequelize);
        await db.sequelize.authenticate();
        await db.sequelize.sync({ alter: false });
        console.log('====================================');
        console.log('db sync');
        console.log('====================================');
    } catch (error) {
        console.log(error, 'error in connecting')
    }
}
module.exports = { db, dbConnect };
