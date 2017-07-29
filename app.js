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
Park_Model = db.model('Park');
Review_Model = db.model('Review');
User_Model = db.model('User');


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


/////Routes for dogssss/////////////////////////////////
////////////////////////////////////////////////////////
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


      Dog_Model.findById( id , function(err, dog){
        if(err){res.send(err);}

        res.json(dog);

      });


    })
    //update the doggo with new info
    .put(function(req, res){
        // use our dog model to find the dog we want
        //lets convert into an object id
        var ObjectId = mongoose.Types.ObjectId;
        var id = new ObjectId(req.params.dog_id.toString());


        Dog_Model.findById( id , function(err, dog){
            if(err){res.send(err);}

            if(req.body.name!==undefined){
                dog.name = req.body.name;
                console.log("updated name")
            }

            else if(req.body.picture!==undefined){
                dog.picture = req.body.picture;
                console.log("updated picture")
            }

            else if(req.body.description!==undefined){
                dog.description = req.body.description;
                console.log("updated description")
            }

            else if(req.body.breed!==undefined){
                dog.breed = req.body.breed;
                console.log("updated breed")
            }

            // save the dog
            dog.save(function(err) {
                if (err)
                    res.send(err);

                res.json(dog);
            });


        });

    });

router.route('/dogs/:dog_id/befriend/:friend_id')
    //adding a friend to a dogs friend list
    .put(function(req, res){
        // use our dog model to find the dog we want
        //lets convert into an object id
        var ObjectId = mongoose.Types.ObjectId;
        var id = new ObjectId(req.params.dog_id.toString());


        Dog_Model.findById( id , function(err, dog){

            dog.friends.push(req.params.friend_id.toString());

            // save the dog
            dog.save(function(err) {
                if (err)
                    res.send(err);

                res.json(dog);
            });
        })

    });

router.route('/dogs/:dog_id/addattr/:_attr')
//adding a friend to a dogs friend list
    .put(function(req, res){
        // use our dog model to find the dog we want
        //lets convert into an object id
        var ObjectId = mongoose.Types.ObjectId;
        var id = new ObjectId(req.params.dog_id.toString());


        Dog_Model.findById( id , function(err, dog){

            dog.friends.push(req.params._attr.toString());

            // save the dog
            dog.save(function(err) {
                if (err)
                    res.send(err);

                res.json(dog);
            });
        })

    });
////////////////////////////////end of dog routes///////////////////////////////////////////

//////////////////////////////////PARKS routes//////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////
router.route('/park')
//adding a friend to a dogs friend list
    .post(function(req, res){
        var park = new Park(); // create the instance of the dog model

        park.name = req.body.name;
        park.suburb = req.body.suburb;
        park.leash_status = req.body.leash_status;
        park.leash_times = req.body.leash_times;
        park.road_side = req.body.road_side;

        //save the dog and check for errors
        park.save( function(err) {
            if(err){
                res.send(err);//send error
            }
            //send successful response
            res.json({message: 'Park created!'});
        });
    })

    .get(function(req, res){
        Park.find(function(err, parks){
            if(err)res.send(err);

            res.json(parks);
        });
    });


//for park routes involving updating a single entry
router.route('/parks/:park_id')
    .get( function(req, res){

        //lets convert into an object id
        var ObjectId = mongoose.Types.ObjectId;
        var id = new ObjectId(req.params.park_id.toString());


        Park_Model.findById( id , function(err, park){
            if(err){res.send(err);}

            res.json(park);

        });


    })
    //update the park with new info
    .put(function(req, res){
        // use our park model to find the park we want
        //lets convert into an object id
        var ObjectId = mongoose.Types.ObjectId;
        var id = new ObjectId(req.params.park_id.toString());


        Park_Model.findById( id , function(err, dog){
            if(err){res.send(err);}

            if(req.body.name!==undefined){
                park.name = req.body.name;
                console.log("updated name")
            }

            else if(req.body.suburb!==undefined){
                park.suburb = req.body.suburb;
                console.log("updated picture")
            }

            else if(req.body.leash_status!==undefined){
                park.leash_status = req.body.leash_status;
                console.log("updated description")
            }


            else if(req.body.leash_times!==undefined){
                park.leash_times = req.body.leash_times;
                console.log("updated breed")
            }

            else if(req.body.road_side!==undefined){
                park.road_side = req.body.road_side;
                console.log("updated breed")
            }

            // save the dog
            dog.save(function(err) {
                if (err)
                    res.send(err);

                res.json(park);
            });


        });

    });


/*name: String,
        suburb: String,
        leash_status: String,
        dogs_there: [String],
        leash_times: String,
        road_side: Boolean*/

router.route('/parks/:park_id/checkin/:dog_id')
//adding a friend to a dogs friend list
    .put(function(req, res){
        // use our dog model to find the dog we want
        //lets convert into an object id
        var ObjectId = mongoose.Types.ObjectId;
        var id = new ObjectId(req.params.park_id.toString());


        Dog_Model.findById( id , function(err, park){

            park.dogs_there.push(req.params.dog_id.toString());

            // save the dog
            park.save(function(err) {
                if (err)
                    res.send(err);

                res.json(park);
            });
        })

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
