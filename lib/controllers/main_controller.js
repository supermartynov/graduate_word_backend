var get = {
    '/': function(req, res, next) {
        res.send('Hello, world!');
    }
};

module.exports = {
    resource: '',
    methods: {
        get: get,
    }
};