## Usage

```javascript
var correct = require('spdx-correct')
var assert = require('assert')

assert.strictEqual(correct('mit'), 'MIT')

assert.strictEqual(correct('Apache 2'), 'Apache-2.0')

assert(correct('No idea what license') === null)

// disable upgrade option
assert(correct('GPL-3.0'), 'GPL-3.0-or-later')
assert(correct('GPL-3.0', { upgrade: false }), 'GPL-3.0')
```

## Performance Note

This package load and processes the `spdx-license-ids`
package, as well as a few other large arrays of strings,
into global variables.  That can take a few milliseconds.

If you'd prefer to postpone that processing until your
program actually invokes the exported function, consider
using `require()` or dynamic `import()` to load the package
just before you invoke it.

Special thanks to Vinicius Lourenço ([@H4ad](https://github.com/H4ad))
for investigating load times.

## Contributors

spdx-correct has benefited from the work of several contributors.
See [the GitHub repository](https://github.com/jslicense/spdx-correct.js/graphs/contributors)
for more information.
