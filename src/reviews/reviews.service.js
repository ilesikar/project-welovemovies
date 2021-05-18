const knex = require("../db/connection");

async function list(movieId) {
    return knex("reviews")
        .select("*")
        .where("movie_id", movieId);
}

module.exports = {
    list,
}