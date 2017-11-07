import mongoose from 'mongoose';
const Schema = mongoose.Schema;
import PassportLocalMongoose from 'passport-local-mongoose';

let Account = new Schema({
  email: String,
  password: String
});

Account.plugin(PassportLocalMongoose);
module.exports = mongoose.model('Account', Account);
