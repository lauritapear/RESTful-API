var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var Vehicle = require('./app/models/vehicle');
//configure app for body-parser
//let us grab data from the body of POST
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

//set up port for server to listen on
var port = process.env.PORT || 3000;

//connect to DB
mongoose.connect('mongodb://localhost:27017/codealong');

//API Routes
var router = express.Router();

//Routes will be prefix with /API
app.use('/api', router);

//middleware can be useful for doing validations. we can log
//thing from here or stop the request from continuing in the
//event the request is not safe.
//middleware to use for all request
router.use(function(req,res,next){
  console.log('hit the middleware');
  next();
});

//test route
router.get('/', function(req,res){
  res.json({message: 'welcome to our API!'});
});

//vehicle router
router.route('/vehicles')
  .post(function(req,res){
    var vehicle = new Vehicle(); //new instance of a vehicle
    vehicle.make = req.body.make;
    vehicle.model = req.body.model;
    vehicle.color = req.body.color;

    vehicle.save(function(err){
      if (err){
        res.send(err);
      }
      res.json({message:'vehicle was created successfully'});
    });
  })

  .get (function(req,res){
    Vehicle.find(function(err,vehicles){
      if(err){
        res.send(err);
      }
      res.json(vehicles);
    });
  });

  //vehicle by id
  router.route('/vehicle/:vehicle_id')
    .get(function(req,res){
      Vehicle.findById(req.params.vehicle_id,function(err,vehicle){
        if(err){
          res.send(err);
        }
        res.json(vehicle);
      });
    });

  //vehicle by make
  router.route('/vehicle/make/:make')
    .get(function(req,res){
      Vehicle.find({make:req.params.make},function(err,vehicle){
        if(err){
          res.send(err);
        }
        res.json(vehicle);
      });
    });

//vehicle by color
router.route('/vehicle/color/:color')
  .get(function(req,res){
    Vehicle.find({color:req.params.color},function(err,vehicle){
      if(err){
        res.send(err);
      }
      res.json(vehicle);
    });
  });

//fire up server
app.listen(port);
//prind message
console.log('server listening on port'+ port);
