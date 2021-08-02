const chaiHttp = require('chai-http');
const chai = require('chai');
let assert = chai.assert;
const server = require('../server');


chai.use(chaiHttp);

suite('Functional Tests', function() {
  test('convert valid input', () => {
    chai
      .request(server)
      .get('/api/convert?input=10L')
      .end((err, res) => {
        assert.equal(res.status, 200)
        let obj = JSON.parse(res.text)
        assert.equal(obj.returnNum, 2.64172)
        assert.equal(obj.returnUnit, 'gal')
      })
  })

  test('convert invalid unit', () => {
    chai
      .request(server)
      .get('/api/convert?input=32g')
      .end((err, res) => {
        assert.equal(res.status, 200)
        assert.equal(res.text, 'invalid unit')
      })
  })

  test('convert invalid number', () => {
    chai
      .request(server)
      .get('/api/convert?input=3/7.2/4kg')
      .end((err, res) => {
        assert.equal(res.status, 200)
        assert.equal(res.text, 'invalid number')
      })
  })

  test('convert invalid number AND unit', () => {
    chai
      .request(server)
      .get('/api/convert?input=3/7.2/4kilo')
      .end((err, res) => {
        assert.equal(res.status, 200)
        assert.equal(res.text, 'invalid number and unit')
      })
  })

  test('only valid unit', () => {
    chai
      .request(server)
      .get('/api/convert?input=kg')
      .end((err, res) => {
        assert.equal(res.status, 200)
        let obj = JSON.parse(res.text)
        assert.equal(obj.initNum, 1)
        assert.equal(obj.returnNum, 2.20462)
        assert.equal(obj.returnUnit, 'lbs')
      })
  })
});
