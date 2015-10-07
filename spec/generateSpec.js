'use strict';

var R = require('ramda');

var _generate = require('../lib/methods/generate'),
    generate;

var FAKE_GETTERS = {
      foo       : R.always('fuz'),
      bar       : R.always('buz'),
      preHyphen : R.always('pre-'),
      sufHyphen : R.always('-suf')
    },
    FAKE_AUTO_STITCH_ON  = true,
    FAKE_AUTO_STITCH_OFF = false,
    FAKE_DECORATOR       = R.join('-');

var UNKNOWN_GETTER_ERROR = 'Unknown getter method passed to goby.generate(): ';

describe('generate with auto-stitching', function() {

  beforeEach(function() {
    generate = _generate(FAKE_GETTERS, FAKE_AUTO_STITCH_ON, FAKE_DECORATOR);
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

  it('applies auto-stitching to a prefix which ends with a hyphen', function() {
    expect(generate(['preHyphen', 'foo'])).toBe('pre-fuz');
  });

  it('applies auto-stitching to a suffix which begins with a hyphen', function() {
    expect(generate(['foo', 'sufHyphen'])).toBe('fuz-suf');
  });

  it('applies auto-stitching to a prefix and suffix which both contain joining hyphens', function() {
    expect(generate(['preHyphen', 'sufHyphen'])).toBe('pre-suf');
  });

  it('throws an error when provided an array containing an unknown getter', function() {
    expect(function() {
      generate(['foo', 'bar', 'baz', 'bar', 'foo', 'foo', 'buz']);
    }).toThrowError(UNKNOWN_GETTER_ERROR + '"baz"');
  });

});

describe('generate without auto-stitching', function() {

  beforeEach(function() {
    generate = _generate(FAKE_GETTERS, FAKE_AUTO_STITCH_OFF, FAKE_DECORATOR);
  });

  it('ignores duplicate hyphens provided by a decorator and a prefix which ends with a hyphen', function() {
    expect(generate(['preHyphen', 'foo'])).toBe('pre--fuz');
  });

  it('ignores duplicate hyphens provided by a decorator and a suffix which begins with a hyphen', function() {
    expect(generate(['foo', 'sufHyphen'])).toBe('fuz--suf');
  });

  it('ignores duplicate hyphens provided by a decorator and both a prefix and suffix which both contain joining hyphens', function() {
    expect(generate(['preHyphen', 'sufHyphen'])).toBe('pre---suf');
  });

});
