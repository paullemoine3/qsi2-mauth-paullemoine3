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
                    this.setDataValue('title', val);
                }
            },
            description: {
                type: DataTypes.STRING,
                comment: "Groups description",
                set(val) {
                    this.setDataValue('description', val);
                }
            },
            metadatas: {
                type: DataTypes.JSON,
                comment: "Groups metadatas",
                set(val) {
                    this.setDataValue('metadatas', val);
                }
            },
        }
    );
    Groups.associate = models => {
        Groups.belongsToMany(models.Users, {
            through: 'groupUser'
        });
    };

    return Groups;
};