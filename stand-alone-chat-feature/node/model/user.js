'use strict';

const mongoose = require('mongoose');
const debug = require('debug')(`${process.env.APP_NAME}: User Model`);
const Schema = mongoose.Schema;

const userSchema = new Schema({
  userName: {type: String, required: true, unique: true},
  passWord: {type: String, required: true},
  email: {type: String, required: true, unique: true},
  hash: {type: String, required: true}
});

const User = mongoose.model('user', userSchema);
