var Task = sequelize.define(
    'task',
    {
        title: {type: Sequelize.STRING, allowNull: false, unique: true},
        description: {type: Sequelize.TEXT, allowNull: false},
        answer: {type: Sequelize.TEXT, allowNull: false},
        helper: {type: Sequelize.TEXT, allowNull: true}
    },
    {
        tableName: 'tasks',
        paranoid: true,
        timestamps: true,
        createdAt: 'created',
        updatedAt: 'updated',
        deletedAt: 'deleted'
    }
);

module.exports = Task;