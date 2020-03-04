const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// create schema
const userSchema = new Schema({
  name: {
    type: String,
    required:true
  },
  email: {
    type: String,
    required:true
  },
  password: {
    type: String,
    required:true
  },
  avatar: {
    type: String,
    required:false //by default it's false
  },
  date: {
    type: date,
    default: Date.now
  }

  
});

module.exports = UserModel = mongoose.model('users', userSchema);