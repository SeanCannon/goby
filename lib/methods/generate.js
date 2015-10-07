'use strict';

var R = require('ramda');

var REGEX_MATCH_HYPHENS_AND_SURROUNDING_SPACES = /( ?-+ ?-?)+/g;

var _apply = R.curry(function(api, item) {
  return api[item]();
});

var _maybeStitch = R.curry(function(autoStitch, decoratorResult) {
  if (autoStitch && R.is(String, decoratorResult)) {
    return decoratorResult.replace(REGEX_MATCH_HYPHENS_AND_SURROUNDING_SPACES,'-');
  } else {
    return decoratorResult;
  }
});

/**
 * Builds an array of name pieces to be passed into `decorator`
 * @param {Object} getters     Methods to get adjectives, prefixes, suffixes...
 * @param {Boolean} autoStitch If true we will fix hyphen and spacing issues.
 * @param {Function} decorator To be applied to the array of pieces.
 * @param {Array} methods      Example ['pre', 'suf']
 * @returns {*}                Will depend on the return value of the decorator
 */
var generate = R.curry(function(getters, autoStitch, decorator, methods) {

  var unsupportedGetters = R.filter(R.compose(R.not, R.contains(R.__, R.keys(getters))), methods);

  if (!R.isEmpty(unsupportedGetters)) {
    throw new Error('Unknown getter method passed to goby.generate(): "' + R.head(unsupportedGetters) + '"');
  }

  return R.compose(_maybeStitch(autoStitch), decorator, R.map(_apply(getters)))(methods);
});

module.exports = generate;
