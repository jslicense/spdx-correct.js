var test = require('tape')
var parse = require('spdx-expression-parse')
var correct = require('./')

function valid (string) {
  try {
    parse(string)
    return true
  } catch (e) {
    return false
  }
}

/* eslint-disable max-len */
var examples = {
  '(MIT OR Apache-2.0)': '(MIT OR Apache-2.0)',
  ' Apache License V2': 'Apache-2.0',
  ' BSD-3-Clause': 'BSD-3-Clause',
  ' GPL-3.0+': 'GPL-3.0',
  '"BD-2-Clause"': 'BSD-2-Clause',
  '"BSD-2-Clause"': 'BSD-2-Clause',
  '"MIT"': 'MIT',
  '(LGPL)': 'LGPL-3.0',
  '2 clause BSD': 'BSD-2-Clause',
  '2-clause-BSD': 'BSD-2-Clause',
  '3-Clause BSD': 'BSD-3-Clause',
  '3-Clause-BSD': 'BSD-3-Clause',
  '3-clause BSD': 'BSD-3-Clause',
  'AGPL 3': 'AGPL-3.0',
  'AGPL 3.0': 'AGPL-3.0',
  'AGPL v3': 'AGPL-3.0',
  'AGPL': 'AGPL-3.0',
  'AGPL, Copyright 2014 uh-sem-blee, Co.': 'AGPL-3.0',
  'AGPL-3': 'AGPL-3.0',
  'AGPL3': 'AGPL-3.0',
  'AGPLV3': 'AGPL-3.0',
  'AGPLv3': 'AGPL-3.0',
  'AGPLv3+': 'AGPL-3.0',
  'AOL/MIT': 'MIT',
  'APACHE 2': 'Apache-2.0',
  'APACHE 2.0': 'Apache-2.0',
  'APACHE V2.0': 'Apache-2.0',
  'APACHE': 'Apache-2.0',
  'APACHE-2': 'Apache-2.0',
  'APACHE-2.0': 'Apache-2.0',
  'APACHE-V2': 'Apache-2.0',
  'APACHE2': 'Apache-2.0',
  'APACHE2.0': 'Apache-2.0',
  'APACHE20': 'Apache-2.0',
  'APACHE2_0': 'Apache-2.0',
  'APGLv3': 'AGPL-3.0',
  'APL 2.0': 'Apache-2.0',
  'APL': 'Apache-2.0',
  'APL2': 'Apache-2.0',
  'APLv2': 'Apache-2.0',
  'Affero GPL or Commercial': 'AGPL-3.0',
  'Affero GPL v3': 'AGPL-3.0',
  'Affero GPL3': 'AGPL-3.0',
  'Affero General Public License v3': 'AGPL-3.0',
  'Affero-GPL': 'AGPL-3.0',
  'Apache ': 'Apache-2.0',
  'Apache 2 License': 'Apache-2.0',
  'Apache 2': 'Apache-2.0',
  'Apache 2.0 License': 'Apache-2.0',
  'Apache 2.0 http://www.apache.org/licenses/': 'Apache-2.0',
  'Apache 2.0': 'Apache-2.0',
  'Apache Licence 2.0': 'Apache-2.0',
  'Apache Licence v2': 'Apache-2.0',
  'Apache License 2': 'Apache-2.0',
  'Apache License 2.': 'Apache-2.0',
  'Apache License 2.0': 'Apache-2.0',
  'Apache License V2': 'Apache-2.0',
  'Apache License V2.0': 'Apache-2.0',
  'Apache License Version 2.0': 'Apache-2.0',
  'Apache License Version 2.0,': 'Apache-2.0',
  'Apache License v2': 'Apache-2.0',
  'Apache License v2.0': 'Apache-2.0',
  'Apache License version 2.0': 'Apache-2.0',
  'Apache License': 'Apache-2.0',
  'Apache License, 2.0': 'Apache-2.0',
  'Apache License, Version 2.0': 'Apache-2.0',
  'Apache License, Version 2.0, http://www.apache.org/licenses/LICENSE-2.0': 'Apache-2.0',
  'Apache License, v2.0': 'Apache-2.0',
  'Apache License, version 2': 'Apache-2.0',
  'Apache Public License v2': 'Apache-2.0',
  'Apache Public License, Version 2': 'Apache-2.0',
  'Apache Software License 2.0': 'Apache-2.0',
  'Apache Software License Version 2': 'Apache-2.0',
  'Apache V2': 'Apache-2.0',
  'Apache V2.0': 'Apache-2.0',
  'Apache Version 2': 'Apache-2.0',
  'Apache Version 2.0': 'Apache-2.0',
  'Apache lisence V2': 'Apache-2.0',
  'Apache lisense 2.0': 'Apache-2.0',
  'Apache v. 2': 'Apache-2.0',
  'Apache v2 License': 'Apache-2.0',
  'Apache v2': 'Apache-2.0',
  'Apache v2.0': 'Apache-2.0',
  'Apache version 2': 'Apache-2.0',
  'Apache version 2.0': 'Apache-2.0',
  'Apache': 'Apache-2.0',
  'Apache, Version 2.0': 'Apache-2.0',
  'Apache, v2.0': 'Apache-2.0',
  'Apache-2': 'Apache-2.0',
  'Apache-2.0': 'Apache-2.0',
  'Apache-License-2.0': 'Apache-2.0',
  'Apache-V2': 'Apache-2.0',
  'Apache-v2': 'Apache-2.0',
  'Apache-v2.0': 'Apache-2.0',
  'Apache2': 'Apache-2.0',
  'Apache2.0': 'Apache-2.0',
  'Apache20': 'Apache-2.0',
  'ApacheV2': 'Apache-2.0',
  'Apache_2_0': 'Apache-2.0',
  'Apachev2': 'Apache-2.0',
  'Artistic 2.0': 'Artistic-2.0',
  'Artistic License 2.0': 'Artistic-2.0',
  'Artistic License': 'Artistic-2.0',
  'Artistic': 'Artistic-2.0',
  'Attribution-NonCommercial': 'CC-BY-NC-4.0',
  'BEER': 'Beerware',
  'BEERWARE': 'Beerware',
  'BOOST': 'BSL-1.0',
  'BS3 3-Clause': 'BSD-3-Clause',
  'BSD 2-Clause license': 'BSD-2-Clause',
  'BSD 2-Clause': 'BSD-2-Clause',
  'BSD 2-clause': 'BSD-2-Clause',
  'BSD 3 Clause': 'BSD-3-Clause',
  'BSD 3': 'BSD-3-Clause',
  'BSD 3-Clause': 'BSD-3-Clause',
  'BSD 3-clause': 'BSD-3-Clause',
  'BSD clause 3': 'BSD-3-Clause',
  'BSD': 'BSD-2-Clause',
  'BSD-2 Clause': 'BSD-2-Clause',
  'BSD-2-Clauseno': 'BSD-2-Clause',
  'BSD-2-clause': 'BSD-2-Clause',
  'BSD-3 Clause': 'BSD-3-Clause',
  'BSD-3': 'BSD-3-Clause',
  'BSD-3-Claude': 'BSD-3-Clause',
  'BSD2-License': 'BSD-2-Clause',
  'BSD3': 'BSD-3-Clause',
  'BSD3-Clause': 'BSD-3-Clause',
  'Beer-Ware': 'Beerware',
  'BeerWare': 'Beerware',
  'Beerware': 'Beerware',
  'Boost': 'BSL-1.0',
  'CC0': 'CC0-1.0',
  'CC BY 3.0': 'CC-BY-3.0',
  'CC BY 4.0': 'CC-BY-4.0',
  'CC-BY 3.0': 'CC-BY-3.0',
  'CC-BY 4.0 International': 'CC-BY-4.0',
  'Cc-by-3.0': 'CC-BY-3.0',
  'DWTFYW License': 'WTFPL',
  'DWTFYW': 'WTFPL',
  'DWTFYWPL': 'WTFPL',
  'Do what the fuck you want to public license': 'WTFPL',
  'Eclipse Public License (EPL)': 'EPL-1.0',
  'Eclipse Public License + Eclipse Distribution License': 'EPL-1.0',
  'Eclipse Public License 1.0': 'EPL-1.0',
  'Eclipse Public License': 'EPL-1.0',
  'Eclipse Public License, Eclipse Distribution License': 'EPL-1.0',
  'Eclipse': 'EPL-1.0',
  'GLP': 'GPL-3.0',
  'GLPv3': 'GPL-3.0',
  'GNU Affero GPL 3.0': 'AGPL-3.0',
  'GNU Affero GPLv3': 'AGPL-3.0',
  'GNU GENERAL PUBLIC LICENSE Version 2': 'GPL-2.0',
  'GNU GENERAL PUBLIC LICENSE': 'GPL-3.0',
  'GNU GLP v3.0': 'GPL-3.0',
  'GNU GPL 3': 'GPL-3.0',
  'GNU GPL 3.0': 'GPL-3.0',
  'GNU GPL V2': 'GPL-2.0',
  'GNU GPL V3.0': 'GPL-3.0',
  'GNU GPL v2': 'GPL-2.0',
  'GNU GPL v2.0': 'GPL-2.0',
  'GNU GPL v3': 'GPL-3.0',
  'GNU GPL v3.0': 'GPL-3.0',
  'GNU GPL ver 3': 'GPL-3.0',
  'GNU GPL': 'GPL-3.0',
  'GNU GPLv2': 'GPL-2.0',
  'GNU GPLv3': 'GPL-3.0',
  'GNU GPLv3+': 'GPL-3.0',
  'GNU General Public License v2.0': 'GPL-2.0',
  'GNU General Public License v3': 'GPL-3.0',
  'GNU General Public License': 'GPL-3.0',
  'GNU General Public License, version 2': 'GPL-2.0',
  'GNU General Public': 'GPL-3.0',
  'GNU LESSER GENERAL PUBLIC LICENSE': 'GPL-3.0',
  'GNU LGPL v3.0': 'GPL-3.0',
  'GNU License v3': 'GPL-3.0',
  'GNU V3': 'GPL-3.0',
  'GNU v2': 'GPL-2.0',
  'GNU': 'GPL-3.0',
  'GNU-GPL': 'GPL-3.0',
  'GNU/GPL': 'GPL-3.0',
  'GNU/GPLv2': 'GPL-2.0',
  'GPL 2': 'GPL-2.0',
  'GPL 2.0': 'GPL-2.0',
  'GPL 3': 'GPL-3.0',
  'GPL 3.0': 'GPL-3.0',
  'GPL V2': 'GPL-2.0',
  'GPL V3': 'GPL-3.0',
  'GPL V3.0': 'GPL-3.0',
  'GPL Version 3': 'GPL-3.0',
  'GPL v.2': 'GPL-2.0',
  'GPL v2': 'GPL-2.0',
  'GPL v3': 'GPL-3.0',
  'GPL v3+': 'GPL-3.0',
  'GPL v3.0': 'GPL-3.0',
  'GPL': 'GPL-3.0',
  'GPL-2': 'GPL-2.0',
  'GPL-2.0-': 'GPL-2.0',
  'GPL-3': 'GPL-3.0',
  'GPL-V3': 'GPL-3.0',
  'GPL2': 'GPL-2.0',
  'GPL2+': 'GPL-2.0',
  'GPL3': 'GPL-3.0',
  'GPL3.0': 'GPL-3.0',
  'GPL3.0+': 'GPL-3.0',
  'GPLV2': 'GPL-2.0',
  'GPLV3': 'GPL-3.0',
  'GPLv2': 'GPL-2.0',
  'GPLv2+': 'GPL-2.0',
  'GPLv3': 'GPL-3.0',
  'GPLv3+': 'GPL-3.0',
  'GPLv3.0': 'GPL-3.0',
  'GUN': 'GPL-3.0',
  'Gnu public license v2.0': 'GPL-2.0',
  'Gpl v3': 'GPL-3.0',
  'Gpl': 'GPL-3.0',
  'Gpl-2.0': 'GPL-2.0',
  'Gpl-3.0': 'GPL-3.0',
  'Gpl2': 'GPL-2.0',
  'Http://opensource.org/licenses/MIT': 'MIT',
  'Http://unlicense.org': 'Unlicense',
  'Http://wtfpl.org/': 'WTFPL',
  'Http://www.apache.org/licenses/LICENSE-2.0': 'Apache-2.0',
  'Http://www.mozilla.org/MPL/2.0/': 'MPL-2.0',
  'Http://www.opensource.org/licenses/MIT': 'MIT',
  'ISD': 'ISC',
  'IST': 'ISC',
  'Isc': 'ISC',
  'LGLP3': 'LGPL-3.0',
  'LGPL 2.1': 'LGPL-2.1',
  'LGPL 3': 'LGPL-3.0',
  'LGPL 3.0': 'LGPL-3.0',
  'LGPL Version 3.0': 'LGPL-3.0',
  'LGPL v2': 'LGPL-2.0',
  'LGPL v3': 'LGPL-3.0',
  'LGPL': 'LGPL-3.0',
  'LGPL-2': 'LGPL-2.0',
  'LGPL-3': 'LGPL-3.0',
  'LGPL.v3': 'LGPL-3.0',
  'LGPL2': 'LGPL-2.0',
  'LGPL2.1': 'LGPL-2.1',
  'LGPL3': 'LGPL-3.0',
  'LGPL3+': 'LGPL-3.0',
  'LGPL3.0': 'LGPL-3.0',
  'LGPL:': 'LGPL-3.0',
  'LGPLv2.1': 'LGPL-2.1',
  'LGPLv3': 'LGPL-3.0',
  'LGPLv3+': 'LGPL-3.0',
  'LICENSE-MIT': 'MIT',
  'Licenses/GPL-3.0': 'GPL-3.0',
  'M.I.T': 'MIT',
  'M.I.T.': 'MIT',
  'MIT ': 'MIT',
  'MIT (http://mootools.net/license.txt)': 'MIT',
  'MIT (https://github.com/AlekseyLeshko/say-me/blob/master/LICENSE)': 'MIT',
  'MIT (https://github.com/AlekseyLeshko/testimonial.js/blob/master/LICENSE)': 'MIT',
  'MIT (https://github.com/brentertz/scapegoat/blob/master/LICENSE-MIT)': 'MIT',
  'MIT / http://rem.mit-license.org': 'MIT',
  'MIT / http://www.highcharts.com/license/': 'MIT',
  'MIT 1.0': 'MIT',
  'MIT <http://bankfacil.mit-license.org>': 'MIT',
  'MIT <http://opensource.org/licenses/MIT>': 'MIT',
  'MIT <http://www.opensource.org/licenses/mit-license.php>': 'MIT',
  'MIT @chetandhembre': 'MIT',
  'MIT Copyright (c) 2015 Austin Eldridge': 'MIT',
  'MIT LICENSE': 'MIT',
  'MIT Licence': 'MIT',
  'MIT License (MIT)': 'MIT',
  'MIT License (http://opensource.org/licenses/MIT)': 'MIT',
  'MIT License - http://opensource.org/licenses/MIT': 'MIT',
  'MIT License': 'MIT',
  'MIT License, http://www.opensource.org/licenses/MIT': 'MIT',
  'MIT License, see LICENSE.md for details': 'MIT',
  'MIT License. Copyright First Rally. All rights reserved.': 'MIT',
  'MIT License.': 'MIT',
  'MIT Licensed. http://www.opensource.org/licenses/mit-license.php': 'MIT',
  'MIT Lisence': 'MIT',
  'MIT licence': 'MIT',
  'MIT license (MIT)': 'MIT',
  'MIT license': 'MIT',
  'MIT, Copyright (c) 2013 Michael Schoonmaker': 'MIT',
  'MIT, http://opensource.org/licenses/MIT': 'MIT',
  'MIT-LICENSE': 'MIT',
  'MIT-License': 'MIT',
  'MIT-Style': 'MIT',
  'MIT-like': 'MIT',
  'MIT/X': 'MIT',
  'MIT/X11': 'MIT',
  'MIT2': 'MIT',
  'MITISC': 'MIT',
  'MIT]': 'MIT',
  'MIT_License': 'MIT',
  'MITt': 'MIT',
  'MPL 2': 'MPL-2.0',
  'MPL 2.0': 'MPL-2.0',
  'MPL V2': 'MPL-2.0',
  'MPL v2': 'MPL-2.0',
  'MPL v2.0': 'MPL-2.0',
  'MPL': 'MPL-2.0',
  'MPL-2': 'MPL-2.0',
  'MPL/2.0': 'MPL-2.0',
  'MPL2': 'MPL-2.0',
  'MPL2.0': 'MPL-2.0',
  'MPLV2': 'MPL-2.0',
  'MPLv2': 'MPL-2.0',
  'MPLv2.0': 'MPL-2.0',
  'MTI': 'MIT',
  'MiT': 'MIT',
  'Mit': 'MIT',
  'MIT +no-false-attribs': 'MITNFA',
  'Mozilla Public License 1.1': 'MPL-1.1',
  'Mozilla Public License 2.0': 'MPL-2.0',
  'Mozilla Public License version 2': 'MPL-2.0',
  'Mozilla Public License': 'MPL-2.0',
  'Mozilla Public License, v. 2.0': 'MPL-2.0',
  'Mozilla Public License, version 2.0': 'MPL-2.0',
  'Public Domain (UNLISCENSE)': 'Unlicense',
  'Public Domain (Unlicense)': 'Unlicense',
  'Public Domain <Unlicense>': 'Unlicense',
  'Public domain(unlicense)': 'Unlicense',
  'Public-domain (Unlicense)': 'Unlicense',
  'Standard 3-clause BSD': 'BSD-3-Clause',
  'The Unlicense': 'Unlicense',
  'UNLICENSE': 'Unlicense',
  'UNLICENSED': 'Unlicense',
  'UNLICNSE': 'Unlicense',
  'Unlicence': 'Unlicense',
  'Unlicense (http://unlicense.org/)': 'Unlicense',
  'Unlicense (see http://unlicense.org/)': 'Unlicense',
  'Unlicense': 'Unlicense',
  'Unlicensed': 'Unlicense',
  'WTF': 'WTFPL',
  'WTFGPL': 'WTFPL',
  'WTFPL 2': 'WTFPL',
  'WTFPL <http://www.wtfpl.net/>': 'WTFPL',
  'WTFPLv2': 'WTFPL',
  'WTHPL v1.0.0': 'WTFPL',
  'Wtfpl (wtfpl.net)': 'WTFPL',
  'Wtfpl': 'WTFPL',
  'ZLIB': 'Zlib',
  'Zlib': 'Zlib',
  'Zlib/libpng': 'Zlib',
  'mit': 'MIT',
  '© 2014 WTFPL – Do What the Fuck You Want to Public License.': 'WTFPL',
  'CDDL': 'CDDL-1.1',
  'license GPLv2': 'GPL-2.0'
}
/* eslint-enable max-len */

test('examples', function (test) {
  Object.keys(examples)
    .forEach(function (input) {
      var corrected = examples[input]
      test.test(input, function (test) {
        test.equal(
          correct(input),
          corrected,
          'corrects "' + input + '" to "' + corrected + '"'
        )
        if (corrected !== null) {
          test.ok(
            valid(corrected),
            '"' + corrected + '" is a valid SPDX identifier'
          )
        }
        test.end()
      })
    })
  test.end()
})

test('Empty String', function (test) {
  test.throws(function () {
    correct('')
  }, /invalid argument/i)
  test.end()
})
