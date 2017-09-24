'use strict';

const Router = require('express').Router;
const debug = require('debug')(`${process.env.APP_NAME}: User Router`);
const jsonParser = require('body-parser').json();

const basicAuth = require('../lib/basic,js');
const bearerAuth = require('../lib/bearer.js');
const User = require('../model/user.js');

const userRouter = new Router();

userRouter.post('/api/sigunp', jsonParser, function(req, res, next) {
  debug('POST /api/signup');

});

userRouter.get('/api/login', basicAuth, function(req, res, nex) {
  debug('GET /api/login');
});
