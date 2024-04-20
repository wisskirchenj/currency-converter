const {inputValidated, convert, converter, exchangeRates} = require("../src/converter.js");
const input = require('sync-input');
jest.mock('sync-input', () => jest.fn()); // needs to be top level

describe('converter tests', () => {

  const rules = [{
    test: cur => Object.keys(exchangeRates).includes(cur),
    violationMessage: 'Unknown currency'
  }];

  beforeEach(() => {
    jest.clearAllMocks();
  });

  // Returns False when input passes all rules
  it('should return values, that pass all rules', () => {

    jest.mocked(input).mockReturnValue('USD');
    const result = inputValidated('Curr: ', rules);
    expect(result).toBe('USD');
  });

  // Returns False when rules are empty
  it('should return uppercase any input, when rules are empty', () => {
    const emptyRules = [];
    jest.mocked(input).mockReturnValue('blah');
    const result = inputValidated('Test', emptyRules);

    expect(result).toBe('BLAH');
  });

  // Returns True and prints violation message when input is undefined
  it('should return first valid value and print violation message when input is wrong first', () => {
    console.log = jest.fn();
    jest.mocked(input)
        .mockReturnValueOnce('nah')
        .mockReturnValueOnce('UDS')
        .mockReturnValueOnce('UsD');
    const result = inputValidated('Test', rules);

    expect(result).toBe('USD');
    expect(console.log).toHaveBeenCalledTimes(2)
    expect(console.log).toHaveBeenCalledWith(rules[0].violationMessage);
  });

  it('should return the correct conversion value when valid inputs are provided', () => {
    expect(convert('USD', 'JPY', 100)).toBe('11350.0000');
    expect(convert('EUR', 'GBP', 115)).toBe('96.9101');
    expect(convert('RUB', 'USD', 5000)).toBe('67.2405');
    expect(convert('JPY', 'JPY', 5)).toBe('5.0000');
  });

  it('should convert as expected on valid inputs', () => {
    console.log = jest.fn();
    jest.mocked(input)
        .mockReturnValueOnce('1')
        .mockReturnValueOnce('USd')
        .mockReturnValueOnce('jpy')
        .mockReturnValueOnce('115')
        .mockReturnValueOnce('2');
    converter();

    expect(console.log).toHaveBeenCalledWith('Result: 115 USD equals 13052.5000 JPY');
  });

});
