const router = require("express").Router({ mergeParams: true });
const controller = require("./reviews.controller.js");
const methodNotAllowed = require("../errors/methodNotAllowed");

// route for /:reviewId with put, delete, get methods
router.route("/:reviewId")
    .put(controller.update)
    .delete(controller.destroy)
    .get(controller.list)
    .all(methodNotAllowed); // catchall method

// route for "/" with get method
router.route("/")
    .get(controller.list)
    .all(methodNotAllowed); // catchall method

module.exports = router;