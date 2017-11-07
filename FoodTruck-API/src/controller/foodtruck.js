import mongoosee from 'mongoose';
import {Router} from 'express';
import FoodTruck from '../model/foodtruck';
import Review from '../model/review';
import bodyParser from 'body-parser';

export default ({config, db}) => {
  let api = Router();

  // '/v1/foodtruck/add' -- Create
  api.post('/add', (req, res) => {
    let newFoodTruck = new FoodTruck();
    newFoodTruck.name = req.body.name;
    newFoodTruck.foodtype = req.body.foodtype;
    newFoodTruck.avgcost = req.body.avgcost;
    newFoodTruck.geometry.coordinates = req.body.geometry.coordinates;

    //=> this is called fat arrow function
    newFoodTruck.save(err =>{
      if(err){
        res.send(err);
      }
      res.json({message: 'foodtruck Saved sucessfully'});
    });
  });

//'/v1/foodtruck' -- Read
api.get('/',(req,res) => {
  FoodTruck.find({}, (err,foodtrucks) => {
    if(err){
      res.send(err);
    }
    res.json(foodtrucks);
  });
});

//'/v1/foodtruck/:id' -- Read
api.get('/:id',(req,res) => {
  FoodTruck.findById(req.params.id, (err,foodtruck) => {
    if(err){
      res.send(err);
    }
    res.json(foodtruck);
  });
});

//'/v1/foodtruck/:id' -- Update
api.put('/:id',(req,res) => {
  FoodTruck.findById(req.params.id, (err,foodtruck) => {
    if(err){
      res.send(err);
    }
    foodtruck.name = req.body.name;
    foodtruck.save (err =>{
      if(err){
        res.send(err);
      }
      res.json({ message: "FoodTruck info Updated"});
    });
  });
});

//'/v1/foodtruck/:id' -- Delete
api.delete('/:id',(req,res) => {
  FoodTruck.remove({
    _id: req.params.id
  }, (err, foodtruck) => {
    if(err){
      res.send(err);
    }
      res.json({ message: "FoodTruck was deleted"});
  });
});

//Add review for foodtruck ID
//'/v1/foodtruck/reviews/add/:id'
api.post('/reviews/add/:id', (req, res) => {
  FoodTruck.findById(req.params.id, (err,foodtruck) => {
    if(err){
      res.send(err);
    }
    let newReview = new Review();

    newReview.title = req.body.title;
    newReview.text = req.body.text;
    newReview.foodtruck = foodtruck._id;

    //since mongo db is not relational then we need to save it in both foodtruck and reviews
    newReview.save ((err,review) =>{
      if(err){
        res.send(err);
      }
      foodtruck.reviews.push(newReview);
      foodtruck.save(err =>{
        if(err){
          res.send(err);
        }
        res.json({ message: 'FoodTruck review added'});
      });
    });
  });
});

// get reviews for a specific foodtruck id
// '/v1/foodtruck/reviews/:id'
api.get('/reviews/:id', (req, res) => {
  Review.find({foodtruck: req.params.id}, (err, reviews) => {
    if (err) {
      res.send(err);
    }
    res.json(reviews);
  });
});

  return api;
}
