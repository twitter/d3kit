> [Docs](./index.md) ▸ **Getting started**

### Download the library

You can get the package from npm or bower.
It depends on `d3-selection` and `d3-dispatch` from [D3.js](http://d3js.org/) v4.

#### npm

```bash
npm install d3 d3kit --save
# or to be more specific
npm install d3-selection d3-dispatch d3kit --save
```

#### bower

```bash
bower install d3 d3kit --save
```

### Add to your project

**d3Kit** was packaged as UMD (Universal Module Definition). You can use it via:

#### Option 1: Global (Simple script tag)

```html
<script src="path/to/d3.min.js"></script>
<script src="path/to/d3kit.min.js"></script>
```

d3Kit will be available as `d3Kit`.

#### Option 2: ES6 import

```javascript
import { SvgChart, CanvasChart } from 'd3kit';
```

#### Option 3: AMD (requirejs)

```javascript
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

#### Option 4: commonjs (browserify)

```javascript
var d3Kit = require('d3kit');
```