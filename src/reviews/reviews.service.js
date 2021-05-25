const knex = require("../db/connection");

// returns all reviews w/ critics data where movie_id = input
function list(movieId) {
    return knex("reviews as r")
        .join("critics as c", "r.critic_id", "c.critic_id")
        .select("*")
        .where("movie_id", movieId)
}

// returns first review where review_id = input
function getReview(reviewId) {
    return knex("reviews")
        .select("*")
        .where("review_id", reviewId)
        .first()
}

// returns first review w/ critics where review_id = input
function getReviewAndCritic(reviewId) {
    return knex("reviews as r")
        .select("*")
        .join("critics as c", "r.critic_id", "c.critic_id")
        .where("review_id", reviewId)
        .first()
}

// updates review content, score, updated_at, and created_at fields
function update(review, id, createdAt, updatedAt) {
    return knex("reviews as r")
        .select("*")
        .where("r.review_id", id)
        .update({
            content: review.content,
            score: review.score,
            updated_at: updatedAt,
            created_at: createdAt
        }); // cant return data via .update (sqlite error)
        // .returning doesn't work (sqlite error)
}   

// deletes and returns review matching id
function destroy(id) {
    return knex("reviews as r")
        .where("review_id", id)
        .del();
}

module.exports = {
    list,
    getReview,
    update,
    destroy,
    getReviewAndCritic
}