'use strict';

require('dotenv').config();
const debug = require('debug')(`${process.env.APP_NAME}: Bearer Auth Middleware`);
const jwt = require('jsonwebtoken');
const createError = require('http-errors');

const User = require('../model/user.js');

module.exports = function(req, res, next) {
  debug('Bearer Auth Middleware');

  if(!req.headers) return next(createError(400, 'Header Required'));
  if(!req.headers.authorization) return next(createError(400, 'Authorization Header Required'));

  
};
