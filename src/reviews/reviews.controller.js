const service = require("./reviews.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");
const mapProperties = require("../utils/map-properties.js");

// converts critic key/values into a critic object
const addCritic = mapProperties({
    preferred_name: "critic.preferred_name",
    surname: "critic.surname",
    organization_name: "critic.organization_name",
})

// checks that review exists matching req data
async function reviewExists(req, res, next) {
    const methodName = "reviewExists" // methodName for log
    // if reviewId parameter exists
    if (req.params.reviewId || req.params.reviewId != undefined) {
        // capture that reviewId parameter
        const { reviewId } = req.params;
        // use reviewId to find matching review in database
        const review = await service.getReview(reviewId);
        if (review) {
            // store param reviewId and database review in res.locals object
            res.locals.reviewId = reviewId;
            res.locals.review = review;
            req.log.trace({ __filename, methodName, reviewId, review });
            return next() // continue res pipeline
        }
    }
    // if parameter or db review didnt exists
    // invoke next with error 404
    next({
        status: 404,
        message: `Review id cannot be found`
    });
}

// check that db review has created_date
async function reviewHasCreatedDate(req, res, next) {
    const methodName = "reviewHasCreationDate";
    // if no creation date, set one
    if (!res.locals.review.created_at) {
        res.locals.review.created_at = String(Date.now());
    }
    // always set an update
    res.locals.review.updated_at = String(Date.now());
    req.log.trace({ __filename, methodName, }, res.locals.review.updated_at);
    return next(); // continue pipeline
}

// if movieId in params, return just those reviews
// otherwise return all reviews (additional functionality, not necessary for tests)
async function list(req, res) {
    const methodName = "list"; // methodName for logging
    // get movieId from params
    const { movieId } = req.params;
    req.log.debug({ __filename, methodName, movieId }); // debug logging
    if (movieId) { // if movieId exists
        // get reviews for that movieId using list
        const reviews = await service.list( movieId );
        // map through reviews and reorganize them with addCritic()
        const reviewsWithCriticObject = reviews.map(review => {
            // adds critic object and shuffles critic data into it
            return addCritic(review);
        });
        req.log.trace({ __filename, methodName, reviewsWithCriticObject }); // trace log
        // return all formatted review objects
        return res.json({ data: reviewsWithCriticObject });
    }
    // if no movieId param, get all reviews
    const reviews = await service.list("*")
    req.log.trace({ __filename, methodName, data }); // trace log
    // return those reviews
    res.json({ data: reviews });
}

// review update function
async function update(req, res) {
    const methodName = "update"; // for logging
    // declare client body data as data
    const { data } = req.body;
    req.log.debug({ __filename, methodName, data }); // debug logging
    // pass that data, the reviewId param, an updated at time, and possibly a created_at time
    // to the update function in reviews.service
    await service.update(data, res.locals.reviewId, res.locals.review.updated_at, res.locals.review.created_at);
    // get that review back from the database after update (sqlite3 cannot return data from update?)
    const updatedReview = await service.getReviewAndCritic(res.locals.reviewId);
    // pass that review to addCritic for formatting the critic object
    const organizedReview = addCritic(updatedReview)
    req.log.trace({ __filename, methodName, organizedReview });
    // return that data to the client
    res.status(201).json({ data: organizedReview });
}

// review deletion function
async function destroy(req, res) {
    const methodName = "destroy"; // for logging
    // invokes the service.destroy function passing res.locals.reviewId
    const deletedReview = await service.destroy(res.locals.reviewId);
    // returns that deleted review to the client
    req.log.trace({ __filename, methodName, deletedReview }); // trace log
    res.status(204).json({ data: deletedReview});
}

module.exports = {
    list: asyncErrorBoundary(list),
    update: [reviewExists, reviewHasCreatedDate, asyncErrorBoundary(update)],
    destroy: [reviewExists, asyncErrorBoundary(destroy)]
}