var User = sequelize.define(
    'user',
    {
        login: {type: Sequelize.STRING, allowNull: false, unique: true},
        password: {type: Sequelize.STRING, allowNull: false},
        email: {type: Sequelize.STRING, allowNull: false, unique: true},
        first_name: {type: Sequelize.STRING, allowNull: true},
        second_name: {type: Sequelize.STRING, allowNull: true},
        third_name: {type: Sequelize.STRING, allowNull: true},
        age: {type: Sequelize.INTEGER, allowNull: true},
        sex: {type: Sequelize.ENUM('male', 'female'), allowNull: true}
    },
    {
        tableName: 'users',
        paranoid: true,
        timestamps: true,
        createdAt: 'created',
        updatedAt: 'updated',
        deletedAt: 'deleted'
    }
);

module.exports = User;