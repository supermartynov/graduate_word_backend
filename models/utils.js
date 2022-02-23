var fs = require('fs'),
    path = require('path');

/**
 * Включение, отключения логирования в sequelize.
 * @param {Object} conf конфиг для Postgres
 */
var set_logging = function set_logging (conf) {
    if (process.env.NODE_ENV === 'prod')
        return false;

    if (process.env.PG_LOG_ENABLE || conf.logging)
        return true;

    return false;
};


/**
 * Импортирует все, что лежит в директории methods.
 */
var require_methods = function (models, app, dir) {

    dir = dir || '';

    try {

        var files = fs.readdirSync(path.join(__dirname + dir, 'methods'));

        files.forEach(function (file) {
            require(path.join(__dirname + dir, 'methods', file))(models, app);
        });
    }
    catch(error) {
        console.log(error);
        console.log('Error find file in methods', dir);
    }
};

/*
 * Подготовка объекта query для заброса к бд.
 */
// app.make_query = function(options, raw_params, range_params) {
//
//     raw_params = raw_params || [];
//     range_params = range_params || [];
//     var query = {};
//
//     range_params.forEach(function(cond) {
//         var get_cond_val = function(field) {
//             return (cond.datetime ? sequelize.literal('to_timestamp(' +
//                 options[field] + ')') : options[field])
//         };
//
//         if (options[cond.start] && options[cond.end]) {
//             query[cond.field] = {
//                 $and : [
//                     { $gte : get_cond_val(cond.start) },
//                     { $lte : get_cond_val(cond.end) }
//                 ]
//             }
//         } else if (options[cond.start]) {
//             query[cond.field] = { $gte : get_cond_val(cond.start) };
//         } else if (options[cond.end]) {
//             query[cond.field] = { $lte : get_cond_val(cond.end) };
//         }
//     });
//
//     raw_params.forEach(function(param) {
//         if (options[param.name]) {
//             query[param.field || param.name] = options[param.name];
//         }
//     });
//
//     return query;
// };

module.exports = {
    require_methods : require_methods,
    set_logging : set_logging,
};
