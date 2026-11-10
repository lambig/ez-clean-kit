const fs = require('node:fs');
const path = require('node:path');
const root = path.resolve(__dirname, '../dist-esm');
function visit(dir) {
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
        const file = path.join(dir, entry.name);
        if (entry.isDirectory()) visit(file);
        else if (entry.name.endsWith('.js')) {
            const source = fs.readFileSync(file, 'utf8');
            // TypeScript 4.x preserves extensionless relative module specifiers.
            fs.writeFileSync(file, source.replace(/(\bfrom\s+['"])(\.[^'"]+)(['"])/g,
                (_, before, specifier, after) => before + specifier + (path.extname(specifier) ? '' : '.js') + after));
        }
    }
}
visit(root);
fs.writeFileSync(path.join(root, 'package.json'), '{"type":"module"}\n');
