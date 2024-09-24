const { Sequelize, DataTypes } = require('sequelize');
const { Users } = require('../models/Users');

const sequelize = new Sequelize(process.env.DB, process.env.USER,
    process.env.PASSWORD, {
    host: process.env.HOST,
    dialect: process.env.DB_DIALECT,
    operationsAliases: false,
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
db.Users = Users(sequelize, Sequelize);
async function dbConnect() {
    try {
        await sequelize.authenticate();
        await sequelize.sync({ alter: false });
    } catch (error) {
        console.log(error, 'error in connecting')
    }
}
module.exports = { db, dbConnect };
