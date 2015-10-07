'use strict';

var R = require('ramda');

var DEFAULTS = {
  adjectives : require('./lists/adjectives'),
  prefixes   : require('./lists/prefixes'),
  suffixes   : require('./lists/suffixes'),
  decorator  : R.join(' '),
  autoStitch : true
};

var _maybeUseProvided = function(key, options) {
  return R.defaultTo(R.prop(key, DEFAULTS), R.path([key], options))
};

var _pickOneAtRandom = function(list) {
  return function() {
    return list[Math.floor(Math.random() * list.length)];
  };
};

/**
 * Initialize the GoBy module and return an API.
 * @param {Object} options
 * @param {Array} [options.adjectives]
 * @param {Array} [options.prefixes]
 * @param {Array} [options.suffixes]
 * @param {Function} [options.decorator]
 * @returns {{generate: *}}
 */
var init = function(options) {

  var getAdjective = _pickOneAtRandom(_maybeUseProvided('adjectives', options)),
      getPrefix    = _pickOneAtRandom(_maybeUseProvided('prefixes',   options)),
      getSuffix    = _pickOneAtRandom(_maybeUseProvided('suffixes',   options)),
      decorator    = _maybeUseProvided('decorator', options),
      autoStitch   = _maybeUseProvided('autoStitch', options);

  var getters = {
    adj       : getAdjective,
    adjective : getAdjective,
    pre       : getPrefix,
    prefix    : getPrefix,
    suf       : getSuffix,
    suffix    : getSuffix
  };

  return {
    generate : require('./methods/generate')(getters, autoStitch, decorator)
  };
};

module.exports = {
  init : init
};
