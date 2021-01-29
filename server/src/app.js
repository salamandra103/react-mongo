const path = require('path');

const createError = require('http-errors');
const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const logger = require('morgan');
const cors = require('cors')

const app = express();
const jsonParser = bodyParser.json();

const indexRouter = require('./routes/index');

const logStream = fs.createWriteStream('./access.log', {flags: 'a'})
app.use(express.static('public'))
app.use(logger('dev', { stream: logStream }));
app.use(logger('dev'));
app.use(jsonParser);
app.use(express.urlencoded({ extended: false }));
app.use(cors())

// Routers use
app.use('/api/', indexRouter);

// Catch 404
app.use(function(req, res, next) {
    next(createError(404));
});

module.exports = app;