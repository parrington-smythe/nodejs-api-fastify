require('dotenv').config();

const fastify = require('fastify')({
    logger: true
});

fastify.use(function (req, res, next) {
    // extend middleware for authentication and/or authorisation
    console.log('Time:', Date.now());
    next();
});

fastify.register(require('./routes/base'));
fastify.register(require('./routes/models'));
fastify.register(require('./routes/events'));

fastify.listen(3001, function (err, address) {
    if (err) {
        fastify.log.error(err);
        process.exit(1)
    }
    fastify.log.info(`server listening on ${address}`)
});
