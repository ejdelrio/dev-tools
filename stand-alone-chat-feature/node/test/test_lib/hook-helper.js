'use strict';

require('dotenv').config();
const templates = require('./template.js');
const User = require('../../model/user.js');
const debug = require('debug')(`${process.env.APP_NAME}: Hook Helper Test Module`);

let helper = module.exports = {};

helper.users = {};
helper.tokens = {};
helper.profiles = {};
helper.models = {};

helper.url = `http://localhost:${process.env.PORT}/api`;

helper.createUser = templateName => {
  debug('Create User');
  return new Promise((resolve, reject) => {
    let testUser = new User(templates[templateName]);
    testUser.encryptPassWord(testUser.passWord)
    .then(user => {
      console.log('__USER__', user);
      helper.users[templateName] = user;
      return user.signToken();
    })
    .then(token => {
      helper.tokens[templateName] = token;
      resolve(token);
    })
    .catch(err => reject(err));
  });
};

helper.createModel = (modelName, modelSchema, profileName) => {
  return new Promise((resolve, reject) => {
    let newModel = new modelSchema(templates[modelName]);
    newModel.profileID = helper.profiles[profileName]._id;
    newModel.save()
    .then(model => resolve(model))
    .catch(err => reject(err));
  });
};

helper.createProfile = (profileName, userTemplateName) => {
  return new Promise((resolve, reject) => {

  });
};

helper.clearDB = () => {
  return Promise.all([
    User.remove({}),
  ])
  .then(() => {
    helper.users = {};
    helper.tokens = {};
    helper.models = {};
    helper.profiles = {};
  });
};
