function ConvertHandler() {
  
  this.getNum = function(input) {
    if (/^[A-Za-z]/.test(input)) return 1

    let regex = new RegExp(/^\d+(\.\d+)?(|\/\d+(\.\d+)?)?[A-Za-z]{0,}$/)
    let result = input.match(regex)

    function parseFraction(fractionString) {
      let numerator = parseFloat(fractionString.split('/')[0])
      let denominator = parseFloat(fractionString.split('/')[1])
      return denominator > 0 ? numerator/denominator : NaN
    }

    return !result
        ? NaN 
        : /\//.test(result[0])
        ? parseFraction(result[0])
        : parseFloat(result[0]) 
  };
  
  this.getUnit = function(input) {
    const acceptableUnit = ['gal', 'l', 'lbs', 'kg', 'mi', 'km']
    let inputUnit = input.replace(/[\d\W]/g, "").toLowerCase()
    return !acceptableUnit.includes(inputUnit)
        ? null
        : inputUnit == 'l'
        ? 'L'
        : inputUnit
  };
  
  this.getReturnUnit = function(initUnit) {
    const conversionMap = {
      'gal': 'L',
      'L': 'gal',
      'lbs': 'kg',
      'kg': 'lbs',
      'mi': 'km',
      'km': 'mi'
    };
       
    return conversionMap[initUnit];
  };

  this.spellOutUnit = function(unit) {
    const fullnameMap = {
      'gal': 'gallons',
      'L': 'liters',
      'lbs': 'pounds',
      'kg': 'kilograms',
      'mi': 'miles',
      'km': 'kilometers'
    };
       
    return fullnameMap[unit];
  };
  
  this.convert = function(initNum, initUnit) {
    const galToL = 3.78541;
    const lbsToKg = 0.453592;
    const miToKm = 1.60934;

    const conversion = {
      'gal': galToL,
      'L': 1/galToL,
      'lbs': lbsToKg,
      'kg': 1/lbsToKg,
      'mi': miToKm,
      'km': 1/miToKm
    }
        
    return Math.round(initNum * conversion[initUnit] * 100000) / 100000;
  };
  
  this.getString = function(initNum, initUnit, returnNum, returnUnit) {  
    return `${initNum} ${this.spellOutUnit(initUnit)} converts to ${returnNum} ${this.spellOutUnit(returnUnit)}`;
  };
  
}

module.exports = ConvertHandler;
