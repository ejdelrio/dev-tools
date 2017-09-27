'use strict';

require('dotenv').config();
const debug = require('debug')(`${process.env.APP_NAME}: Convo Node Model`);
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const convoNodeSchema = new Schema({
  convoID: {type: Schema.Types.ObjectId, ref: 'convoHub', required: true},
  messages: [{type: Schema.Types.ObjectId, ref: 'message'}],
  unread: {type: Number, default: 0},
  profileID: {type: Schema.Types.ObjectId, ref: 'profile', required: true}
});

const convoNode = module.exports = mongoose.model('convoNode', convoNodeSchema);
