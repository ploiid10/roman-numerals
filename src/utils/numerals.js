/*Global Variables*/

/* Store elements ex. gold,iron */
const UNITS = {}

/* Store different types of currencies and their conversion rates */
const CURRENCIES = {}

/* All Valid Roman numerals,used keep track of used one. */
const romanNumerals = [ 'i', 'v', 'x', 'l', 'c', 'd', 'm' ]

/* Regular Expressions to Check Valid input */
const valueRegEx = new RegExp(/^[a-z]+\s+is\s+[i|v|x|l|c|d|m]$/i)
const creditRegEx = new RegExp(/^([a-z\s]+)is\s+(\d+.?\d*)\s+credits$/i)
const howMuchRegEx = new RegExp(/^how\s+much\s+is\s+([a-z\s]+)[?]$/i)
const howManyRegex = new RegExp(/^how\s+many\s+credits\s+is\s+([a-z\s]+)[?]$/i)

/* Regular expression to validate roman numeral */
const isValidRomanRegEx = new RegExp(
		/^m{0,3}(cm|cd|d?c{0,3})(xc|xl|l?x{0,3})(ix|iv|v?i{0,3})$/)

/* Roman numerals and their decimal values */
const romanNumeralsVal = {
	i : 1,
	v : 5,
	x : 10,
	l : 50,
	c : 100,
	d : 500,
	m : 1000
}


function currencyToValue(currencyArr) {
	let romanNumeralString = ""
  let value = 0
  let isUnit = false
  currencyArr.forEach((currency, index) => {
    if (UNITS[currency.toLowerCase()]) {
      isUnit = true
    }
    if (CURRENCIES[currency.toLowerCase()]) {
      romanNumeralString += CURRENCIES[currency.toLowerCase()]
    }
  })

	if (!isValidRomanRegEx.test(romanNumeralString) || isUnit) {
		return -1
	}
  let RomanDigits = []
	romanNumeralString.split('').forEach((romanNum, i, arr) => {
		RomanDigits.push(romanNumeralsVal[romanNum])
		if (romanNumeralsVal[romanNum] < romanNumeralsVal[arr[i + 1]]) {
			RomanDigits[i] *= -1
		}
  })
  console.log(RomanDigits)
	value = RomanDigits.reduce((sum, elt) => {
		return sum + elt
	})
	return value
}

/**
 * Check if string is pertaining to a value
 * @param {string} text - text per line of the input file 
 * @returns {Boolean} - true if string is a new/old currency
 */
 const isValue = (text) => {
  const regexArr = valueRegEx.exec(text)
  
  if (!regexArr) {
    return false
  }
  const valueArr = regexArr[0].split(/\s+/)
  const currency = {
    symbol: valueArr[0].toLowerCase(),
    value: valueArr[2].toLowerCase()
  }

  if (
    CURRENCIES[currency.symbol] !== undefined ||
    romanNumerals[currency.value] !== undefined
   ) {
     // do nothing if value has been defined
     return true
   }

  if (!CURRENCIES[currency.symbol]) {
    CURRENCIES[currency.symbol] = currency.value
  }
  return true
}

/**
 * Check if string is pertaining to a value
 * @param {string} text - text per line of the input file 
 * @returns {Boolean} - true if string is a new/old currency
 * @return {String} - if string is credit but got wrong assignment
 */
const isCredit = (text) => {
  const regexArr = creditRegEx.exec(text)

  if (!regexArr) {
    return false
  }
  const unitValue = parseFloat(regexArr[2])

  const creditString = regexArr[1].trim()
  const creditArr = creditString.split(/\s+/)
  const unit = creditArr.pop()
  if (CURRENCIES[unit.toLowerCase()]) {
   return 'Error: unit is a currency'
  }

  if (creditArr.length < 1) {
    return false
  }
  const value = currencyToValue(creditArr)
  if (value !== -1) {
    UNITS[unit.toLowerCase()] = unitValue / value
  }
  return true
}

const isHowMuch = (text) => {
  const regexArr = howMuchRegEx.exec(text)

  if (!regexArr) {
    return false
  }

  const currenciesArr = regexArr[1].trim()
  const currenciesToConvert = currenciesArr.split(/\s+/);
	const value = currencyToValue(currenciesToConvert)

  if (value !== -1) {
    return `${currenciesToConvert.join(" ")} is ${value}`
  }

  return false  
}

const isHowMany = (text) => {
  const regexArr = howManyRegex.exec(text);

  if (!regexArr) {
    return false
  }

  const currenciesArr = regexArr[1].trim()
  const currenciesToConvert = currenciesArr.split(/\s+/);

  const unit = currenciesToConvert.pop()

  if (
    !UNITS[unit.toLocaleLowerCase()]
    || currenciesToConvert.length < 1
  ) {
    return false
  }
  const value = currencyToValue(currenciesToConvert)
  if (value !== -1) {
    const unitValue = value * UNITS[unit.toLowerCase()]
    return `${regexArr[1].trim()} is ${unitValue}`
  } 
  return false
}

const convertCurrency = (text) => {
  if (isValue(text)) {
    return
  } 
  
  if (isCredit(text)) {
    return
  }
  let output = null
  output = isHowMuch(text)
  
  if (output) {
    return output
  }
  output = isHowMany(text)
  if (output) {
    return output
  }
  console.log('I have no idea what you are talking about')
  return 'I have no idea what you are talking about'
}

export default convertCurrency