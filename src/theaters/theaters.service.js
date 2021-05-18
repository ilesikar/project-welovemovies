const knex = require("../db/connection.js");

async function list(movieId) {
    return knex("theaters")
        .select("*");
}

module.exports = {
    list,
}