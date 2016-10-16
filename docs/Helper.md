> [Docs](README.md) ▸ [API Reference](API.md) ▸ **helper**

## helper

These functions were originally collected from multiple places (jQuery, lodash, ...) for usage in d3Kit core library. Since they are also useful for building visualizations in general, we also expose them to the API.

<a name="debounce" href="Helper#debounce">#</a> d3Kit.helper.**debounce**(*fn*, *wait*, *immediate*)

Return a function, that, as long as it continues to be invoked, will not be triggered.
The function will be called after it stops being called for ```wait``` milliseconds.

If ```immediate``` is passed, trigger the function on the leading edge, instead of the trailing.

The output function can be called with .now() to execute immediately

```
var doSomething = d3Kit.helper.debounce(function(){...}, 10);
doSomething(params); // will debounce
doSomething.flush(); // to make it execute immediately
```

<a name="extend" href="Helper#extend">#</a> d3Kit.helper.**extend**(*target*[*, obj1*][*, obj2*], ...)

Merge the contents of two or more objects together into the first object.

Works similarly to jQuery.extend(target, obj1, obj2, ...)

<a name="deepExtend" href="Helper#deepExtend">#</a> d3Kit.helper.**deepExtend**(*target*[*, obj1*][*, obj2*], ...)

Recursively merge the contents of two or more objects together into the first object.

Works similarly to jQuery.extend(true, target, obj1, obj2, ...)
