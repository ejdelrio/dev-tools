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

  let auth = req.headers.authorization;
  let cryptoToken = auth.split('Bearer ')[1];

  if(!cryptoToken) return next(createError(400, 'Token Required!'));

  jwt.verify(cryptoToken, process.env.APP_SECRET, (err, decoded) => {
    if(err) return next(createError(401, err));

    User.findOne({hash: decoded.token})
    .then(user => {
      req.user = user;
      next();
    })
    .catch(err => next(createError(401, err)));
  });

};
