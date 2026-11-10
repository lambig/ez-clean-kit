# ez-clean-kit

## Webpack bundle

Run `npm ci`, `npm run build:webpack`, then `npm run test:webpack`.
Webpack generates a CommonJS JavaScript library at `dist/index.js`.
From the repository root, load its API with:

```javascript
const { Id, DomainPrimitive } = require('./dist/index.js');
```

The consumer check loads this exact file and exercises exported domain types,
identity comparison and validation. The package's existing TypeScript entry
and separate CJS/ESM builds are unchanged; this path is for the webpack bundle.
