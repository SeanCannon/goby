'use strict';

var R = require('ramda');

var _apply = R.curry(function(api, item) {
  return api[item]();
});

/**
 * Builds an array of name pieces to be passed into `decorator`
 * @param {Object} getters     Methods to get adjectives, prefixes, suffixes...
 * @param {Function} decorator To be applied to the array of pieces.
 * @param {Array} methods      Example ['pre', 'suf']
 * @returns {*}                Will depend on the return value of the decorator
 */
var generate = R.curry(function(getters, decorator, methods) {

  var unsupportedGetters = R.filter(R.compose(R.not, R.contains(R.__, R.keys(getters))), methods);

  if (!R.isEmpty(unsupportedGetters)) {
    throw new Error('Unknown getter method passed to goby.generate(): "' + R.head(unsupportedGetters) + '"');
  }

  return R.compose(decorator, R.map(_apply(getters)))(methods);
});

module.exports = generate;
