var express = require('express'),
    body_parser = require('body-parser'),
    path = require('path');

var http = express();

module.exports = function(app) {

    var config = app.config.express[process.env.NODE_ENV],
        port = config.port,
        host = config.host || '0.0.0.0';

    http.use(parse_params);
    http.use(json_response());

    http.use(body_parser.urlencoded({extended: true}));
    http.use(body_parser.json());

    http.server = http.listen(port, host);
    http.server.port = port;
    console.log('Express server has been started! Port:' + port);

    http.set_static = function(path, route) {
        if (!route) {
            http.use(express.static(path));
        } else {
            http.use(route, express.static(path));
        }
    };

    http.init_controller = function(urn, routes) {
        var method = null, handler = null,
            path = null, key = null,
            resource = routes.resource;

        if (urn === '/'){
            urn = '';
        }

        for (method in routes.methods) {
            Object.keys(routes.methods[method]).sort().reverse().forEach(function(path) {
                var action = null,
                    handlers = null,
                    path_obj = routes.methods[method][path],
                    no_auth = false;

                if (path_obj.handlers) {
                    handlers = path_obj.handlers;
                    action = path_obj.action;
                    // bool-check
                    no_auth = path_obj.check_auth === false;
                } else {
                    handlers = path_obj;
                }

                http[method](
                    urn + path,
                    function(req, res, next) {
                        req.endpoint = resource;
                        req.action = action;
                        req.no_auth = no_auth;
                        next();
                    },
                    // check_auth,
                    parse_params,

                    function(handlers, urn, path) {
                        return function(req, res, next) {

                            Promise.resolve(handlers(req, res)).then(function (result) {

                            }).catch(function(error) {

                            });
                        }
                    }(handlers, urn, path)
                );
            });
        }
    };

    http.require_controller = function (name, options) {
        options = options || {};

        if (!options.path) {
            options.path = app.root_dir;
        }

        var urn = options.urn || '/' + name;

        if (options.is_root) {
            urn = '/';
        }

        var routes = require(path.join(options.path, 'lib/controllers', name + '_controller'));
        if (typeof routes === "function"){
            routes = routes(options);
        }
        this.init_controller(urn, routes);
    };


    app.http = http;
};

/**
 * Сохраняет все параметры запроса в одном объекте.
 */
var parse_params = function (req, res, next) {

    var placeholders = ['query', 'body'];
    req._params = req.params;

    placeholders.forEach(function (placeholder) {
        for (var key in req[placeholder]) {
            if (req[placeholder].hasOwnProperty(key)) {
                req.params[key] = req[placeholder][key];
            }
        }
    });

    next();
};

var JSONResponseError = function (error) {
    this.error = error;
    this.name = 'JSONResponseError';
};

/**
 * Middleware для удобного формирования ответов в виде JSON (success и data)
 */
var json_response = function () {
    return function (req, res, next) {
        /**
         * Успешный ответ
         *
         * @param {Object} data - данные, которые нужно отправить
         */
        res.success = function (data) {
            if (!data)
                data = {};

            var response = {success: true};

            if (!data || typeof(data) !== 'object') {
                throw new JSONResponseError('[res.success] data should be a valid object');
            }

            for (var key in data) {
                if (data.hasOwnProperty(key))
                    response[key] = data[key];
            }

            res.status(200);
            res.json(response);
        };

        /**
         * Неуспешный ответ
         *
         * @param {Error} error Код ошибки
         */
        res.error = function (error) {
            var out_msg = '';

            if (!error) {
                throw JSONResponseError('[res.error] Error message is required');
            }

            if (error instanceof Error) {
                out_msg = 'ServerError';
            } else {
                out_msg = error.message || error;
            }

            res.status(200);
            res.json({success: false, error: out_msg});
        };

        next();
    }
};