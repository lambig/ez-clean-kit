const assert = require('node:assert/strict');
const kit = require('../dist/index.js');

for (const name of [
    'DomainObject', 'DomainValidation', 'PartialApplication',
    'DomainConstraintViolation', 'StringViolationMessage',
    'DomainPrimitive', 'ValueObject', 'DomainEntity', 'DomainObjects',
    'Aggregate', 'Id'
]) {
    assert.equal(typeof kit[name], 'function', `Missing bundle export: ${name}`);
}

class ExampleId extends kit.Id {
    deepCopy() { return new ExampleId(this.value()); }
    className() { return 'ExampleId'; }
}

const id = new ExampleId('example');
assert.equal(id.value(), 'example');
assert.equal(id.equalTo(id.deepCopy()), true);
assert.deepEqual(id.violations(), []);
assert.equal(new ExampleId('').violations()[0].stringified(), 'ExampleId: id is not specified!');
console.log('Webpack CommonJS bundle: exports, identity and validation passed.');
