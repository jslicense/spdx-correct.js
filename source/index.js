var spdx = require('spdx');

var valid = spdx.valid.bind(spdx);

var transforms = [
  function(argument) {
    return argument.toUpperCase();
  },
  function(argument) {
    return argument.trim();
  },
  function(argument) {
    return argument.replace(/\s+/g, '');
  },
  function(argument) {
    return argument.replace(/\s*(\d)/, '-$1');
  },
  function(argument) {
    return argument.replace(/\s*(\d)/, '-$1');
  },
  function(argument) {
    return argument.replace(/\s*V\s*(\d)/, '-$1');
  },
  function(argument) {
    return argument
      .replace(/\s*V\s*(\d)/, '-$1')
      .replace(/(\d)$/, '$1.0');
  }
];

var lastResorts = [
  ['APACHE', 'Apache-2.0'],
  ['AFFERO', 'AGPL-3.0'],
  ['WTF', 'WTFPL'],
  ['GPL', 'GPL-3.0'],
  ['MIT', 'MIT'],
  ['Affero', 'AGPL-3.0'],
  ['AGPL', 'AGPL-3.0'],
  ['ZLIB', 'Zlib'],
  ['3-CLAUSE', 'BSD-3-Clause'],
  ['2-CLAUSE', 'BSD-2-Clause'],
  ['3 CLAUSE', 'BSD-3-Clause'],
  ['2 CLAUSE', 'BSD-2-Clause'],
  ['Unli', 'Unlicense']
];

var SUBSTRING = 0;
var IDENTIFER = 1;

module.exports = function(identifier) {
  var i;

  for (i = 0; i < transforms.length; i++) {
    var transformed = transforms[i](identifier);
    if (valid(transformed)) {
      return transformed;
    }
  }

  var upperCased = identifier.toUpperCase();
  for (i = 0; i < lastResorts.length; i++) {
    var lastResort = lastResorts[i];
    if (upperCased.indexOf(lastResort[SUBSTRING]) > -1) {
      return lastResort[IDENTIFER];
    }
  }

  return null;
};
