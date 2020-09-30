
const fetchDefs = require('../app');
const getData = require('../app');
require('../app');
async function routes (fastify, options, done) {
    fastify.get('/', async (request, reply) => {
      return fetchDefs();
    });
    done();
  }
  
  module.exports = routes;