var Difficulty = sequelize.define(
    'difficulty',
    {
        value: {type: Sequelize.INTEGER, allowNull: false},
        title: {type: Sequelize.STRING, allowNull: false}
    },
    {
        tableName: 'difficulty',
        paranoid: true,
        timestamps: true,
        createdAt: 'created',
        updatedAt: 'updated',
        deletedAt: 'deleted'
    }
);

module.exports = Difficulty;