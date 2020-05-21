async function routes (fastify, options) {
    fastify.get('/', async (request, reply) => {
        reply
            .code(200)
            .header('Content-Type', 'application/json; charset=utf-8')
            .send({ goway: 'attempting access, enter on the correct path, or go away' });
    });

    fastify.get('/haiku', async (request, reply) => {
        reply
            .code(200)
            .header('Content-Type', 'application/json; charset=utf-8')
            .send({ goway: 'attempting access, enter on the correct path, or go away' });
    })
}

module.exports = routes;
