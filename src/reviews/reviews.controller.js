const reviewsService = require("./reviews.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

async function list(req, res) {
    const methodName = "list";
    const { movieId } = req.params;
    req.log.debug({ __filename, methodName });
    const data = await reviewsService.list( movieId );
    res.json({ data: data });
    req.log.trace({ __filename, methodName, data });
}

module.exports = {
    list: [asyncErrorBoundary(list)],
}