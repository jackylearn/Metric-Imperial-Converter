const chai = require('chai');
let assert = chai.assert;
const ConvertHandler = require('../controllers/convertHandler.js');

let convertHandler = new ConvertHandler();
const acceptableUnit = ['gal', 'L', 'lbs', 'kg', 'mi', 'km']
const galToL = 3.78541;
const lbsToKg = 0.453592;
const miToKm = 1.60934;

suite('Unit Tests', function(){
  suite('#getNum', () => {
    test('data type', () => {
      assert.isNumber(convertHandler.getNum('3'))
      assert.isNumber(convertHandler.getNum('3mi'))
      assert.isNaN(convertHandler.getNum('-3mi'))
    })

    test('whole number', () => {
      assert.equal(convertHandler.getNum('3'), 3)
      assert.equal(convertHandler.getNum('3mi'), 3)
    })
    
    test('decimal number', () => {
      assert.equal(convertHandler.getNum('3.4'), 3.4)
      assert.equal(convertHandler.getNum('3.5mi'), 3.5)
      assert.isNaN(convertHandler.getNum('4.5.2mi'), 'multiple decimal point')
    })

    test('fractional number', () => {
      assert.equal(convertHandler.getNum('3/4mi'), 3/4)
      assert.isNaN(convertHandler.getNum('3/4/2mi'), 'multiple fraction')
    })

    test('fractional number with decimal', () => {
      assert.equal(convertHandler.getNum('3.6/3'), 1.2)
      assert.equal(convertHandler.getNum('3/1.5'), 2)
      assert.equal(convertHandler.getNum('2/1.0'), 2)
      assert.isNaN(convertHandler.getNum('3.5/0'))
    })
    
    test('no numerical input', () => {
      assert.equal(convertHandler.getNum('mi'), 1)
    })
  })

  suite('#getUnit', () => {
    test('data type', () => {
      assert.isString(convertHandler.getUnit('3mi'))
      assert.isNull(convertHandler.getUnit('fdsfsdf'))
    })
    
    test('lowercase unit', () => {
      assert.equal(convertHandler.getUnit('3Kg'), 'kg')
      assert.notEqual(convertHandler.getUnit('3mi'), 'Mi')
    })

    test('in acceptable unit list', () => {
      assert.include(acceptableUnit, convertHandler.getUnit('15kg'))
      assert.notInclude(acceptableUnit, convertHandler.getUnit('34g'))
      assert.include(acceptableUnit, convertHandler.getUnit('3L'))
    })
  })

  suite('#getReturnUnit', () => {
    test('mi to km', () => {
      assert.equal(convertHandler.getReturnUnit('mi'), 'km')
    })
    test('km to mi', () => {
      assert.equal(convertHandler.getReturnUnit('km'), 'mi')
    })
    test('kg to lbs', () => {
      assert.equal(convertHandler.getReturnUnit('kg'), 'lbs')
    })
    test('lbs to kg', () => {
      assert.equal(convertHandler.getReturnUnit('lbs'), 'kg')
    })
    test('gal to L', () => {
      assert.equal(convertHandler.getReturnUnit('gal'), 'L')
    })
    test('L to gal', () => {
      assert.equal(convertHandler.getReturnUnit('L'), 'gal')
    })
  })

  suite('#spellOutUnit', () => {
    test('correct return', () => {
      assert.equal(convertHandler.spellOutUnit('km'), 'kilometers')
      assert.equal(convertHandler.spellOutUnit('mi'), 'miles')
      assert.equal(convertHandler.spellOutUnit('kg'), 'kilograms')
      assert.equal(convertHandler.spellOutUnit('lbs'), 'pounds')
      assert.equal(convertHandler.spellOutUnit('gal'), 'gallons')
      assert.equal(convertHandler.spellOutUnit('L'), 'liters')
    })
  })

  suite('#convert', () => {
    test('correct value', () => {
      assert.approximately(convertHandler.convert(1, 'gal'), galToL, 0.001)
      assert.approximately(convertHandler.convert(1, 'lbs'), lbsToKg, 0.001)
      assert.approximately(convertHandler.convert(10, 'km'), 10/miToKm, 0.001)
    })
  })

  suite('#getString', () => {
    test('correct order', () => {
      assert.equal(convertHandler.getString(1, 'gal', galToL, 'L'), '1 gallons converts to 3.78541 liters')
      assert.equal(convertHandler.getString(3, 'km', 1.86412, 'mi'), '3 kilometers converts to 1.86412 miles')
    })
  })


});