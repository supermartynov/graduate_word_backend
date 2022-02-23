var get = {
    '/list': function(req, res, next) {
        app.Topic.findAndCountAll({
            order: [["id", "ASC"]]
        }).then(function(topics) {
            res.success({topics: topics.rows, count: topics.count});
        }).catch(function(err) {
            console.log(err);
            res.error(err);
        });
    }
};

module.exports = {
    resource: '',
    methods: {
        get: get,
    }
};