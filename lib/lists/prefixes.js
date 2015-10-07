'use strict';

module.exports = [].concat.apply([], [
  require('./included/prefixWeapons'),
  require('./included/prefixHeroes'),
  require('./included/prefixVillains')
]);
