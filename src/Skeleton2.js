import { select } from 'd3-selection';
import { dispatch } from 'd3-dispatch';
import debounce from 'lodash/debounce.js';
import FitWatcher from 'slimfit/src/FitWatcher.js';
import Fitter from 'slimfit/src/Fitter.js';
import LayerOrganizer from './layerOrganizer.js';
import helper from './helper.js';

class Skeleton {
  constructor(selector, options, customEvents) {
    const mergedOptions = helper.deepExtend({}, Skeleton.DEFAULT_OPTIONS, options);

    this.state = {
      width: mergedOptions.initialWidth,
      height: mergedOptions.initialHeight,
      innerWidth: 0,
      innerHeight: 0,
      autoFit: false,
      fitOptions: null,
      options: mergedOptions,
      data: null,
    };

    this.customEvents = customEvents;
    this.container = select(selector);
    this.svg = this.container.append('svg');
    this.rootG = this.svg.append('g');
    this.layers = new LayerOrganizer(this.rootG);

    this.setupDispatcher(customEvents);

    this.updateDimension = debounce(this.updateDimension.bind(this), 1);
    this.dispatchData = debounce(this.dispatchData.bind(this), 1);
    this.dispatchOptions = debounce(this.dispatchOptions.bind(this), 1);
    this.dispatchResize = debounce(this.dispatchResize.bind(this), 1);

    this.updateDimension();
  }

  setupDispatcher(eventNames) {
    this.eventNames = Skeleton.DEFAULT_EVENTS.concat(eventNames);
    this.dispatcher = dispatch.apply(this, this.eventNames);
  }

  getCustomEventNames() {
    return this.customEvents;
  }

  getInnerWidth() {
    return this.state.innerWidth;
  }

  getInnerHeight() {
    return this.state.innerHeight;
  }

  width(...args) {
    if(args.length === 0) return this.state.width;
    const newValue = Math.floor(+args[0]);
    if(newValue !== this.state.width) {
      this.state.width = newValue;
      this.updateDimension();
      this.dispatchResize();
    }
    return this;
  }

  height(...args) {
    if(args.length === 0) return this.state.height;
    const newValue = Math.floor(+args[0]);
    if(newValue !== this.state.height) {
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
    if(args.length === 0) return this.state.data;
    const [newData] = args;
    this.state.data = newData;
    this.dispatchData();
    return this;
  }

  margin(...args) {
    if(args.length === 0) return this.state.options.margin;
    const oldMargin = this.state.options.margin;
    const newMargin = Object.assign({}, this.state.options.margin, args[0]);
    const changed = Object.keys(oldMargin).some(field => {
      return oldMargin[field] !== newMargin[field];
    });
    if(changed) {
      this.state.options.margin = newMargin;
      this.updateDimension();
      this.dispatchResize();
    }
    return this;
  }

  offset(...args) {
    if(args.length === 0) return this.state.options.offset;
    const oldOffset = this.state.options.offset;
    const newOffset = Object.assign({}, this.state.offset, args[0]);
    const changed = Object.keys(oldOffset).some(field => {
      return oldOffset[field] !== newOffset[field];
    });
    if(changed) {
      this.state.options.offset = newOffset;
      this.updateDimension();
      this.dispatchResize();
    }
    return this;
  }

  options(...args) {
    if(args.length === 0) return this.state.options;
    const [newOptions] = args;
    if(newOptions.margin) {
      this.margin(newOptions.margin);
    }
    if(newOptions.offset) {
      this.offset(newOptions.offset);
    }
    this.state.options = helper.deepExtend(this.state.options, newOptions);
    this.dispatchOptions();
    return this;
  }

  updateDimension() {
    const {width, height} = this.state;
    const {offset, margin} = this.state.options;
    const {top, right, bottom, left} = margin;

    this.state.innerWidth = width - left - right;
    this.state.innerHeight = height - top - bottom;

    this.svg
      .attr('width', width)
      .attr('height', height);

    const x = left + offset.x;
    const y = top + offset.y;

    this.rootG
      .attr('transform', `translate(${x},${y})`);

    return this;
  }

  hasData() {
    return this.state.data !== null && this.state.data !== undefined;
  }

  hasNonZeroArea() {
    return (this.state.innerWidth > 0 && this.state.innerHeight > 0);
  }

  fit(fitOptions) {
    if(fitOptions) {
      this.state.fitOptions = fitOptions;
    }

    const fitter = new Fitter(fitOptions);
    const {changed, dimension} = fitter.fit(
      this.svg.node(),
      this.container.node()
    );

    if(changed) {
      this.dimension([dimension.width, dimension.height]);
    }
    return this;
  }

  autoFit(enable, fitOptions, watchOptions) {
    this.state.autoFit = enable;
    if(fitOptions) {
      this.state.fitOptions = fitOptions;
    }
    if(enable) {
      if(this.fitWatcher) {
        this.fitWatcher.destroy();
      }
      this.fitWatcher = new FitWatcher(
        this.svg.node(),
        this.container.node(),
        this.state.fitOptions,
        watchOptions
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
    const {width, height, innerWidth, innerHeight} = this.state;
    this.dispatcher.call('resize', this, [width, height, innerWidth, innerHeight]);
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
}

Skeleton.DEFAULT_OPTIONS = {
  initialWidth: 720,
  initialHeight: 500,
  margin: {
    top: 30,
    right: 30,
    bottom: 30,
    left: 30
  },
  offset: {
    x: 0.5,
    y: 0.5,
  },
};

Skeleton.DEFAULT_EVENTS = ['data', 'options', 'resize'];

export default Skeleton;