import { select } from 'd3-selection';
import { dispatch } from 'd3-dispatch';
import debounce from 'lodash/debounce.js';
import FitWatcher from 'slimfit/src/FitWatcher.js';
import Fitter from 'slimfit/src/Fitter.js';
import LayerOrganizer from './layerOrganizer.js';
import { deepExtend, extend } from './helper.js';

class SkeletonSvg {
  static getCustomEventNames() {
    return [];
  }

  constructor(selector, options, moreOptions) {
    const mergedOptions = deepExtend(
      {},
      SkeletonSvg.DEFAULT_OPTIONS,
      options,
      moreOptions
    );

    this.state = {
      width: mergedOptions.initialWidth,
      height: mergedOptions.initialHeight,
      innerWidth: 0,
      innerHeight: 0,
      fitOptions: null,
      options: mergedOptions,
      data: null,
    };

    this.container = select(selector);
    this.svg = this.container.append('svg');
    this.rootG = this.svg.append('g');
    this.layers = new LayerOrganizer(this.rootG);

    const customEvents = this.constructor.getCustomEventNames();
    this.setupDispatcher(customEvents);

    this.updateDimension = debounce(this.updateDimension.bind(this), 1);
    this.dispatchData = debounce(this.dispatchData.bind(this), 1);
    this.dispatchOptions = debounce(this.dispatchOptions.bind(this), 1);
    this.dispatchResize = debounce(this.dispatchResize.bind(this), 1);

    this.updateDimensionNow();
  }

  setupDispatcher(customEventNames = []) {
    this.customEventNames = customEventNames;
    this.eventNames = SkeletonSvg.DEFAULT_EVENTS.concat(customEventNames);
    this.dispatcher = dispatch.apply(this, this.eventNames);
  }

  getCustomEventNames() {
    return this.customEventNames;
  }

  getInnerWidth() {
    return this.state.innerWidth;
  }

  getInnerHeight() {
    return this.state.innerHeight;
  }

  width(...args) {
    if (args.length === 0) return this.state.width;
    const newValue = Math.floor(+args[0]);
    if (newValue !== this.state.width) {
      this.state.width = newValue;
      this.updateDimension();
      this.dispatchResize();
    }
    return this;
  }

  height(...args) {
    if (args.length === 0) return this.state.height;
    const newValue = Math.floor(+args[0]);
    if (newValue !== this.state.height) {
      this.state.height = newValue;
      this.updateDimension();
      this.dispatchResize();
    }
    return this;
  }

  dimension(...args) {
    if (args.length === 0) {
      return [this.state.width, this.state.height];
    }
    const [w, h] = args[0];
    this.width(w).height(h);
    return this;
  }

  data(...args) {
    if (args.length === 0) return this.state.data;
    const [newData] = args;
    this.state.data = newData;
    this.dispatchData();
    return this;
  }

  margin(...args) {
    if (args.length === 0) return this.state.options.margin;
    const oldMargin = this.state.options.margin;
    const newMargin = extend({}, this.state.options.margin, args[0]);
    const changed = Object.keys(oldMargin)
      .some(field => oldMargin[field] !== newMargin[field]);
    if (changed) {
      this.state.options.margin = newMargin;
      this.updateDimension();
      this.dispatchResize();
    }
    return this;
  }

  offset(...args) {
    if (args.length === 0) return this.state.options.offset;
    const oldOffset = this.state.options.offset;
    const newOffset = Object.assign({}, this.state.offset, args[0]);
    const changed = Object.keys(oldOffset)
      .some(field => oldOffset[field] !== newOffset[field]);
    if (changed) {
      this.state.options.offset = newOffset;
      this.updateDimension();
      this.dispatchResize();
    }
    return this;
  }

  options(...args) {
    if (args.length === 0) return this.state.options;
    const [newOptions] = args;
    if (newOptions.margin) {
      this.margin(newOptions.margin);
    }
    if (newOptions.offset) {
      this.offset(newOptions.offset);
    }
    this.state.options = deepExtend(this.state.options, newOptions);
    this.dispatchOptions();
    return this;
  }

  updateDimension() {
    const { width, height } = this.state;
    const { offset, margin } = this.state.options;
    const { top, right, bottom, left } = margin;

    this.state.innerWidth = width - left - right;
    this.state.innerHeight = height - top - bottom;

    this.svg
      .attr('width', width)
      .attr('height', height);

    this.rootG.attr(
      'transform',
      `translate(${left + offset.x},${top + offset.y})`
    );

    return this;
  }

  updateDimensionNow() {
    this.updateDimension();
    this.updateDimension.flush();
    return this;
  }

  hasData() {
    const { data } = this.state;
    return data !== null && data !== undefined;
  }

  hasNonZeroArea() {
    const { innerWidth, innerHeight } = this.state;
    return (innerWidth > 0 && innerHeight > 0);
  }

  fit(fitOptions) {
    if (fitOptions) {
      this.state.fitOptions = fitOptions;
    }

    const fitter = new Fitter(fitOptions);
    const { changed, dimension } = fitter.fit(
      this.svg.node(),
      this.container.node()
    );

    if (changed) {
      this.dimension([dimension.width, dimension.height]);
    }
    return this;
  }

  autoFit(enable, fitOptions, watchOptions) {
    if (fitOptions) {
      this.state.fitOptions = fitOptions;
    }
    if (watchOptions) {
      this.state.watchOptions = watchOptions;
    }
    if (enable) {
      if (this.fitWatcher) {
        this.fitWatcher.destroy();
      }
      this.fitWatcher = new FitWatcher(
        this.svg.node(),
        this.container.node(),
        this.state.fitOptions,
        this.state.watchOptions
      )
        .on('change', dim => this.dimension([dim.width, dim.height]))
        .start();
    } else if (this.fitWatcher) {
      this.fitWatcher.destroy();
      this.fitWatcher = null;
    }
    return this;
  }

  dispatchData() {
    this.dispatcher.call('data', this, this.state.data);
    return this;
  }

  dispatchOptions() {
    this.dispatcher.call('options', this, this.state.options);
    return this;
  }

  dispatchResize() {
    const { width, height, innerWidth, innerHeight } = this.state;
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
    this.eventNames.forEach(name => {
      this.off(name);
    });

    if (this.fitWatcher) {
      this.fitWatcher.destroy();
      this.fitWatcher = null;
    }
  }
}

SkeletonSvg.DEFAULT_OPTIONS = {
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

SkeletonSvg.DEFAULT_EVENTS = ['data', 'options', 'resize'];

export default SkeletonSvg;
