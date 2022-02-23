var Role = sequelize.define(
    'role',
    {
        role: {type: Sequelize.STRING, allowNull: false}
    },
    {
        tableName: 'roles',
        paranoid: true,
        timestamps: true,
        createdAt: 'created',
        updatedAt: 'updated',
        deletedAt: 'deleted'
    }
);

module.exports = Role;