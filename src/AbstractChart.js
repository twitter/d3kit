import { select } from 'd3-selection';
import { dispatch } from 'd3-dispatch';
import FitWatcher from 'slimfit/src/FitWatcher.js';
import Fitter from 'slimfit/src/Fitter.js';
import { debounce, deepExtend, extend, isObject } from './helper.js';

class AbstractChart {
  static getCustomEventNames() {
    return [];
  }

  constructor(selector, ...options) {
    const mergedOptions = deepExtend(
      {},
      AbstractChart.DEFAULT_OPTIONS,
      ...options
    );

    this._state = {
      width: mergedOptions.initialWidth,
      height: mergedOptions.initialHeight,
      innerWidth: 0,
      innerHeight: 0,
      fitOptions: null,
      options: mergedOptions,
      data: null,
    };

    this.container = select(selector);

    const customEvents = this.constructor.getCustomEventNames();
    this.setupDispatcher(customEvents);

    this._dispatchData = debounce(this._dispatchData.bind(this), 1);
    this._dispatchOptions = debounce(this._dispatchOptions.bind(this), 1);
    this._dispatchResize = debounce(this._dispatchResize.bind(this), 1);
    this._updateDimension = debounce(this._updateDimension.bind(this), 1);
  }

  setupDispatcher(customEventNames = []) {
    this._customEventNames = customEventNames;
    this._eventNames = AbstractChart.DEFAULT_EVENTS.concat(customEventNames);
    this.dispatcher = dispatch.apply(this, this._eventNames);
  }

  getCustomEventNames() {
    return this._customEventNames;
  }

  getInnerWidth() {
    return this._state.innerWidth;
  }

  getInnerHeight() {
    return this._state.innerHeight;
  }

  width(...args) {
    if (args.length === 0) return this._state.width;
    const newValue = Math.floor(+args[0]);
    if (newValue !== this._state.width) {
      this._state.width = newValue;
      this._updateDimension();
      this._dispatchResize();
    }
    return this;
  }

  height(...args) {
    if (args.length === 0) return this._state.height;
    const newValue = Math.floor(+args[0]);
    if (newValue !== this._state.height) {
      this._state.height = newValue;
      this._updateDimension();
      this._dispatchResize();
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

  data(...args) {
    if (args.length === 0) return this._state.data;
    const [newData] = args;
    this._state.data = newData;
    this._dispatchData();
    return this;
  }

  margin(...args) {
    if (args.length === 0) return this._state.options.margin;
    const oldMargin = this._state.options.margin;
    const newMargin = extend({}, this._state.options.margin, args[0]);
    const changed = Object.keys(oldMargin)
      .some(field => oldMargin[field] !== newMargin[field]);
    if (changed) {
      this._state.options.margin = newMargin;
      this._updateDimension();
      this._dispatchResize();
    }
    return this;
  }

  offset(...args) {
    if (args.length === 0) return this._state.options.offset;
    const oldOffset = this._state.options.offset;
    const newOffset = extend({}, this._state.offset, args[0]);
    const changed = Object.keys(oldOffset)
      .some(field => oldOffset[field] !== newOffset[field]);
    if (changed) {
      this._state.options.offset = newOffset;
      this._updateDimension();
      this._dispatchResize();
    }
    return this;
  }

  options(...args) {
    if (args.length === 0) return this._state.options;
    const [newOptions] = args;
    if (newOptions.margin) {
      this.margin(newOptions.margin);
    }
    if (newOptions.offset) {
      this.offset(newOptions.offset);
    }
    this._state.options = deepExtend(this._state.options, newOptions);
    this._dispatchOptions();
    return this;
  }

  _updateDimension() {
    const { width, height } = this._state;
    const { margin } = this._state.options;
    const { top, right, bottom, left } = margin;

    this._state.innerWidth = width - left - right;
    this._state.innerHeight = height - top - bottom;

    return this;
  }

  updateDimensionNow() {
    this._updateDimension();
    this._updateDimension.flush();
    return this;
  }

  hasData() {
    const { data } = this._state;
    return data !== null && data !== undefined;
  }

  hasNonZeroArea() {
    const { innerWidth, innerHeight } = this._state;
    return (innerWidth > 0 && innerHeight > 0);
  }

  fit(fitOptions, watchOptions = false) {
    if (fitOptions) {
      this._state.fitOptions = fitOptions;
    }

    // Fit once
    const fitter = new Fitter(fitOptions);
    const { changed, dimension } = fitter.fit(
      this.dimension(),
      this.container.node()
    );

    if (changed) {
      this.dimension([dimension.width, dimension.height]);
    }

    // Setup watcher
    const enable = !!watchOptions;
    if (enable) {
      if (this.fitWatcher) {
        this.fitWatcher.destroy();
      }
      this.fitWatcher = new FitWatcher(
        this.dimension(),
        this.container.node(),
        this._state.fitOptions,
        isObject(watchOptions) ? watchOptions : null
      )
        .on('change', dim => this.dimension([dim.width, dim.height]))
        .start();
    }

    return this;
  }

  stopFitWatcher() {
    if (this.fitWatcher) {
      this.fitWatcher.destroy();
      this.fitWatcher = null;
    }
    return this;
  }

  _dispatchData() {
    this.dispatcher.call('data', this, this._state.data);
    return this;
  }

  _dispatchOptions() {
    this.dispatcher.call('options', this, this._state.options);
    return this;
  }

  _dispatchResize() {
    const { width, height, innerWidth, innerHeight } = this._state;
    this.dispatcher.apply('resize', this, [width, height, innerWidth, innerHeight]);
    return this;
  }

  on(name, listener) {
    this.dispatcher.on(name, listener);
    return this;
  }

  off(name) {
    this.dispatcher.on(name, null);
    return this;
  }

  destroy() {
    this._eventNames.forEach(name => {
      this.off(name);
    });
    this.stopFitWatcher();
  }
}

AbstractChart.DEFAULT_OPTIONS = {
  initialWidth: 720,
  initialHeight: 500,
  margin: {
    top: 30,
    right: 30,
    bottom: 30,
    left: 30,
  },
  offset: {
    x: 0.5,
    y: 0.5,
  },
};

AbstractChart.DEFAULT_EVENTS = ['data', 'options', 'resize'];

export default AbstractChart;
