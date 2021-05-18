const service = require("./movies.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

async function list(req, res) {
    const methodName = "list";
    req.log.debug({ __filename, methodName });
    const data = await service.list();
    res.json({
        data,
    });
    req.log.trace({ __filename, methodName, return: true, data });
}

async function read(req, res) {
    const methodName = "read";
    const { movieId } = req.params
    req.log.debug({ __filename, methodName });
    const data = await service.read(movieId);
    res.json({
        data,
    })
}

module.exports = {
    list: asyncErrorBoundary(list),
    read: asyncErrorBoundary(read),
}