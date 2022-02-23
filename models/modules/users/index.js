module.exports = function(app, models) {
    models = Object.assign(models, {
        User: require('./models/user'),
        Role: require('./models/role')
    });

    var User = models.User,
        Role = models.Role;

    Role.hasMany(User, {foreignKey: {name: 'role_id', allowNull: false}});

    User.belongsTo(Role, {foreignKey: {name: 'role_id', allowNull: false}});

    return models;
};