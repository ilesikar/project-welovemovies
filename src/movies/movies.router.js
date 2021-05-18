const router = require("express").Router({ mergeParams: true });
const reviewsRouter = require("../reviews/reviews.router.js");
const theatersRouter = require("../theaters/theaters.router.js");
const controller = require("./movies.controller");
const methodNotAllowed = require("../errors/methodNotAllowed");

// router.route("/?is_showing=true")
//     .get(controller.list)
//     .all(methodNotAllowed);

router.use("/:movieId/reviews", reviewsRouter);

router.route("/:movieId")
    .get(controller.read)
    .all(methodNotAllowed);

router.route("/")
    .get(controller.list)
    .all(methodNotAllowed);

module.exports = router;