//@ts-nocheck
let chai = require('chai');
let chaiHttp = require('chai-http');
let Contact = require('../models/contact');
let app = require('../app');

chai.use(chaiHttp);
chai.should();

describe('Contacts', () => {
  describe('GET /', () => {
    // Test to get all students record
    it('should get all students record', (done) => {
      chai
        .request(app)
        .get('/about')
        .end((err, res) => {
          res.should.have.status(200);
          //   res.body.should.be.a('object');
          done();
        });
    });
  });
});
