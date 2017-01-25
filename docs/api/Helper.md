> [Docs](../index.md) ▸ [API Reference](index.md) ▸ **helper**

# helper

These functions were originally collected from multiple places (jQuery, lodash, ...) for usage in d3Kit core library. Since they are also useful for building visualizations in general, we also expose them to the API.

* [helper.debounce(func, delay)](https://lodash.com/docs/4.16.4#debounce) - returns a debounced function with given delay.
* [helper.deepExtend(dest, src1, src2, ...)](Helper.md#deepExtend) - Recursively merge the contents of two or more objects together into the first object. Works similarly to `jQuery.extend(true, target, obj1, obj2, ...)`
* [helper.extend(dest, src1, src2, ...)](Helper.md#extend) - Merge the contents of two or more objects together into the first object. Works similarly to `jQuery.extend(target, obj1, obj2, ...)`
* [helper.functor(valueOrFunc)](https://github.com/d3/d3-3.x-api-reference/blob/master/Internals#functor) - If value is not a function, returns a function that returns the value. Otherwise returns the function.
* [helper.isObject(value)](https://lodash.com/docs/4.16.4#isObject) - returns `true` if value is an object.
* [helper.isFunction(value)](https://lodash.com/docs/4.16.4#isFunction) - returns `true` if value is a function.
* [helper.kebabCase(string)](https://lodash.com/docs/4.16.4#kebabCase) - converts any string into `kebab-case`
* [helper.throttle(func, delay)](https://lodash.com/docs/4.16.4#throttle) - returns a throttled function with given delay.
