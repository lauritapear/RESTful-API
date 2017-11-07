import mongoose from 'mongoose';
const Schema = mongoose.Schema;
import PassportLocalMongoose from 'passport-local-mongoose';
let ccount = new

let Account = new Schema({
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  }
});

Account.plugin(PassportLocalMongoose);
module.exports = mongoose.model('Account', Account);
