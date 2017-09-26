'use strict';

const createError = require('http-errors');
const debug = require('debug')(`${process.env}: Basic Auth Middleware`);

const basicAuth = module.exports = function(req, res, next) {
  debug('Basic Auth');

  if(!req.header) return next(createError(400, 'Header Required'));
  console.log('REQUEST_HEADER:::::', req.header)

};
