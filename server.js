const fastify = require("fastify")({ logger: true });

fastify.register(require('./routes/definations'))

const start = async () => {
  try {
    await fastify.listen(process.env.PORT || 8000);
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};
start();
