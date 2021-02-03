/* eslint-disable no-unused-expressions */
/* eslint-disable func-names */

// https://dev.to/easybuoy/testing-node-api-with-mocha-chai-248b
// https://scotch.io/tutorials/test-a-node-restful-api-with-mocha-and-chai#toc-mocha-testing-environment
// https://mrvautin.com/ensure-express-app-started-before-tests/
// https://www.chaijs.com/plugins/chai-http/
/* eslint-disable no-undef */
const chai = require('chai');
const chaiHttp = require('chai-http');

// const moment = require('moment');

const app = require('../index');

// const db = require('../db');

process.env.NODE_ENV = process.env.NODE_ENV_TEST || 'development';

const { expect } = chai;
chai.use(chaiHttp);

const requester = chai.request(app).keepOpen();

before(function (done) {
  this.timeout(5000); // A very long environment setup.

  app.on('appStarted', () => {
    console.log('appStarted');
    done();
  });
});

describe('Server health', () => {
  it('Get 404 from / as intended', (done) => {
    requester
      .get('/')
      .end((err, res) => {
        expect(res).to.have.status(404);
        expect(res.body.error).to.equals('Endpoint not found');
        done();
      });
  });
});

describe('General app API', () => {
  it('Get status = ok from test endpoint', (done) => {
    requester
      .get('/test')
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body.status).to.equals('OK');
        done();
      });
  });
  it('Get action = dbTest from collection "test"', (done) => {
    requester
      .get('/testFindOneDB')
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body.data.action).to.equals('dbTest');
        done();
      });
  });
});
