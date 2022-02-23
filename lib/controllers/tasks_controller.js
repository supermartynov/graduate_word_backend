var get = {
    '/list': function(req, res, next) {
        app.Task.findAndCountAll({
            order: [["id", "ASC"]],
            include: [
                {model: app.Difficulty, attributes: ['id', 'title']},
                {model: app.Topic, attributes: ['id', 'title']},
                {model: app.Database, attributes: ['id', 'title']}
            ]
        }).then(function(tasks) {
            res.success({tasks: tasks.rows, count: tasks.count});
        }).catch(function(err) {
            console.log(err);
            res.error(err);
        });
    },
    '/:id': function(req, res) {
        app.Task.findOne({
            where: {id: req.params.id},
            include: [
                {model: app.Difficulty, attributes: ['id', 'title']},
                {model: app.Topic, attributes: ['id', 'title']},
                {model: app.Database}
            ]
        }).then(function(task) {
            res.success(task.dataValues);
        }).catch(function(err) {
            console.log(err);
            res.error(err);
        });
    }
};

var post = {
    '/add': function(req, res) {
        var ctx = {};
        return sequelize.transaction(function(t) {
            return app.Task.create({
                title: req.body.title,
                topic_id: req.body.topic,
                database_id: req.body.database,
                description: req.body.description,
                difficulty_id: req.body.difficulty,
                answer: req.body.answer,
                helper: req.body.helper
            }, {transaction: t}).then(function(task) {
                ctx.task = task;
                res.success(ctx.task.dataValues);
            });
        }).catch(function(err) {
            res.error(err);
        });
    }
}

module.exports = {
    resource: '',
    methods: {
        get: get,
        post: post,
    }
};