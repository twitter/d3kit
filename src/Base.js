import { debounce, deepExtend, extend } from './helper.js';

class Base {
  static getDefaultOptions(...options) {
    return deepExtend({
      initialWidth: 720,
      initialHeight: 500,
      margin: {
        top: 30,
        right: 30,
        bottom: 30,
        left: 30,
      },
      offset: [0.5, 0.5],
      pixelRatio: window.devicePixelRatio || 1,
    }, ...options);
  }

  constructor(...options) {
    const mergedOptions = deepExtend(
      this.constructor.getDefaultOptions(),
      ...options
    );

    this._state = {
      width: mergedOptions.initialWidth,
      height: mergedOptions.initialHeight,
      options: mergedOptions,
    };

    this._updateDimension = debounce(this._updateDimension.bind(this), 1);
  }

  copyDimension(another) {
    if (another) {
      const { width, height } = another._state;
      const { offset, margin, pixelRatio } = another._state.options;

      deepExtend(this._state, {
        width,
        height,
        options: {
          offset: offset.concat(),
          margin,
          pixelRatio,
        },
      });
      this._updateDimension();
    }
    return this;
  }

  width(...args) {
    if (args.length === 0) return this._state.width;
    const newValue = Math.floor(+args[0]);
    if (newValue !== this._state.width) {
      this._state.width = newValue;
      this._updateDimension();
    }
    return this;
  }

  height(...args) {
    if (args.length === 0) return this._state.height;
    const newValue = Math.floor(+args[0]);
    if (newValue !== this._state.height) {
      this._state.height = newValue;
      this._updateDimension();
    }
    return this;
  }

  dimension(...args) {
    if (args.length === 0) {
      return [this._state.width, this._state.height];
    }
    const [w, h] = args[0];
    this.width(w).height(h);
    return this;
  }

  margin(...args) {
    if (args.length === 0) return this._state.options.margin;
    const oldMargin = this._state.options.margin;
    const newMargin = extend({}, this._state.options.margin, args[0]);
    const changed = Object.keys(newMargin)
      .some(field => oldMargin[field] !== newMargin[field]);
    if (changed) {
      this._state.options.margin = newMargin;
      this._updateDimension();
    }
    return this;
  }

  offset(...args) {
    if (args.length === 0) return this._state.options.offset;
    const newOffset = args[0];
    const [ox, oy] = this._state.options.offset;
    const [nx, ny] = newOffset;
    if (ox !== nx || oy !== ny) {
      this._state.options.offset = newOffset;
      this._updateDimension();
    }
    return this;
  }

  pixelRatio(...args) {
    if (args.length === 0) return this._state.options.pixelRatio;
    const newValue = +args[0];
    if (newValue !== this._state.options.pixelRatio) {
      this._state.options.pixelRatio = newValue;
      this._updateDimension();
    }
    return this;
  }

  _updateDimension() {
    // Intentionally do nothing
    // Subclasses can override this function
    return this;
  }

  updateDimensionNow() {
    this._updateDimension();
    this._updateDimension.flush();
    return this;
  }
}

export default Base;
