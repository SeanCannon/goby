# GoBy
Character name generator. What do you want to go by?

[![Build Status](https://travis-ci.org/SeanCannon/goby.svg?branch=master)](https://travis-ci.org/SeanCannon/goby) [![Coverage Status](https://coveralls.io/repos/SeanCannon/goby/badge.svg?branch=master&service=github)](https://coveralls.io/github/SeanCannon/goby?branch=master) [![npm version](http://img.shields.io/npm/v/goby.svg)](https://npmjs.org/package/goby) [![Dependency Status](https://david-dm.org/SeanCannon/goby.svg)](https://david-dm.org/SeanCannon/goby)

## Install
```
$ npm install goby
```

## Run tests
```
$ npm test
```

## Run example script
I included a sample file with some various use cases, decorators, list-overrides, etc.
```
$ npm run demo
```
## Important methods
There are really only two exposed methods to worry about, `init()` and `generate()`

### goby.init()
When you require goby, you will need to invoke `init()` and optionally pass in an `options` object, 
which will contain any or all of these overrides: 

| Option       | Type     | Default        | Description |
| ------------ | -------- | -------------- | ----------- |
| *adjectives* | Array    | [Included](https://github.com/SeanCannon/goby/tree/master/lib/lists/included)     | A list of adjectives or surnames. |
| *prefixes*   | Array    | [Included](https://github.com/SeanCannon/goby/tree/master/lib/lists/included)     | A list of prefix words or first names. |
| *suffixes*   | Array    | [Included](https://github.com/SeanCannon/goby/tree/master/lib/lists/included)     | A list of suffixes or family names. |
| *decorator*  | Function | [R.join(SPACE)](http://ramdajs.com/0.17/docs/#join) | When the name is generated, an array of the name pieces will be passed to a decorator, either internally or to one you provide here. |
| *autoStitch* | Boolean  | *true*         | If the decorator returns a string, `autoStitch` will join prefix/suffixes which contain a hyphen and consolidate multiple hyphens. Example `hydro- man` becomes `hydro-man` and `hydro- -ionic` becomes `hydro-ionic`. |

The `init()` method returns an object with a `generate()` method.

### goby.init().generate()
After you call `init`, you can then call `generate()` which will build your name. It takes an array of fragment getters. 
Possible array keys are as follows: 
  - `adjective` or simply `adj`
  - `prefix` or simply `pre`
  - `suffix` or simply `suf`

If you pass anything else into the array, `generate()` will throw an `'Unknown getter method passed to goby.generate()` error.

## Usage
This is intended to be used to generate random names for characters and items in games, but since 
all it does is combine some words in list buckets, you can use it however you see fit with whatever 
lists and decorators you require: 

### Simple, out of the box:
```javascript
var goby = require('goby').init();

var name1 = goby.generate(['adj', 'pre', 'suf']); // maniacal black hurricane
var name2 = goby.generate(['adj', 'pre', 'suf']); // irresistible hydro-monkey
var name3 = goby.generate(['pre']);               // silver
```

### Provide your own word lists
GoBy includes some comic-book style names and adjectives, but you can provide your own instead. Provided 
lists will be used instead of the included lists and will not be merged.

You can override any or all of the three list buckets: `adjectives`, `prefixes`, and `suffixes`. 

```javascript

var fantasyWords = {
  adjectives : ['ornate', 'ancient'],
  prefixes   : ['dragon', 'serpent'],
  suffixes   : ['claw', 'scale']
};

var goby = require('goby').init(fantasyWords);

var name1 = goby.generate(['adj', 'pre', 'suf']); // ornate serpent claw
var name2 = goby.generate(['adj', 'pre', 'suf']); // ancient dragon claw
var name3 = goby.generate(['pre']);               // serpent

```

### Provide your own decorator
The name will be generated as fragments and added to an array, which is then passed 
to a decorator. If you don't provide one, GoBy will use an internal one which simply separates 
the fragments with a single space. 

Add your decorator to the options object along with any list overrides if you have any: 

```javascript

var gobyOptions = {
  adjectives : ['awesome'],
  decorator  : function allCaps(pieces) { return pieces.join(' ').toUpperCase(); }
};

var goby = require('goby').init(gobyOptions);

var name1 = goby.generate(['adj', 'pre', 'suf']); // AWESOME GYRO-CRUSTACEAN
var name2 = goby.generate(['adj', 'pre', 'suf']); // AWESOME FIGHTING WEREWOLF
var name3 = goby.generate(['adj', 'adj', 'adj']); // AWESOME AWESOME AWESOME
```

### Credit
100% of the credit for the name lists I included, and a huge THANKS goes to [Lee's Useless Super Hero Generator](http://home.hiwaay.net/~lkseitz/comics/herogen/herogen.cgi)

### License 
MIT, do whatever the hell you want!
