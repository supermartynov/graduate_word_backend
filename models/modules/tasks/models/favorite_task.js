var FavoriteTask = sequelize.define(
    'favorite_task',
    {},
    {
        tableName: 'favorite_tasks',
        paranoid: true,
        timestamps: true,
        createdAt: 'created',
        updatedAt: 'updated',
        deletedAt: 'deleted'
    }
);

module.exports = FavoriteTask;