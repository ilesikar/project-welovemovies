const router = require("express").Router();
const reviewsRouter = require("../reviews/reviews.router.js");
const theatersRouter = require("../theaters/theaters.router.js");
const controller = require("./movies.controller");
const methodNotAllowed = require("../errors/methodNotAllowed");

router.use("/:movieId/theaters", theatersRouter);
router.use("/:movieId/reviews", reviewsRouter);

router.route("/:movieId")
    .get(controller.read) // get method
    .all(methodNotAllowed); // catchall method

router.route("/")
    .get(controller.list) // get method
    .all(methodNotAllowed); //catchall method

module.exports = router;