const fs = require('node:fs');
const path = require('node:path');
const root = path.resolve(__dirname, '..');
for (const name of ['dist-cjs', 'dist-esm', 'dist']) {
    const target = path.resolve(root, name);
    if (path.dirname(target) !== root) throw new Error('Build path escaped repository');
    fs.rmSync(target, { recursive: true, force: true });
}
