# 📦 Artifacts and Caching in GitHub Actions

## Artifact

### Definition

Artifact GitHub Actions me workflow ke dauran generate hui files ko store karne ke liye use hota hai.

### Use

* Build files save karna
* Test reports store karna
* Logs preserve karna

### Example

Build ke baad `dist` folder ko artifact ke roop me upload karna.

### Syntax

```yaml
- name: Upload Build Artifact
  uses: actions/upload-artifact@v4
  with:
    name: react-build
    path: dist
```

---

## Cache

### Definition

Cache frequently used dependencies ko save karta hai taaki next workflow run me unhe dobara download na karna pade.

### Use

* npm packages cache karna
* Build time reduce karna
* Dependency installation fast karna

### Example

`package-lock.json` ke basis par npm dependencies cache karna.

### Syntax

```yaml
- name: Setup Node.js
  uses: actions/setup-node@v4
  with:
    node-version: 22
    cache: npm
    cache-dependency-path: package-lock.json
```

---

## Example Workflow

```yaml
name: Build React App

on:
  push:
    branches:
      - main

jobs:
  build:
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v4

      - uses: actions/setup-node@v4
        with:
          node-version: 22
          cache: npm
          cache-dependency-path: package-lock.json

      - run: npm install

      - run: npm run build

      - uses: actions/upload-artifact@v4
        with:
          name: react-build
          path: dist
```
