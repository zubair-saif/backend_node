const env = require('dotenv').config();
const express = require("express");
const app = express();
const morgan = require("morgan");
const moment = require("moment");
const http = require('http');
const server = http.createServer(app);
var createError = require('http-errors');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var expressValidator = require('express-validator');
var flash = require('express-flash');
var session = require('express-session');
var bodyParser = require('body-parser');
var mysql = require('mysql');
var connection  = require('./lib/db');
//edited


// Required Routes
const userRoutes = require('./Routes/userRoute');



// Middlewares
app.use(morgan("dev"));
app.use('/Uploads', express.static('Uploads'));
app.use('/Assets', express.static('Assets'));
// app.use(bodyParser.urlencoded({extended: false}));
// app.use(bodyParser.json());
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept, Authorization, Content-Type, Signature"
    );

    if (req.method === "OPTIONS") {
        res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
        return res.status(200).json({});
    }
    next();
});


// view engine setup
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'ejs');
 
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
 
// app.use(expressValidator());
 

app.use("/user", userRoutes);


// Default Route When nothing matches
app.use((req, res, next) => {
    const error = new Error("Not found :o :o");
    error.status = 404;
    next(error);
});

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    });
});

server.listen(4000);
console.log("Serving on port 4000");
module.exports = app;



 

 