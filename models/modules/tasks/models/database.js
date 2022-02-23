var Database = sequelize.define(
    'database',
    {
        title: {type: Sequelize.STRING, allowNull: false, unique: true},
        image: {type: Sequelize.STRING, allowNull: true},
        description: {type: Sequelize.TEXT, allowNull: false},
        short_description: {type: Sequelize.STRING, allowNull: false}
    },
    {
        tableName: 'databases',
        paranoid: true,
        timestamps: true,
        createdAt: 'created',
        updatedAt: 'updated',
        deletedAt: 'deleted'
    }
);

module.exports = Database;