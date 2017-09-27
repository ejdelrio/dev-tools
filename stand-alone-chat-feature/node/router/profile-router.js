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

profileRouter.post('/api/profile', bearerAuth, jsonParser, function(req, res, next) {
  debug('POST /api/profile');

  if(!req.body) return next(createError(400, 'Request Body Required'));

  const newPro = new Profile(req.body);
  newPro.userID = req.user._id;
  newPro.userName = req.user.userName;

  newPro.save()
  .then(profile => res.json(profile))
  .catch(err => next(createError(400, err)));
});

profileRouter.put('/api/profile', bearerAuth, jsonParser, function(req, res, next) {
  debug('PUT /api/profile');

  Profile.findOneAndUpdate(
    {userID: req.user._id},
    req.body,
    {new: true}
  )
  .then(profile => res.json(profile))
  .catch(err => next(createError(400, err)));

});

profileRouter.get('/api/profile', bearerAuth, profileFetch, function(req, res, next) {
  debug('GET /api/profile');

  res.json(req.profile);
  next();
});
