> [Docs](README.md) ▸ **Developing d3Kit**

### One-time setup

1) Install these command line tools:

- bower   -- http://bower.io/
- node.js -- http://nodejs.org/

2) Load development tool and javascript dependencies:

```
npm install
bower install
```

### Normal workflow

- Run grunt to automatically build the D3Kit distribution when one of the source files has changed.

```
grunt
```

- Run unit test. This will run once, then watch for file changes and re-run the tests automatically.

```
grunt test
```

- Build library once (will create files in the dist folder)

```
grunt build
```

- See all available grunt tasks:

```
grunt --help
```

### Releasing

Use one of these commands to build, bump version and push tags (bower use tags to keep track of versions).

```
npm version patch // will add version by 0.0.1
npm version minor // will add version by 0.1
npm version major // will add version by 1
```

If everything looks good, then

```
npm publish
```
