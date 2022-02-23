var TagsTask = sequelize.define(
    'tags_task',
    {},
    {
        tableName: 'tags_tasks',
        paranoid: true,
        timestamps: true,
        createdAt: 'created',
        updatedAt: 'updated',
        deletedAt: 'deleted'
    }
);

module.exports = TagsTask;