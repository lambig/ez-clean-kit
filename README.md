# ez-clean-kit

## Package entry points

In Node.js, both `require('ez-clean-kit')` and a bare package import use
the CommonJS `main` entry. For an ES module consumer, use the default import:

```javascript
import kit from 'ez-clean-kit';
const { Id, DomainPrimitive } = kit;
```

The `module` field describes the separate ESM build for bundlers that honor
that field. Node does not use it when resolving the package name. Package tests
check Node's bare import through CommonJS and separately import the ESM file
to verify that artifact; they do not certify a particular bundler integration.
Existing subpath imports and `package.json` access remain available without an
`exports` map.

See [Node package entry points](https://nodejs.org/api/packages.html#package-entry-points).

## Webpack bundle

Run `npm ci`, `npm run build:webpack`, then `npm run test:webpack`.
Webpack generates a CommonJS JavaScript library at `dist/index.js`.
From the repository root, load its API with:

```javascript
const { Id, DomainPrimitive } = require('./dist/index.js');
```

The consumer check loads this exact file and exercises exported domain types,
identity comparison and validation. The root TypeScript source is retained in
the package, while the package-name entry uses compiled CommonJS. The webpack
bundle is also available as `require('ez-clean-kit/dist/index.js')`.
