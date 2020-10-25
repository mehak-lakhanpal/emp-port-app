let chai = require('chai');
let chaiHttp = require('chai-http');
let app = require('../app');
const { expect } = require('chai');

chai.use(chaiHttp);

const managerToken='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVmODFkMWE5ZTk4OWE1NjBhODMyZmYyMCIsInVzZXJuYW1lIjoibWFuYWdlciIsInJvbGUiOiJtYW5hZ2VyIiwiZXhwIjoxNjExNjM3NDEwLCJpYXQiOjE2MDM2MjM5MTl9.4XayE5xFvNGd8a_9cy1DJr7BnqrPIvcRgNe8wegplw8';

describe('Opening', function () {
    it(' Get all openings api: Should return openings', (done) => {
      chai
        .request(app)
        .get('/openings')
        .set('Cookie', `token=${managerToken}`)
        .end((err, res) => {
            expect(res.status).to.equal(200);
        });
      done();
    });
  });

  describe('Opening', function () {
    it(' Get openings create api: Should render create opening view', (done) => {
      chai
        .request(app)
        .get('/openings/create')
        .set('Cookie', `token=${managerToken}`)
        .end((err, res) => {
            expect(res.status).to.equal(200);
        });
      done();
    });
  });

  describe('Opening', function () {
    it('Create opening api: Should create opening', (done) => {
      chai
        .request(app)
        .post('/openings/create')
        .set('Cookie', `token=${managerToken}`)
        .send({ project: 'project', client: 'client' })
        .end((err, res) => {
            expect(res.status).to.equal(400);
        });
      done();
    });
  });

  describe('Opening', function () {
    it('Update opening api: Should update opening', (done) => {
      chai
        .request(app)
        .put('/openings/update')
        .set('Cookie', `token=${managerToken}`)
        .send({ _id:'5799hgfhr67dfghg', project: 'project', client: 'client' })
        .end((err, res) => {
            expect(res.status).to.equal(400);
        });
      done();
    });
  });

  describe('Opening', function () {
    it('Find opening by id api: Should not get opening', (done) => {
      chai
        .request(app)
        .get('/openings/update/5f8aa15d5f92203a482cdd60')
        .set('Cookie', `token=${managerToken}`)
        .end((err, res) => {
            expect(res.status).to.equal(404);
        });
      done();
    });
  });

  describe('Opening', function () {
    it('Get opening by Id api: Should not get opening', (done) => {
      chai
        .request(app)
        .get('/openings/update/5f8aa15d5f92203a482cdd60')
        .set('Cookie', `token=${managerToken}`)
        .end((err, res) => {
            expect(res.status).to.equal(404);
        });
      done();
    });
  });

  describe('Opening', function () {
    it('Apply for opening api: Should not pass authorization check', (done) => {
      chai
        .request(app)
        .get('/openings/apply/5f8aa15d5f92203a482cdd60')
        .set('Cookie', `token=${managerToken}`)
        .end((err, res) => {
            expect(res.status).to.equal(401);
        });
      done();
    });
  });