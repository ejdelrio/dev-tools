'use strict';

const createError = require('http-errors');
const Profile = require('../model/profile.js');

module.exports = function(req, res, next) {

  if(!req.user) return next(createError(400, 'User Model Required with Request'));

  Profile.findOne({userID: req.user._id})
  .then(profile => {
    req.profile = profile;
    next();
  })
  .catch(err => next(err));
};
