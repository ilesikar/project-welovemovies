const service = require("./movies.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");
const { whereNotExists } = require("../db/connection");

// returns movie data for "/movies/"
async function list(req, res) {
    const methodName = "list"; // method name for logging
    // if url query is_showing = true
    if (req.query.is_showing) {
        // get movie data that has is_showing = true
        const data = await service.listShowing()
        req.log.debug({ __filename, methodName, data });
        // return that movie data
        return res.json({ data })
    }
    // if url query is_showing is falsy
    // get all movie data
    const data = await service.list();
    req.log.debug({ __filename, methodName, data });
    // then return that data
    res.json({
        data,
    });
    req.log.trace({ __filename, methodName, return: true, data });
}

async function read(req, res, next) {
    const methodName = "read"; // for logging
    const { movieId } = req.params // get movieId url parameter
    req.log.debug({ __filename, methodName });
    // get single movie data where movieId = movie_id
    const data = await service.read(movieId);
    // if returned data exists
    if (data) {
        req.log.debug({ __filename, methodName, data })
        // return that data
        return res.json({
            data: data,
        });
    }
    // if no data, res 404
    next({
        status: 404,
        message: `Movie not found by id ${movieId}`
    });
    req.log.trace({ __filename, methodName, return: true, data });
}

module.exports = {
    list: asyncErrorBoundary(list),
    read: asyncErrorBoundary(read),
}