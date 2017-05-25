var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');



var app = express();

app.set('views', path.join(__dirname, 'views')),
   .set('view engine', 'jade')

app.use(logger('dev'))
   .use(bodyParser.json())
   .use(bodyParser.urlencoded({ extended: false }))
   .use(cookieParser())
   .use(express.static(path.join(__dirname, 'public')))

   .use('/', require('./routes/index'))
   .use((req, res, next) => {
     var err = new Error('API or EndPoint Not Found')
     err.status = 404;
     next(err);
   })
    .use((err, req, res, next) => {
      res.locals = {
        message : err.message,
        error : req.app.get('env') === 'development' ? err : {},
      }
      res.status(err.status || 500)
      res.json({succes : false, error : err.status, msg : err.message})
    });

module.exports = app;
