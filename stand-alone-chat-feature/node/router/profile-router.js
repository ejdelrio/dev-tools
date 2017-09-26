'use strict';

require('dotenv').config();
const Router = require('express').Router;
const debug = require('debug')(`${process.env.APP_NAME}: Profile Router`);
const jsonParser = require('body-parser').json();
const createError = require('http-errors');

const bearerAuth = require('../lib/bearer.js');
const profileFetch = require('../lib/profile-fetch.js');

const Profile = require('../model/profile.js');

const profileRouter = module.exports = new Router();

profileRouter.post('/api/profile', jsonParser, bearerAuth, function(req, res, next) {
  debug('POST /api/profile');

  const newPro = new Profile(req.body);
  newPro.userID = req.user._id;

  newPro.save()
  .then(profile => res.json(profile))
  .catch(err => next(createError(400, err)));
});
