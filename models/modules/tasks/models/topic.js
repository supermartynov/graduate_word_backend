var Topic = sequelize.define(
    'topic',
    {
        title: {type: Sequelize.STRING, allowNull: false, unique: true},
        short_description: {type: Sequelize.STRING, allowNull: false},
        description: {type: Sequelize.TEXT, allowNull: false}
    },
    {
        tableName: 'topics',
        paranoid: true,
        timestamps: true,
        createdAt: 'created',
        updatedAt: 'updated',
        deletedAt: 'deleted'
    }
);

module.exports = Topic;