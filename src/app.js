if (process.env.USER) require("dotenv").config();
const errorHandler = require("./errors/errorHandler");
const notFound = require("./errors/notFound");
const moviesRouter = require("./movies/movies.router.js");
const theatersRouter = require("./theaters/theaters.router.js");
const reviewsRouter = require("./reviews/reviews.router.js");

const logger = require("./config/logger");
const express = require("express");
const cors = require("cors");

const app = express();

app.use(logger); // for logging
app.use(cors()); // allow all methods for outside requests
app.use(express.json());

app.use("/movies", moviesRouter);
app.use("/theaters", theatersRouter);
app.use("/reviews", reviewsRouter);

app.use(notFound);
app.use(errorHandler);


module.exports = app;
