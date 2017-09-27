'use strict';

const expect = require('chai').expect;
const request = require('superagent');


const Profile = require('../model/profile.js');
const templates = require('./test_lib/template.js');
const hook = require('./test_lib/hook-helper.js');
const {url,
  createUser,
  createProfile,
  clearDB, users,
  profiles, tokens} = hook;

require('../server.js');

describe('Profile Router Test', () => {
  before(done => {
    createUser('userOne')
    .then(() => done())
    .catch(err => done(err));
  });

  after(done => {
    clearDB()
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
        .send({test: 'test'})
        .end(err => {
          expect(err.status).to.equal(400);
          done();
        });
      });
    });

    describe('With invalid authorization', () => {
      it('Should return a 401 err status', done => {
        request.post(`${url}/profile`)
        .set('Authorization', 'Bearer 12345678')
        .send(templates['profileOne'])
        .end(err => {
          expect(err.status).to.equal(401);
          done();
        });
      });
    });
  });

  describe('PUT /api/profile', () => {
    before(done => {
      createProfile('profileOne', 'userOne')
      .then(() => done())
      .catch(err => done(err));
    });

    after(done => {
      Profile.remove({})
      .then(() => done())
      .catch(err => done(err));
    });

    describe('With a valid req.body and authorization', () => {
      it('Should return a response body and a 200 status code', done => {
        request.put(`${url}/profile`)
        .send({age: 30})
        .set('Authorization', `Bearer ${tokens.userOne}`)
        .end((err, res) => {
          if(err) return done(err);
          expect(res.status).to.equal(200);
          expect(res.body.age).to.equal(30);
          expect(res.body._id.toString())
          .to.equal(profiles.userOne._id.toString());
          expect(res.body.userName).to.equal(users.userOne.userName);
          done();
        });
      });
    });
  });
  describe('With an invalid req.body and valid authorization', () => {
    it('Should return a 400 error code', done => {
      request.put(`${url}/profile`)
      .send({age: 'test'})
      .set('Authorization', `Bearer ${tokens.userOne}`)
      .end((err) => {
        expect(err.status).to.equal(400);
        done();
      });
    });
  });
  describe('With an invalid req.body and valid authorization', () => {
    it('Should return a 400 error code', done => {
      request.put(`${url}/profile`)
      .send({age: 30})
      .set('Authorization', 'Bearer invalid')
      .end((err) => {
        expect(err.status).to.equal(401);
        done();
      });
    });
  });
  describe('GET /api/profile', () => {
    before(done => {
      createProfile('profileOne', 'userOne')
      .then(() => done())
      .catch(err => done(err));
    });

    after(done => {
      Profile.remove({})
      .then(() => done())
      .catch(err => done(err));
    });

    describe('With valid authorization', () => {
      it('Should return a 200 status code and a response body', done => {
        request.get(`${url}/profile`)
        .set('Authorization', `Bearer ${tokens.userOne}`)
        .end((err, res) => {
          if(err) return done(err);
          expect(res.status).to.equal(200);
          expect(res.body.userName).to.equal(users.userOne.userName);
          expect(res.body.userID.toString()).to.equal(users.userOne._id.toString());
          expect(res.body._id.toString()).to.equal(profiles.userOne._id.toString());
          done();
        });
      });
    });
    describe('With invalid authorization', () => {
      it('Should return a 401 error code', done => {
        request.get(`${url}/profile`)
        .set('Authorization', 'Bearer test')
        .end(err => {
          expect(err.status).to.equal(401);
          done();
        });
      });
    });
  });
});
