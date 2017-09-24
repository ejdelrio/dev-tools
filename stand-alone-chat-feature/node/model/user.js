'use strict';

const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const debug = require('debug')(`${process.env.APP_NAME}: User Model`);
const Schema = mongoose.Schema;

const userSchema = new Schema({
  userName: {type: String, required: true, unique: true},
  passWord: {type: String, required: true},
  email: {type: String, required: true, unique: true},
  hash: {type: String, required: true}
});

const User = mongoose.model('user', userSchema);

userSchema.methods.encryptPassWord = () => {
  debug('encryptPassWord method');

  return new Promise((resolve, reject) => {
    bcrypt.hash(this.passWord, 10, (err, hash) => {
      if(err) reject(err);
      this.passWord = hash;
      resolve(this);
    });
  });
};

userSchema.generateToken = () => {
  debug('generateToken method');

  return new Promise((resolve, reject) => {
    let tries = 0;

    _generateHash.call(this);
    
    function _generateHash() {
      this.hash = crypto.randomBytes(32).toString('hex');
      this.save()
      .then(() => resolve(this.hash))
      .catch(err => {
        if(tries > 3) return reject(err);
        tries++;
        return _generateHash.call(this);
      });
    }
  });
};
