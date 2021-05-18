const methodNotAllowed = require("../errors/methodNotAllowed");
const router = ("express").Router({ mergeParams: true });
const controller = ("./theaters.controller.js");

router.route("/")
    .get(controller.list)
    .all(methodNotAllowed)

module.exports = router;