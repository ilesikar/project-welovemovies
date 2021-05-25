
exports.up = function(knex) {
    // creates reviews table with "review_id", "content", score, "critic_id", "movie_id", "created_at", "update_at"
    return knex.schema.createTable("reviews", table => {
        table.increments("review_id").primary();
        table.text("content");
        table.integer("score");
        table.integer("critic_id").unsigned().notNullable();
        table
            .foreign("critic_id")
            .references("critic_id")
            .inTable("critics")
            .onDelete("CASCADE");
        table.integer("movie_id").unsigned().notNullable();
        table
            .foreign("movie_id")
            .references("movie_id")
            .inTable("movies")
            .onDelete("CASCADE");
        table.string("created_at");
        table.string("updated_at");
    });
};

exports.down = function(knex) {
    // removes reviews table
    return knex.schema.dropTable("reviews");
};
