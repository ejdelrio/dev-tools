'use strict';

require('dotenv').config();
const mongoose = require('mongoose');
const debug = require('debug')(`${process.env.APP_NAME}: Profile Model`);
const Schema = mongoose.Schema;

const profileSchema = new Schema({
  userID: {type: Schema.Types.ObjectId, required: true, unique: true},
  age: {type: Number},
  convos: [{type: Schema.Types.ObjectId, ref: 'convoNode'}],
});

const Profile = module.exports = mongoose.model('profile', profileSchema);
