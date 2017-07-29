var express = require('express');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

//connecting to mongo
var mongodb = require('mongodb');
var mongoose = require('mongoose');
var db = mongoose.connect('mongodb://localhost:27017'); //connect to out db

//pulling in our schemas
var Dog = require('./schemas/dog');
var Park = require('./schemas/park');
var Review = require('./schemas/review');
var User = require('./schemas/user');

//link to models in db of each object
Dog_Model =  db.model('Dog');


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//ROUTES FOR OUR API//
//////////////////////
var router = express.Router();


//middleware functions for our api
router.use(function(req, res, next) {
    // do logging
    console.log('Something is happening.');
    next(); // make sure we go to the next routes and don't stop here
});

router.route('/dogs')
    //create a dog
    .post( function(req, res){

      var dog = new Dog(); // create the instance of the dog model

      dog.name = req.body.name;
      dog.picture = req.body.picture;
      dog.description = req.body.description;
      dog.breed = req.body.breed;

      //save the dog and check for errors
      dog.save( function(err) {
        if(err){
          res.send(err);//send error
        }
        //send successful response
        res.json({message: 'Bear created!'});
      });

    })

    .get( function(req, res){

        Dog.find(function(err, dogs){
          if(err)res.send(err);

          res.json(dogs);
        });

    });

//for dog routes ending in dog_id
router.route('/dogs/:dog_id')
    .get( function(req, res){
      //console.log('Something is happening in side find single dog by the _id: ' + req.params.dog_id);

      //lets convert into an object id
        var ObjectId = mongoose.Types.ObjectId;
        var id = new ObjectId(req.params.dog_id.toString());


        console.log(id);

      Dog_Model.findById( id , function(err, dog){
        if(err){res.send(err);}

        res.json(dog);

      });


    });

// test route to make sure everything is working (accessed at GET http://localhost:3000/api)
router.get('/', function(req, res) {
    res.json({ message: 'hooray! welcome to our api!' });
});

//app.use('/', index);
app.use('/api', router);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
