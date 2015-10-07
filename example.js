'use strict';

var goby = require('./lib/goby');

var sampleLists = {
  adjectives : ['ornate', 'ancient'],
  prefixes   : ['dragon', 'serpent'],
  suffixes   : ['claw', 'scale']
};

var sampleDecorators = {
  noDecoration : function(pieces) { return pieces; },
  caps         : function(pieces) { return pieces.join(' ').toUpperCase(); },
  camelCase    : function(pieces) {
                   return pieces.join(' ').replace(/(?:^\w|[A-Z]|\b\w|\s+)/g, function(match, index) {
                     if (+match === 0) return '';
                     return index === 0 ? match.toLowerCase() : match.toUpperCase();
                   }).replace(/\-/g, '');
                 }
};

var fragments     = goby.init({ decorator : sampleDecorators.noDecoration });
var capsName      = goby.init({ decorator : sampleDecorators.caps });
var camelCaseName = goby.init({ decorator : sampleDecorators.camelCase });
var fantasyItem   = goby.init({
                      adjectives : sampleLists.adjectives,
                      prefixes   : sampleLists.prefixes,
                      suffixes   : sampleLists.suffixes
                    });

console.log('Generated name fragments: ', fragments.generate(['adj', 'pre', 'suf']));
console.log('Generated caps name: ' + capsName.generate(['adj', 'pre', 'suf']));
console.log('Generated camelCase name: ' + camelCaseName.generate(['adj', 'pre', 'suf']));
console.log('Generated very, very descriptive caps name: ' + capsName.generate(['adj', 'adj', 'adj', 'pre', 'suf']));
console.log('Generated fantasy item: ', fantasyItem.generate(['adj', 'pre', 'suf']));
