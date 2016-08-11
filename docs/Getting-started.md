> [Wiki](Home) ▸ **Getting started**

d3Kit supports AMD (RequireJS), CommonJS (Browserify) and can also work without any.
Its only dependency is [d3.js](http://d3js.org/).

### Download the library

```
bower install d3kit
```

or

```
npm install d3kit
```

### Add to your project

#### Choice 1. Simple script tag

```
<script src="d3Kit.min.js"></script>
```

#### Choice 2: AMD

```
require.config({
  paths: {
    d3:    'path/to/d3',
    d3Kit: 'path/to/d3Kit'
  }
});
require(['d3', 'd3Kit'], function(d3, d3Kit) {
  // do something
});
```

#### Choice 3: Browserify

```
var d3Kit = require('path/to/d3Kit');
```