# Change logs

## v2.x.x

### 2.0.2 (2016-10-21)

Moves `d3-selection` and `d3-dispatch` to `dependencies` instead of `peerDependencies`.

### 2.0.1 (2016-10-21)

Fix issue #13, resizing `height` used to have issue if `line-height` is more than zero. This patch force container `line-height` to 0 to fix the problem.

### 2.0.0 (2016-08-16)

Make d3Kit compatible with D3 v4. Key changes are due to:

- Removal of `d3.functor` and `d3.rebind`. Implement helper functions as replacements.
- API changes for `d3.dispatch`. Now use `dispatch.call('x', ...)` instead of `dispatch.x(...)`

The npm package also remove `d3` from `dependencies` and add `d3-selection` and `d3-dispatch` to `peerDependencies` instead.

In terms of development, switch from grunt to gulp and webpack and prepare to migrate each module to es2015.

## v1.x.x

### 1.1.0 (2016-04-07)

Add an option to select tag type for LayerOrganizer

```javascript
new LayerOrganizer(container); //will create layers as <g> by default
new LayerOrganizer(container, 'div'); // will create layers as <div>
```

### 1.0.11 (2016-02-23)

Change main file to point to `d3kit.min.js` instead of `d3kit.js`

### 1.0.10 (2016-02-17)

Update D3 version in the dependencies to 3.5.16

