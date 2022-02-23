var get = {
    '/list': function(req, res, next) {
        app.Database.findAndCountAll({
            order: [["id", "ASC"]]
        }).then(function(databases) {
            res.success({databases: databases.rows, count: databases.count});
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