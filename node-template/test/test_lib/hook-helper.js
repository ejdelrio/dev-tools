'use strict';

const templates = require('./template.js');

const Profile = require('../../model/profile');
const User = require('../../model/user.js');

let helper = module.exports = {};

helper.users = {};
helper.tokens = {};
helper.profiles = {};
helper.models = {};

helper.url = `http://localhost:${process.env.PORT}/api`;

helper.createUser = templateName => {

  return new Promise((resolve, reject) => {
    let testUser = new User(templates[templateName]);
    testUser.encryptPassWord(testUser.passWord)
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

helper.createProfile = (profileName, userTemplateName) => {
  return new Promise((resolve, reject) => {
    let newProfile = new Profile(templates[profileName]);
    newProfile.userID = helper.users[userTemplateName]._id;
    newProfile.userName = helper.users[userTemplateName].userName;
    newProfile.save()
    .then(profile => {
      helper.profiles[userTemplateName] = profile;
      resolve(profile);
    })
    .catch(err => reject(err));
  });
};

helper.clearDB = () => {
  return Promise.all([
    User.remove({}),
    Profile.remove({})
  ])
  .then(() => {
    helper.users = {};
    helper.tokens = {};
    helper.models = {};
    helper.profiles = {};
  });
};
