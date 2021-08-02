'use strict';

const expect = require('chai').expect;
const ConvertHandler = require('../controllers/convertHandler.js');

module.exports = function (app) {
  
  let convertHandler = new ConvertHandler();

  app.route('/api/convert')
    .get((req, res) => {
      try {
        let inputNum = convertHandler.getNum(req.query.input)
        let inputUnit = convertHandler.getUnit(req.query.input)
        if (!inputUnit && !inputNum) throw 'invalid number and unit' 
        if (!inputUnit) throw 'invalid unit'
        if (!inputNum) throw 'invalid number'

        let returnNum = convertHandler.convert(inputNum, inputUnit)
        let returnUnit = convertHandler.getReturnUnit(inputUnit)
        let resultString = convertHandler.getString(inputNum, inputUnit, returnNum, returnUnit)
        res.json({
          "initNum": inputNum,
          "initUnit": inputUnit,
          "returnNum": returnNum,
          "returnUnit": returnUnit,
          "string": resultString
        })

      } catch (e) {
        res.send(e)
      }
      
    })

};


