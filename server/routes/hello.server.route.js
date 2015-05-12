'use strict';


/**
 * Module dependencies.
 */

var _           = require('lodash'),
    app         = require('onestack'),

    internals   = {};


module.exports = function (server, boom) {


    server.route({
        method: 'POST',
        path: '/api/v1/hello',
        handler: function (request, reply) {
            reply('welcome').code(200);
        },
        config: {
            description: 'Start engine',
            tags: ['Business Process Engine']
        }
    });



};
