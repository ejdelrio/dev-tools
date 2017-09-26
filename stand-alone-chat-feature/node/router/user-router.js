'use strict';

const Router = require('express').Router;
const debug = require('debug')(`${process.env.APP_NAME}: User Router`);
const createError = require('http-errors');
const jsonParser = require('body-parser').json();

const User = require('../model/user.js');
const basicAuth = require('../lib/basic.js');

const userRouter = module.exports = new Router();

userRouter.post('/api/signup', jsonParser, function(req, res, next) {
  debug('POST /api/signup');

  if(!req.body.userName) return next(createError(400, 'Username required'));
  if(!req.body.passWord) return next(createError(400, 'Password required'));

  let passWord = req.body.passWord;
  delete req.body.passWord;

  let newUser = new User(req.body);
  newUser.encryptPassWord(passWord)
  .then(user => user.signToken())
  .then(token => {
    res.json(token);
  })
  .catch(err => next(createError(400, err.message)));

});

userRouter.get('/api/login', basicAuth, function(req, res, next) {
  debug('GET /api/login');

  let passWord = req.auth.passWord;
  delete req.auth.passWord;

  User.findOne(req.auth)
  .then(user => user.comparePassWord(passWord))
  .then(user => user.signToken())
  .then(token => res.json(token))
  .catch(err => next(createError(401, err.message)));
});
