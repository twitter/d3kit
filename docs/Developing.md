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

To run in development mode

```bash
npm run dev
```

See your site at [localhost:7000](http://localhost:7000). It will automagically refresh when you change the code (via browsersync).

### Test

```bash
# Run this command to test once.
npm run test
# Or run this command to test and retest when files are changed.
npm run tdd
```

Test coverage will be generated to ```coverage``` directory.

