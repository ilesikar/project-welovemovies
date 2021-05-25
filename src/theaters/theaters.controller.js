const asyncErrorBoundary = require("../errors/asyncErrorBoundary.js");
const service = require("./theaters.service.js");
const reduceProperties = require("../utils/reduce-properties.js");

// organizes movie data into a movie object within each theater object
const reduceMovies = reduceProperties("theater_id", {
    movie_id: ["movies", null, "movie_id"],
    title: ["movies", null, "title"],
    rating: ["movies", null, "rating"],
    runtime_in_minutes: ["movies", null, "runtime_in_minutes"],
  });

// returns theater data
async function list(req, res) {
    const methodName = "list"
    const { movieId } = req.params;
    req.log.debug({ __filename, methodName, movieId });
    // sends movieId, if exists, to service.list
    // database will send back all theater data, or just some if movieId exists
    const data = await service.list(movieId);
    // organize movie data with reduceMovies()
    const newData = reduceMovies(data);
    req.log.trace({ __filename, methodName, newData });
    res.json({ data: newData }); // returns organized data
}

module.exports = {
    list: asyncErrorBoundary(list),
}