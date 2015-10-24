'use strict';


/**
 * Module dependencies.
 */

module.exports = function (server) {
    server.route({
        method: 'POST',
        path: '/api/v1/engine',
        handler: function (request, reply) {
            reply('hi, there');
        },
        config: {
            description: 'Start engine',
            tags: ['Business Process Engine']
        }
    });
};
