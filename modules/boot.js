var path = require('path');
var EventEmitter = require('events').EventEmitter;

module.exports = function (params) {
    var app = new EventEmitter();
    app.root_dir = params.root_dir;
    app.config = {};
    app.config.express = params.config.express;
    app.config.postgres = params.config.postgres;
    app.app_log_dir = params.app_log_dir;
    app.app_name = path.basename(app.root_dir);
    app.start_time = Date.now();

    require('./express.js')(app);

    return app;
};