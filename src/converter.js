const input = require('sync-input');

const exchangeRates = {
  USD: 1,
  JPY: 113.5,
  EUR: 0.89,
  RUB: 74.36,
  GBP: 0.75
};

const currencyRules = [{
  test: cur => Object.keys(exchangeRates).includes(cur),
  violationMessage: 'Unknown currency'
}];

const amountRules = [{
  test: amount => !isNaN(amount),
  violationMessage: 'The amount has to be a number'
}, {
  test: amount => amount >= 1,
  violationMessage: 'The amount cannot be less than 1'
}];

const invalidInput = (input, rules) => {
  const failedRule = rules.find(rule => !rule.test(input));
  if (failedRule) {
    console.log(failedRule.violationMessage);
    return true;
  }
  return false;
}

const converter = () => {
  console.log(`Welcome to Currency Converter!`);
  for (let currency in exchangeRates) {
    console.log(`1 USD equals ${exchangeRates[currency]} ${currency}`);
  }
  console.log(`I can convert USD to these currencies: JPY, EUR, RUB, USD, GBP
  Type the currency you wish to convert: USD`);

  const currency = input('To: ').toUpperCase();
  if (invalidInput(currency, currencyRules)) {
    return;
  }

  const amount = Number(input('Amount: '));
  if (invalidInput(amount, amountRules)) {
    return;
  }

  console.log(`Result: ${amount} USD equals ${(amount * exchangeRates[currency]).toFixed(4)} ${currency}`)
}

exports.invalidInput = invalidInput;
exports.converter = converter;
exports.exchangeRates = exchangeRates;