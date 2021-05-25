const P = require("pino");
const knex = require("../db/connection");

// return all movies data
function list() {
    return knex("movies").select("*");
}

// return movies data with is_showing = true
function listShowing() {
    return knex("movies as m")
        .join("movies_theaters as mt", "m.movie_id", "mt.movie_id")
        .select("*")
        .where("mt.is_showing", true)
        .groupBy("m.movie_id")
}

// return one movie matching movieId
function read(movieId) {
    return knex("movies")
    .select("*")
    .where("movie_id", movieId)
    .first();
}


module.exports = {
    list,
    read,
    listShowing,
}