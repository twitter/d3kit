## D3Kit

D3Kit is a set of tools to speed D3 related project development. Examples of how to use D3Kit can be found in the d3kit_examples repository.

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

- Run grunt to automatically build the D3Kit distribution when one of the source files has changed.

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
- examples

## Change logs

v0.1.0 - First version
