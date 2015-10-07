'use strict';

var R = require('ramda');

var _generate = require('../lib/methods/generate'),
    generate;

var FAKE_GETTERS = {
      foo : R.always('fuz'),
      bar : R.always('buz')
    },
    FAKE_DECORATOR = R.join('-');

var UNKNOWN_GETTER_ERROR = 'Unknown getter method passed to goby.generate(): ';

describe('generate', function() {

  beforeEach(function() {
    generate = _generate(FAKE_GETTERS, FAKE_DECORATOR);
  });

  it('applies the decorator to an array of multiple getter values', function() {
    expect(generate(['foo', 'foo', 'bar'])).toBe('fuz-fuz-buz');
  });

  it('applies the decorator to an array of one getter value', function() {
    expect(generate(['foo'])).toBe('fuz');
  });

  it('applies the decorator to an empty array', function() {
    expect(generate([])).toBe('');
  });

  it('throws an error when provided an array containing an unknown getter', function() {
    expect(function() {
      generate(['foo', 'bar', 'baz', 'bar', 'foo', 'foo', 'buz']);
    }).toThrowError(UNKNOWN_GETTER_ERROR + '"baz"');
  });

});
