'use strict';

const request = require('superagent');
const expect = require('chai').expect;

const {userOne} = require('./test_lib/template.js');
const {createUser, createModel, url, clearDB} = require('./test_lib/hook-helper.js');
const User = require('../model/user.js');

require('../server.js');

describe('User Route Tests', () => {

  after(done => {
    clearDB()
    .then(() => done())
    .catch(err => done(err));
  });

  describe('POST /api/signup', () => {
    describe('With a valid req.body', () => {

      after(done => {
        clearDB()
        .then(() => done())
        .catch(err => done(err));
      });

      it('Should return a valid response body containing a token', done => {
        request.post(`${url}/signup`)
        .send(userOne)
        .end((err, res) => {
          if(err) return done(err);
          expect(res.status).to.equal(200);
          done();
        });
      });
    });

    describe('With an invalid request body', () => {
      it('It should return a 400 error status', done => {
        request.post(`${url}/signup`)
        .send({invalud: 'invalid'})
        .end(err => {
          expect(err.status).to.equal(400);
          done();
        });
      });
    });

    describe('With no request body', () => {
      it('It should return a 400 error status', done => {
        request.post(`${url}/signup`)
        .end(err => {
          expect(err.status).to.equal(400);
          done();
        });
      });
    });
  });

  describe('GET /api/login', () => {
    before(done => {
      createUser('userOne')
      .then(() => done())
      .catch(err => done(err));
    });

    describe('With valid credentials and a valid header', () => {

      it('Should return a token and a 200 status code', done => {
        let {userName, passWord} = userOne;
        request.get(`${url}/login`)
        .auth(userName, passWord)
        .end((err, res) => {
          if(err) return done(err);
          expect(res.status).to.equal(200);
          done();
        });
      });
    });

    describe('With a valid header but invalid password', () => {
      it('Should return a 401 status code :D', done => {
        let {userName} = userOne;
        request.get(`${url}/login`)
        .auth(userName, 'bacon')
        .end((err) => {
          expect(err.status).to.equal(401);
          done();
        });
      });
    });
    describe('With an invalid header', () => {
      it('Should return a 400 status code :D', done => {

        request.get(`${url}/login`)
        .end((err) => {
          expect(err.status).to.equal(400);
          done();
        });
      });
    });
  });
});
