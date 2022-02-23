var Tag = sequelize.define(
    'tag',
    {
        title: {type: Sequelize.STRING, allowNull: false, unique: true}
    },
    {
        tableName: 'tag',
        paranoid: true,
        timestamps: true,
        createdAt: 'created',
        updatedAt: 'updated',
        deletedAt: 'deleted'
    }
);

module.exports = Tag;