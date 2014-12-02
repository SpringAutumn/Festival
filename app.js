var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var routes = require('./routes/index');
var users = require('./routes/users');

var app = express();

// Database configurations
// Database
var connect = function () {
    var options = {
        server: {
            socketOptions: {
                keepAlive: 1
            }
        },
        auto_reconnect: true
    };
    mongoose.connect('mongodb://127.0.0.1/festival', options)
};

// Error handler
mongoose.connection.on('error', function (err) {
    console.error(
        '✗ MongoDB Connection Error. Please make sure MongoDB is running. -> ' +
        err);
});

// Reconnect when closed, BAE required
mongoose.connection.on('disconnected', function () {
    console.error('✗ MongoDB Disconnected');
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/users', users);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function (err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});

app.set('port', process.env.PORT || 3000);

connect();

var server = app.listen(app.get('port'), function () {
    console.log('Express server listening on port ' + server.address().port);
});


module.exports = app;
module.exports.connect_mongo = connect;
