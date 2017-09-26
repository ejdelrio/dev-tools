'use strict';

const chai = require('chai').expect;
const request = require('superagent');


const Profile = require('../model/profile.js');
const templates = require('./test-lib/template.js');
const {url, createUser, createProfile, clearDB, users, profiles, tokens} = require('./test-lib/hook-helper.js');

require('../server.js');

describe('Profile Router Test', () => {
  before(done => {
    createUser('userOne')
    .then(() => done())
    .catch(err => done(err));
  });

  after(done => {
    clearDB
    .then(() => done())
    .catch(err => done(err));
  });

  describe('POST /api/profile', () => {
    describe('With valid credentials and a valid request body', () => {
      after(done => {
        Profile.remove({})
        .then(() => done())
        .catch(err => done(err));
      });

      it('Should return a 200 code with a profile as the res.body', done => {
        request.post(`${url}/profile`)
        .set('Authorization', `Bearer ${tokens.userOne}`)
        .send(templates['profileOne'])
        .end((err, res) => {
          if(err) done(err);
          expect(res.status).to.equal(200);
          expect(res.body.userName).to.equal(users.userOne.userName);
          expect(res.body.userID).to.equal(users.userOne._id.toString());
          expect(res.body.age).to.equal(templates['profileOne'].age);
          done();
        });
      });
    });

    describe('With an invalid request body', () => {
      it('Should return a 400 err code', done => {
        request.post(`${url}/profile`)
        .set('Authorization', `Bearer ${tokens.userOne}`)
        .send({})
        .end(err => {
          expect(err.status).to.equal(400);
          done();
        });
      });
    });

    describe('With invalid authorization', () => {
      it('Should return a 401 err status', done => {
        request.post(`${url}/profile`)
        .set('Authorizaion', 'Bearer test')
        .send(templates['profileOne'])
        .end(err => {
          expect(err.status).to.equal(401);
          done();
        });
      });
    });
  });
});
