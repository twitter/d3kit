## D3Kit

D3Kit is a set tools to speed D3 related project development.  Examples of how to use D3Kit can be found in the d3kit_examples repository.

To develop D3Kit:

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

- Run grunt to automatically build the D3Kit distribution when one of the files change

```
  grunt
```

- Run unit test

```
grunt karma
```

- Build library once

```
grunt build
```

- See all available grunt tasks:

```
  grunt --help
```

## TODO

- documentation
- chartlet

## Change logs

v0.1.0 - First version
v0.2.0 - Remove jquery dependency. Resize to fit container now fill to parent's width instead of innerWidth (doesn't care about padding)