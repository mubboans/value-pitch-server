const { getCurrentFormatedDate } = require("../helper/helperFn");

async function Users(sequelize, Sequelize) {
    const Users = sequelize.define("Users", {
        firstname: {
            type: Sequelize.STRING,
            allowNull: true
        },
        lastname: {
            type: Sequelize.STRING,
            allowNull: true
        },
        password: {
            type: Sequelize.STRING,
            allowNull: true
        },

        email: {
            type: Sequelize.STRING,
            allowNull: false,
            // unique: true
        },
        contact: {
            type: Sequelize.STRING,
            allowNull: true
        },
        isVerified: {
            type: Sequelize.BOOLEAN,
            defaultValue: false
        },
        status: {
            type: Sequelize.STRING,
            defaultValue: 'pending' //declined,approved,document,document appproval pending,freeze,document reject
        },
        countrycode: {
            type: Sequelize.STRING,
            allowNull: true
        },
        type: {
            type: Sequelize.ENUM,
            values: ['admin', 'user'],
            allowNull: false
        },
        role: {
            type: Sequelize.ENUM,
            values: ['admin', 'client', 'user'],
            defaultValue: "user",
            allowNull: false
        },

        isActive: {
            type: Sequelize.BOOLEAN,
            defaultValue: false,
        },

        createdDate: {
            type: Sequelize.STRING,
            allowNull: true,
            defaultValue: getCurrentFormatedDate()
        },
        lastUpdateDate: {
            type: Sequelize.STRING,
            allowNull: true,
            defaultValue: getCurrentFormatedDate()
        },
        deletionDate: {
            type: Sequelize.STRING,
            allowNull: true
        },
        deletedBy: {
            type: Sequelize.INTEGER,
            allowNull: true
        },
        deleteReason: {
            type: Sequelize.STRING,
            allowNull: true,
        },
        otherdetail: {
            type: Sequelize.STRING,
            allowNull: true,
        },
        industry: {
            type: Sequelize.STRING,
            allowNull: true,
        }
    });
    return Users;
};

module.exports = {
    Users
}