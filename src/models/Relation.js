const { getCurrentFormatedDate } = require("../helper/helperFn");

async function Relation(sequelize, Sequelize) {
    const Relation = sequelize.define("Relation", {
        userid: {
            type: Sequelize.INTEGER,
            allowNull: true
        },
        clientid: {
            type: Sequelize.INTEGER,
            allowNull: true
        },
        adminid: {
            type: Sequelize.INTEGER,
            allowNull: true
        },
        relationtype: {
            type: Sequelize.INTEGER,
            allowNull: false,
            comment: '00 for admin adding for client 01 for admin adding user 11 for client add user and '
        },
        createdDate: {
            type: Sequelize.STRING,
            allowNull: true,
            defaultValue: getCurrentFormatedDate()
        },


    });
    return Relation;
};

module.exports = {
    Relation
}