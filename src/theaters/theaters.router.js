const methodNotAllowed = require("../errors/methodNotAllowed");
const router = require("express").Router({ mergeParams: true });
const controller = require("./theaters.controller.js");

router.route("/")
    .get(controller.list) // get method
    .all(methodNotAllowed) // catchall method

module.exports = router;