const express = require('express');
var path = require('path'),
    express_config = require('./config/express.json'),
    postgres_config = require('./config/postgres.json');

// process.env.NODE_ENV = 'stage';

global.app = require('./modules/boot.js')({
    root_dir : __dirname + '/',
    log_dir : __dirname + '/logs',
    config: {
        express: express_config,
        postgres: postgres_config,
    }
});

var http = app.http;

http.set_static(path.join(__dirname, 'static'));
http.set('views', path.join(__dirname, 'views'));
http.set('view engine', 'jade');

http.require_controller('main', {is_root: true});
http.require_controller('topics');
http.require_controller('databases');
http.require_controller('tasks');
http.require_controller('difficulties');
require('./models')(app);