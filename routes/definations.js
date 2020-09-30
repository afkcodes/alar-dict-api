const fetchDefs = require("../app");

async function routes(fastify, options, done) {
  fastify.get("/", options, function (request, reply) {
    // Your code
    reply
      .code(200)
      .header("Content-Type", "application/json; charset=utf-8")
      .send({
        "info": "API is experimental, please go to /def for defination",
        "support" :"currently supporting only kannada alphabets"
      });
  });

  fastify.get("/def/:term", options, async function (request, reply) {
    const { term } = request.params;
    if (term === null || term === "") {
      reply
        .code(200)
        .header("Content-Type", "application/json; charset=utf-8")
        .send({
          error: " Search is needed to get meaning, try again with search term",
        });
    } else {
      var defs = await fetchDefs(term);
      reply
        .code(200)
        .header("Content-Type", "application/json; charset=utf-8")
        .send(defs);
    }
  });
  done();
}

module.exports = routes;
