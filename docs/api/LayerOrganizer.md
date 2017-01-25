> [Docs](../index.md) ▸ [API Reference](index.md) ▸ **LayerOrganizer**

# LayerOrganizer

A utility for creating layers from a given config. If you have a habit of creating many ```<g>``` or other tags to layer your visual elements. This utility will let you create nested layers easily. For example,

```javascript
var layers = new d3Kit.LayerOrganizer(d3.select('svg'));
layers.create([{'highlight': 'cursor'}, {'graph': ['axis','content']}]);
```

will give you

```html
<svg>
  <g class="highlight-layer">
    <g class="cursor-layer"></g>
  </g>
  <g class="graph-layer">
    <g class="axis-layer"></g>
    <g class="content-layer"></g>
  </g>
</svg>
```

and you can access a d3 selection of each layer by its name.

```javascript
layers.get('highlight.cursor'); // a d3 selection of <g class="cursor-layer"></g>
```

This was originally written to support just `<g>` but since version 1.1.0 we have added support for other tags. Just specify the tag name in the constructor.

## Functions

<a name="constructor" href="LayerOrganizer#constructor">#</a> new **d3Kit.LayerOrganizer**(*container*[,tag])

Construct a layer organizer for the specified ```container```. ```container``` is a d3 selection of `<svg>`, `<g>`, `<div>`, etc. You can specify *tag* such as `'div'` if you want to create layers of another thing that is not `<g>`

<a name="create" href="LayerOrganizer#create">#</a> layers.**create**(*config*)

Create layer(s) of ```<g>``` within the container. If ```config``` is

* *String* - Create one ```<g class="[config]-layer">```
* *Array* - Create each ```<g class="[value]-layer">``` for each string value in the array. If the value is an Object, will use the Object construction rule below.
* *Object* - For each (key,value) pair, create ```<g class="[key]-layer">```, then create layer(s) inside the new ```g.[key]-layer``` depends on the type of the value (string, Array or Object).

<a name="get" href="LayerOrganizer#get">#</a> layers.**get**(*name*)

Retrieve a layer by ```name``` (*string*). If a layer is nested under one or more layer(s), add its parent names as prefixes, separated by dot. For example, ```layers.get('highlight.cursor')``` will return the ```g.cursor-layer``` that is nested under ```g.highlight-layer```.


<a name="has" href="LayerOrganizer#has">#</a> layers.**has**(*name*)

Check if there is a layer with the specified ```name``` (*string*). Use the same name format with [layers.get](#get)