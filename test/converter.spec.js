const {invalidInput, exchangeRates} = require("../src/converter.js");

describe('invalidInput', () => {

  // Returns False when input passes all rules
  it('should return false when input passes all rules', () => {
    const input = 'USD';
    const rules = [{
      test: cur => Object.keys(exchangeRates).includes(cur),
      violationMessage: 'Unknown currency'
    }];

    const result = invalidInput(input, rules);
    expect(result).toBe(false);
  });

  // Returns False when rules are empty
  it('should return false when rules are empty', () => {
    const input = 'USD';
    const rules = [];

    const result = invalidInput(input, rules);

    expect(result).toBe(false);
  });

  // Returns True and prints violation message when input is undefined
  it('should return true and print violation message when input is undefined', () => {
    const input = undefined;
    const rules = [{
      test: cur => Object.keys(exchangeRates).includes(cur),
      violationMessage: 'Unknown currency'
    }];

    console.log = jest.fn();

    const result = invalidInput(input, rules);

    expect(result).toBe(true);
    expect(console.log).toHaveBeenCalledWith('Unknown currency');
  });

});
