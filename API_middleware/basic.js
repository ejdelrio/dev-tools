'use strict';

const createError = require('http-errors');
const debug = require('debug')(`${process.env}: Basic Auth Middleware`);

const basicAuth = module.exports = function(req, res, next) {
  debug('Basic Auth');

  if(!req.headers) return next(createError(400, 'Header Required'));
  if(!req.headers.authorization) return next(createError(400, 'Aythorization header required'));

  let auth = req.headers.authorization.split(' ')[1];
  if(!auth) return next(createError(400, 'Username and Password required :D'));

  let decodedAuth = new Buffer(auth, 'base64').toString();
  let credentials = decodedAuth.split(':');

  req.auth = {
    userName: credentials[0],
    passWord: credentials[1]
  };
  if(!req.auth.userName) return next(createError(400, 'Username Required'));
  if(!req.auth.passWord) return next(createError(400, 'Passwod Required'));
  next();
};
