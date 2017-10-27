import mongoosee from 'mongoose';
import {Router} from 'express';
import FoodTruck from '../model/foodtruck';

export default ({config, db}) => {
  let api = Router();

  // '/v1/foodtruck/add' -- Create
  api.post('/add', (req, res) => {
    let newFoodTruck = new foodtruck();
    newFoodTruck.name = req.body.name;

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
  foodtruck.find({}, (err,foodtrucks) => {
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

  return api;
}
