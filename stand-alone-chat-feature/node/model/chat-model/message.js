'use strict';

require('dotenv').config();
const debug = require('debug')(`${process.env.APP_NAME}: Message Model`);
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const messageSchema = new Schema({
  author: {type: String, required: true},
  content: {type: String, required: true},
  dateSend: {type: Date, default: Date.now},
  convoID: {type: Schema.Types.ObjectId, required: true, ref: 'convoHub'},
  seenBy: [{type: String}]
});

const Message = module.exports = mongoose.model('message', messageSchema);
