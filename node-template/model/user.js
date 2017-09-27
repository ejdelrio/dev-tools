'use strict';

require('dotenv').config();
const debug = require('debug')(`${process.env.APP_NAME}: User Model`);
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const createError = require('http-errors');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  userName: {type: String, required: true, unique: true},
  passWord: {type: String, required: true},
  email: {type: String, required: true, unique: true},
  hash: {type: String, required: true, unique: true}
});

userSchema.methods.encryptPassWord = function(passWord) {
  debug('encryptPassWord method');

  return new Promise((resolve, reject) => {
    bcrypt.hash(passWord, 10, (err, hash) => {
      if(err) reject(err);
      this.passWord = hash;
      resolve(this);
    });
  });
};

userSchema.methods.comparePassWord = function(passWord) {
  debug('comparePassWord method');

  return new Promise ((resolve, reject) => {
    bcrypt.compare(passWord, this.passWord, (err, valid) => {
      if(err) return reject(err);
      if(!valid) return reject(createError(401, 'Access Denied'));
      resolve(this);
    });
  });
};


userSchema.methods.generateToken = function () {
  debug('generateToken method');

  return new Promise((resolve, reject) => {
    let tries = 0;

    _generateHash.call(this);

    function _generateHash() {
      this.hash = crypto.randomBytes(32).toString('hex');

      this.save()
      .then(() => resolve(this.hash))
      .catch(err => {
        if (tries > 3) return reject(err);
        tries++;
        return _generateHash.call(this);
      });
    }
  });
};

userSchema.methods.signToken = function () {
  debug('signToken method');

  return new Promise((resolve, reject) => {
    this.generateToken()
    .then(hash => resolve(jwt.sign({token: hash}, process.env.APP_SECRET)))
    .catch( err => reject(err));
  });
};

const User = module.exports = mongoose.model('user', userSchema);
