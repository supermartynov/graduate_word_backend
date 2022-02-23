module.exports = function (app, models) {

    models = Object.assign(models, {
        Answer: require('./models/answer'),
        Database: require('./models/database'),
        Difficulty: require('./models/difficulty'),
        FavoriteTask: require('./models/favorite_task'),
        Tag: require('./models/tag'),
        TagsTask: require('./models/tags_task'),
        Task: require('./models/task'),
        Topic: require('./models/topic')
    });

    var Answer = models.Answer,
        Database = models.Database,
        Difficulty = models.Difficulty,
        FavoriteTask = models.FavoriteTask,
        Tag = models.Tag,
        TagsTask = models.TagsTask,
        Task = models.Task,
        Topic = models.Topic,
        User = models.User;

    Topic.hasMany(Task, {foreignKey: {name: 'topic_id', allowNull: false}});

    Tag.hasMany(TagsTask, {foreignKey: {name: 'tag_id', allowNull: false}});

    Task.hasMany(TagsTask, {foreignKey: {name: 'task_id', allowNull: false}});
    Task.hasMany(FavoriteTask, {onDelete: 'CASCADE', foreignKey: {name: 'task_id', allowNull: false}});
    Task.hasMany(Answer, {foreignKey: {name: 'task_id', allowNull: false}});
    Task.belongsTo(Difficulty, {foreignKey: {name: 'difficulty_id', allowNull: false}});
    Task.belongsTo(Topic, {foreignKey: {name: 'topic_id', allowNull: false}});
    Task.belongsTo(Database, {foreignKey: {name: 'database_id', allowNull: false}});

    TagsTask.belongsTo(Tag, {foreignKey: {name: 'tag_id', allowNull: false}});
    TagsTask.belongsTo(Task, {foreignKey: {name: 'task_id', allowNull: false}});

    Database.hasOne(Task, {onDelete: 'CASCADE', foreignKey: {name: 'database_id', allowNull: false}});

    Difficulty.hasOne(Task, {foreignKey: {name: 'difficulty_id', allowNull: false}});

    FavoriteTask.belongsTo(Task, {foreignKey: {name: 'task_id', allowNull: false}});
    FavoriteTask.belongsTo(User, {foreignKey: {name: 'user_id', allowNull: false}});

    User.hasMany(FavoriteTask, {foreignKey: {name: 'user_id', allowNull: false}});
    User.hasMany(Answer, {onDelete: 'CASCADE', foreignKey: {name: 'user_id', allowNull: false}});

    Answer.belongsTo(User, {foreignKey: {name: 'user_id', allowNull: false}});

    return models;
};