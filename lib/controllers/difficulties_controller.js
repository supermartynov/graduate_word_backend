var get = {
    '/list': function(req, res, next) {
        app.Difficulty.findAndCountAll({
            order: [["id", "ASC"]]
        }).then(function(difficulties) {
            res.success({difficulties: difficulties.rows, count: difficulties.count});
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