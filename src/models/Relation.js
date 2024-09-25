const { getCurrentFormatedDate } = require("../helper/helperFn");

async function Relation(sequelize, Sequelize) {
    const Relation = sequelize.define("Relation", {
        userid: {
            type: Sequelize.INTEGER,
            allowNull: true,
            references: {
                model: 'Users', // Name of the Users table
                key: 'id'
            }
        },
        clientid: {
            type: Sequelize.INTEGER,
            allowNull: true,
            references: {
                model: 'Users',
                key: 'id'
            }
        },
        adminid: {
            type: Sequelize.INTEGER,
            allowNull: true,
            references: {
                model: 'Users',
                key: 'id'
            }
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
    Relation.associate = (models) => {
        Relation.belongsTo(models.Users, { foreignKey: 'userid', as: 'user' });
        Relation.belongsTo(models.Users, { foreignKey: 'clientid', as: 'client' });
        Relation.belongsTo(models.Users, { foreignKey: 'adminid', as: 'admin' });
    };
    return Relation;
};

module.exports = {
    Relation
}