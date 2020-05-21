const sql = require('../db-con');

async function routes (fastify, options) {
    fastify.get('/models', async (request, reply) => {
        sql.query('SELECT `name`, `body_style`, `code` FROM mb_models', (err, rows) => {
            if(err) throw err;

            console.log('Data received from Db:');
            console.log(rows.length);

            reply
                .code(200)
                .header('Content-Type', 'application/json; charset=utf-8')
                .send({ hello: 'world people', results: rows });
        });
    });

    fastify.get('/model/:code', async (request, reply) => {
        const { params: { code } } = request;

        sql.query('SELECT `name`, `body_style`, `code` FROM mb_models WHERE `code` = ?',[code], (err, rows) => {
            if(err) throw err;

            console.log('Data received from Db:');
            console.log(rows.length);

            reply
                .code(200)
                .header('Content-Type', 'application/json; charset=utf-8')
                .send({ hello: 'world people', results: rows });
        });
    });
}

module.exports = routes;
