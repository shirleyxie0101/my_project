const express = require("express");
const path = require("path");
const mongoose = require('mongoose');
const formidableMiddleware = require("express-formidable");
const config = require('./config/database');

/** Connect to DB */
mongoose.connect(config.database, {
    useUnifiedTopology: true,
    useNewUrlParser: true
});
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error"));
db.once("open", () => console.log("Connected to MongoDB"));

/** Init app */
const app = express();

/** Formidable middleware */
app.use(formidableMiddleware());