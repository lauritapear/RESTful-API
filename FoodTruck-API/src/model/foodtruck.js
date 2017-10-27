import mongoose from 'mongoose';
import Review from './reviews';
let Schema = mongoose.Schema;

let foodtruckSchema = new Schema({
  name: {
    type: String,
    require: true
  },
  foodtype: {
    type: String,
    require: true
  },
  avgcost: Number,
  geometry: {
    type: {type: String, default: 'Point'},
    coordinates:[Number]
  },
  reviews: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Review'
    }
  ]
});

module.exports = mongoose.model('FoodTruck', foodtruckSchema);
