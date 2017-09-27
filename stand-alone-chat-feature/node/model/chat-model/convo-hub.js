'use strict';

require('dotenv').config();
const debug = require('debug')(`${process.env.APP_NAME}: Convo Hub Model`);
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const convoHubSchema = new Schema({
  members: [{type: Schema.Types.ObjectId, ref: 'profile', required: true}],
  messages: [{type: Schema.Types.ObjectId, ref: 'message'}],
  nodes: [{type: Schema.Types.ObjectId, ref: 'convoNode'}]
});

const convoHub = module.exports = mongoose.model('convoHub', convoHubSchema);
