const assert = require('node:assert/strict');
const path = require('node:path');
const { pathToFileURL } = require('node:url');
function check(api) {
    class ExampleId extends api.Id {
        deepCopy() { return new ExampleId(this.value()); }
        className() { return 'ExampleId'; }
    }
    const id = new ExampleId('example');
    assert.equal(id.value(), 'example');
    assert.equal(id.equalTo(id.deepCopy()), true);
    assert.deepEqual(id.violations(), []);
    assert.equal(new ExampleId('').violations()[0].stringified(), 'ExampleId: id is not specified!');
}
const pkg = require('ez-clean-kit/package.json');
assert.equal(pkg.dependencies['toolbox-ts'], '0.2.0');
assert.equal(require('toolbox-ts/package.json').version, '0.2.0');
const cjs = require('ez-clean-kit');
check(cjs);
check(require('ez-clean-kit/dist/index.js'));
const root = path.dirname(require.resolve('ez-clean-kit/package.json'));
Promise.all([
    import('ez-clean-kit'),
    import(pathToFileURL(path.join(root, pkg.module)).href)
]).then(([nodeImport, esmFile]) => {
    assert.strictEqual(nodeImport.default, cjs, 'Node bare import must expose the CommonJS API');
    check(nodeImport.default);
    check(esmFile);
    console.log('Installed ez-clean-kit: require, Node bare import via CommonJS, and explicit ESM file passed.');
}).catch(error => { console.error(error); process.exitCode = 1; });
