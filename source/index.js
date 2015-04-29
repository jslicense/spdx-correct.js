var spdx = require('spdx');

var valid = spdx.valid.bind(spdx);

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

module.exports = function(identifier) {
  var upperCased = identifier.toUpperCase();
  if (valid(upperCased)) {
    return upperCased;
  }
  if (valid(identifier.trim())) {
    return identifier.trim();
  }
  if (/\s*(\d)/.test(identifier)) {
    var hyphenated = identifier.replace(/\s*(\d)/, '-$1');
    if (valid(hyphenated)) {
      return hyphenated;
    }
  }
  if (/\s*V\s*\d/.test(identifier)) {
    var withHyphen = identifier.replace(/\s*V\s*(\d)/, '-$1');
    if (valid(withHyphen)) {
      return withHyphen;
    }
    var dotZero = withHyphen.replace(/(\d)$/, '$1.0');
    if (valid(dotZero)) {
      return dotZero;
    }
  }
  for (var i = 0; i < lastResorts.length; i++) {
    var pair = lastResorts[i];
    if (upperCased.indexOf(pair[0]) > -1) {
      return pair[1];
    }
  }
  return null;
};
