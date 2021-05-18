if (process.env.USER) require("dotenv").config();
const errorHandler = require("./errors/errorHandler");
const notFound = require("./errors/notFound");
const moviesRouter = require("./movies/movies.router.js");

const logger = require("./config/logger");
const express = require("express");
const cors = require("cors");

const app = express();

app.use(logger);
app.use(cors());
app.use(express.json());

app.use("/movies", moviesRouter);

app.use(notFound);
app.use(errorHandler);


module.exports = app;
