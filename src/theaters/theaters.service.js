const knex = require("../db/connection.js");

// returns theater data from db table "theater"
function list(movieId) {
    // if movieId is passed, return theaters matching that movieId
    if (movieId) {
        return knex("theaters as t")
            .join("movies_theaters as mt", "t.theater_id", "mt.theater_id")
            .join("movies as m", "mt.movie_id", "m.movie_id")
            .select("t.theater_id", "t.address_line_1", "t.address_line_2", "t.city", "m.rating", "m.runtime_in_minutes", "m.title", "t.name", "t.state", "t.zip")
            .where("m.movie_id", movieId)
    }
    // else return all theater data
    return knex("theaters as t")
        .join("movies_theaters as mt", "t.theater_id", "mt.theater_id")
        .join("movies as m", "mt.movie_id", "m.movie_id")
        .select("t.theater_id", "t.address_line_1", "t.address_line_2", "t.city", "m.rating", "m.runtime_in_minutes", "m.title", "t.name", "t.state", "t.zip")
}

module.exports = {
    list,
}