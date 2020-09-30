
const fetchDefs = require('../test');
// require('../test');
async function routes (fastify, options, done) {
    fastify.get('/', async (request, reply) => {
      return fetchDefs();
    });
    done();
  }
  
  module.exports = routes;