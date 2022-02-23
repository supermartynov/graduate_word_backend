var fs = require("fs"),
    pg = require('pg'),
    path = require("path"),
    utils = require("./utils");

module.exports = function (app) {

    if(!app.config.postgres || !app.config.postgres[process.env.NODE_ENV]) {
        console.log('Config postgres not found');
        process.exit();
    }

    var config = app.config.postgres[process.env.NODE_ENV];

    pg.defaults.parseInt8 = true;

    global.Sequelize = require('sequelize');

    var Op = Sequelize.Op;
    var operatorsAliases = {
        $eq: Op.eq,
        $or: Op.or,
        $ne: Op.ne,
        $any: Op.any,
        $all: Op.all,
        $values: Op.values,
        $col: Op.col,
        $notIn: Op.notIn,
        $gte: Op.gte,
        $gt: Op.gt,
        $lte: Op.lte,
        $lt: Op.lt,
        $and: Op.and,
        $not: Op.not
    };

    global.sequelize = new Sequelize(
        config.database,
        config.user,
        config.password, {
            host: config.host,
            dialect: 'postgres',
            pool: {
                max: 50,
                min: 50,
                idle: 10000
            },
            transactionType: Sequelize.Transaction.TYPES.DEFERRED,
            isolationLevel: 'READ COMMITTED',
            timezone: '+03:00',
            // logging: console.log,
            logging: utils.set_logging(config),
            operatorsAliases: operatorsAliases,
            native: false
        }
    );

    sequelize.authenticate().then(function() {
        console.log('[Sequelize] Connect');
    }).catch(function(error) {
        console.log('[Sequelize] error', JSON.stringify(error || {}));
    });

    var models = {};
    var errors = {};
    var modules = ['users', 'tasks'];

    for(var module of modules) {
        console.log('module', module);
        console.log('Require module', module);
        models = require('./modules/' + module)(app, models);

        utils.require_methods(models, app, '/modules/' + module);

        try {
            errors = Object.assign(errors || {}, require('./modules/' + module + '/errors'));
        }
        catch(error) {
            console.log('Error find errors', module);
        }
    }

    // console.log(models);
    //
    // //Errors
    // console.log(errors);

    if (app) {

        app.models_list = Object.keys(models);
        app.errors = errors;

        for (var model in models) {
            app[model] = models[model];
        }

        app.Sequelize = Sequelize;
        app.sequelize = sequelize;
    } else {
        return models;
    }

    /**
     * sync создает таблицы, если их нет в базе, но не делает alter table, если описание
     * модели изменилось.
     */
    var force_sync = false;

    // if (process.env.PG_FORCE_SYNC && (process.node_env == 'dev')) {
    //     force_sync = true;
    // }

    return sequelize.sync({force: force_sync}).then(function () {

        console.log('[Sequelize] Sync completed');

        // if(app.config.modules && process.env.INIT) {
        //     for(var module in app.config.modules) {
        //         if(app.config.modules[module].active) {
        //             console.log('Init module', module);
        //
        //             try {
        //                 require('./modules/' + module + '/init')(app, models);
        //             }
        //             catch(error) {}
        //         }
        //     }
        // }
    }).catch(function(error) {
        console.log('Error', error);
        console.log('Stack', error.stack);
    });
};
