const Users = require('./users');

module.exports = (sequelize, DataTypes) => {
    const Groups = sequelize.define(
        'Groups', {
            id: {
                // Avoid usage of auto-increment numbers, UUID is a better choice
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
                comment: 'Groups ID',
                primaryKey: true
            },
            title: {
                type: DataTypes.STRING,
                comment: "Groups title",
                set(val) {
                    this.setDataValue('title', val.toUpperCase());
                }
            },
            description: {
                type: DataTypes.STRING,
                comment: "Groups description",
                set(val) {
                    this.setDataValue('description', val.toUpperCase());
                }
            },
            metadatas: {
                type: DataTypes.JSON,
                comment: "Groups metadatas",
                set(val) {
                    this.setDataValue('metadatas', val.toUpperCase());
                }
            }
        }
    );

    Groups.hasOne(Users, {
        as: 'owner'
    });
    Groups.hasMany(Users, {
        as: 'members'
    })
    return Groups;
};