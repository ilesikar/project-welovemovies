const asyncErrorBoundary = require("../errors/asyncErrorBoundary.js");
const service = require("./theaters.service.js");

async function list(req, res) {
    const { movieId } = req.params;
    req.log.debug(__fileName, movieId, 'list');
    const data = await service.list(movieId);
    res.json({ data });
}

module.exports = {
    list: [asyncErrorBoundary, list],
}