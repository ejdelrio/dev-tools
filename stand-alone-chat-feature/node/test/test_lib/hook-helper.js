'use strict';

const templates = require('./template.js');
const User = require('../../model/user.js');

let helper = module.exports = {};

helper.users = {};
helper.tokens = {};
helper.profiles = {};
helper.models = {};

helper.createUser = templateName => {
  return new Promise((resolve, reject) => {
    let testUser = new User(templates[templateName]);
    testUser.encryptPassWord()
    .then(user => {
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

helper.clearDB = () => {
  return new Promise.all([
    User.remove({})
  ]);
};
