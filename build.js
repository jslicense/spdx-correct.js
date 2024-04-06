var spdxLicenseIds = require('spdx-license-ids')
var { writeFileSync } = require('fs')

// Sorting function that orders the given array of transpositions such
// that a transposition with the longer pattern comes before a transposition
// with a shorter pattern. This is to prevent e.g. the transposition
// ["General Public License", "GPL"] from matching to "Lesser General Public License"
// before a longer and more accurate transposition ["Lesser General Public License", "LGPL"]
// has a chance to be recognized.
function sortTranspositions (a, b) {
  var length = b[0].length - a[0].length
  if (length !== 0) return length
  return a[0].toUpperCase().localeCompare(b[0].toUpperCase())
}

// Common transpositions of license identifier acronyms
var transpositions = [
  ['APGL', 'AGPL'],
  ['Gpl', 'GPL'],
  ['GLP', 'GPL'],
  ['APL', 'Apache'],
  ['ISD', 'ISC'],
  ['GLP', 'GPL'],
  ['IST', 'ISC'],
  ['Claude', 'Clause'],
  [' or later', '+'],
  [' International', ''],
  ['GNU', 'GPL'],
  ['GUN', 'GPL'],
  ['+', ''],
  ['GNU GPL', 'GPL'],
  ['GNU LGPL', 'LGPL'],
  ['GNU/GPL', 'GPL'],
  ['GNU GLP', 'GPL'],
  ['GNU LESSER GENERAL PUBLIC LICENSE', 'LGPL'],
  ['GNU Lesser General Public License', 'LGPL'],
  ['GNU LESSER GENERAL PUBLIC LICENSE', 'LGPL-2.1'],
  ['GNU Lesser General Public License', 'LGPL-2.1'],
  ['LESSER GENERAL PUBLIC LICENSE', 'LGPL'],
  ['Lesser General Public License', 'LGPL'],
  ['LESSER GENERAL PUBLIC LICENSE', 'LGPL-2.1'],
  ['Lesser General Public License', 'LGPL-2.1'],
  ['GNU General Public License', 'GPL'],
  ['Gnu public license', 'GPL'],
  ['GNU Public License', 'GPL'],
  ['GNU GENERAL PUBLIC LICENSE', 'GPL'],
  ['MTI', 'MIT'],
  ['Mozilla Public License', 'MPL'],
  ['Universal Permissive License', 'UPL'],
  ['WTH', 'WTF'],
  ['WTFGPL', 'WTFPL'],
  ['-License', '']
].sort(sortTranspositions)

var licensesWithVersions = spdxLicenseIds
  .map(function (id) {
    var match = /^(.*)-\d+\.\d+$/.exec(id)
    return match
      ? [match[0], match[1]]
      : [id, null]
  })
  .reduce(function (objectMap, item) {
    var key = item[1]
    objectMap[key] = objectMap[key] || []
    objectMap[key].push(item[0])
    return objectMap
  }, {})

var licensesWithOneVersion = Object.keys(licensesWithVersions)
  .map(function makeEntries (key) {
    return [key, licensesWithVersions[key]]
  })
  .filter(function identifySoleVersions (item) {
    return (
      // Licenses has just one valid version suffix.
      item[1].length === 1 &&
      item[0] !== null &&
      // APL will be considered Apache, rather than APL-1.0
      item[0] !== 'APL'
    )
  })
  .map(function createLastResorts (item) {
    return [item[0], item[1][0]]
  })

licensesWithVersions = undefined

// If all else fails, guess that strings containing certain substrings
// meant to identify certain licenses.
var lastResorts = [
  ['UNLI', 'Unlicense'],
  ['WTF', 'WTFPL'],
  ['2 CLAUSE', 'BSD-2-Clause'],
  ['2-CLAUSE', 'BSD-2-Clause'],
  ['3 CLAUSE', 'BSD-3-Clause'],
  ['3-CLAUSE', 'BSD-3-Clause'],
  ['AFFERO', 'AGPL-3.0-or-later'],
  ['AGPL', 'AGPL-3.0-or-later'],
  ['APACHE', 'Apache-2.0'],
  ['ARTISTIC', 'Artistic-2.0'],
  ['Affero', 'AGPL-3.0-or-later'],
  ['BEER', 'Beerware'],
  ['BOOST', 'BSL-1.0'],
  ['BSD', 'BSD-2-Clause'],
  ['CDDL', 'CDDL-1.1'],
  ['ECLIPSE', 'EPL-1.0'],
  ['FUCK', 'WTFPL'],
  ['GNU', 'GPL-3.0-or-later'],
  ['LGPL', 'LGPL-3.0-or-later'],
  ['GPLV1', 'GPL-1.0-only'],
  ['GPL-1', 'GPL-1.0-only'],
  ['GPLV2', 'GPL-2.0-only'],
  ['GPL-2', 'GPL-2.0-only'],
  ['GPL', 'GPL-3.0-or-later'],
  ['MIT +NO-FALSE-ATTRIBS', 'MITNFA'],
  ['MIT', 'MIT'],
  ['MPL', 'MPL-2.0'],
  ['X11', 'X11'],
  ['ZLIB', 'Zlib']
].concat(licensesWithOneVersion).sort(sortTranspositions)

writeFileSync('./last-resorts.json', JSON.stringify(lastResorts))
writeFileSync('./transpositions.json', JSON.stringify(transpositions))
