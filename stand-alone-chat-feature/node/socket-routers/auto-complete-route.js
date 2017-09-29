'use strict';

const debug = require('debug')(`${process.env.APP_NAME}: Auto Complete Socket Route`);
const createError = require('http-errors');

const Profile = require('../model/profile.js');


module.exports = (userSocket) => {

  userSocket.on('sendMemberQuery', query => {
    debug('sendMemberQuery Socket Event');

    Profile.find({userName: {'$regex': query, '$options': 'i'}})
    .then(results => {
      console.log('__RESULTS__:', results);
      userSocket.emit('recieveMemberQuery', results);
    })
    .catch(err => createError(400, err));
  });
};
