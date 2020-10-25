let chai = require('chai');
let chaiHttp = require('chai-http');
let app = require('../app');
const { expect } = require('chai');

chai.use(chaiHttp);

const token='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVmODFkMWE5ZTk4OWE1NjBhODMyZmYyMCIsInVzZXJuYW1lIjoibWFuYWdlciIsInJvbGUiOiJtYW5hZ2VyIiwiZXhwIjoxNjExNjM3NDEwLCJpYXQiOjE2MDM2MjM5MTl9.4XayE5xFvNGd8a_9cy1DJr7BnqrPIvcRgNe8wegplw8';

describe('User', function () {
    it(' Register api: File is not present', (done) => {
      chai
        .request(app)
        .post('/user/register')
        .send({ username: 'user', password: 'user', role:'employee' })
        .end((err, res) => {
            expect(res.status).to.equal(400);
        });
      done();
    });
  });

  describe('User', function () {
    it('Login api: User is unauthorized', (done) => {
      chai
        .request(app)
        .post('/user/login')
        .send({ username: 'user', password: 'user' })
        .end((err, res) => {
            expect(res.status).to.equal(401);
        });
      done();
    });
  });

describe('User', function() {
    it('Register api: Register View should rendered', (done) => {
        chai
          .request(app)
          .get('/user/register')
          .end((err, res) => {
            expect(res.status).to.equal(200);
          });
        done();
      });
  });

  describe('User', function() {
    it('Login api: Login View should rendered', (done) => {
        chai
          .request(app)
          .get('/user/login')
          .end((err, res) => {
            expect(res.status).to.equal(200);
          });
        done();
      });
  });

  describe('User', function () {
    it('Logout api: Should return 200', (done) => {
      chai
        .request(app)
        .post('/user/logout')
        .set('Cookie', `token=${token}`)
        .end((err, res) => {
          expect(res.status).to.equal(200);
        });
      done();
    });
  });

