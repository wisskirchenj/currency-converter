const input = require('sync-input');

const exchangeRates = {
  USD: 1,
  JPY: 113.5,
  EUR: 0.89,
  RUB: 74.36,
  GBP: 0.75
};

const menuPrompt = `What do you want to do?
1-Convert currencies 2-Exit program
`;

const menuRules = [{
  test: choice => ['1', '2'].includes(choice),
  violationMessage: 'Unknown input'
}];

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

const inputValidated = (prompt, rules) => {
  while (true) {
    const userInput = input(prompt).toUpperCase();
    const failedRule = rules.find(rule => !rule.test(userInput));
    if (failedRule) {
      console.log(failedRule.violationMessage);
    } else {
      return userInput;
    }
  }
};

const convert = (sourceCurrency, targetCurrency, amount) => {
  return (amount * exchangeRates[targetCurrency] / exchangeRates[sourceCurrency]).toFixed(4);
};

const converter = () => {
  console.log('Welcome to Currency Converter!');
  for (let currency in exchangeRates) {
    console.log(`1 USD equals ${exchangeRates[currency]} ${currency}`);
  }

  while (inputValidated(menuPrompt, menuRules) === '1') {
    console.log('What do you want to convert?');
    const sourceCurrency = inputValidated('From: ', currencyRules);
    const targetCurrency = inputValidated('To: ', currencyRules);
    const amount = Number(inputValidated('Amount: ', amountRules));

    console.log(`Result: ${amount} ${sourceCurrency} equals ` +
        `${convert(sourceCurrency, targetCurrency, amount)} ${targetCurrency}`);
  }
  console.log('Have a nice day!');
};

exports.inputValidated = inputValidated;
exports.converter = converter;
exports.convert = convert;
exports.exchangeRates = exchangeRates;