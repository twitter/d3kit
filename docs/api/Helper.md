> [Docs](README.md) ▸ [API Reference](index.md) ▸ **helper**

## helper

These functions were originally collected from multiple places (jQuery, lodash, ...) for usage in d3Kit core library. Since they are also useful for building visualizations in general, we also expose them to the API.

<a name="extend" href="#extend">#</a> d3Kit.helper.**extend**(*target*[*, obj1*][*, obj2*], ...)

Merge the contents of two or more objects together into the first object.

Works similarly to `jQuery.extend(target, obj1, obj2, ...)`

<a name="deepExtend" href="#deepExtend">#</a> d3Kit.helper.**deepExtend**(*target*[*, obj1*][*, obj2*], ...)

Recursively merge the contents of two or more objects together into the first object.

Works similarly to `jQuery.extend(true, target, obj1, obj2, ...)`
