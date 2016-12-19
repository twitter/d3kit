import { select } from 'd3-selection';
import { dispatch } from 'd3-dispatch';
import FitWatcher from 'slimfit/src/FitWatcher.js';
import Fitter from 'slimfit/src/Fitter.js';
import Base from '../Base.js';
import { debounce, deepExtend, extend, isObject } from '../helper.js';

class AbstractChart extends Base {
  static getCustomEventNames() {
    return [];
  }

  constructor(selector, ...options) {
    super(...options);

    extend(this._state, {
      innerWidth: 0,
      innerHeight: 0,
      fitOptions: null,
      data: null,
      plates: []
    });

    this.container = select(selector);
    // Enforce line-height = 0 to fix issue with height resizing
    // https://github.com/twitter/d3kit/issues/13
    this.container.style('line-height', 0);

    this.chartRoot = this.container.append('div')
      .classed('d3kit-chart-root', true)
      .style('display', 'inline-block')
      .style('position', 'relative')
      .style('line-height', 0);

    this.plates = {};

    const customEvents = this.constructor.getCustomEventNames();
    this.setupDispatcher(customEvents);

    this._dispatchData = debounce(this._dispatchData.bind(this), 1);
    this._dispatchOptions = debounce(this._dispatchOptions.bind(this), 1);
    this._dispatchResize = debounce(this._dispatchResize.bind(this), 1);
  }

  addPlate(name, plate, doNotAppend) {
    this._state.plates.push(plate);
    this.plates[name] = plate;
    if(doNotAppend) return plate;
    plate.getSelection().style('position', 'absolute');
    this.chartRoot.append(() => plate.getNode());
    return plate;
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

  data(...args) {
    if (args.length === 0) return this._state.data;
    const [newData] = args;
    this._state.data = newData;
    this._dispatchData();
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
    if (newOptions.pixelRatio) {
      this.pixelRatio(newOptions.pixelRatio);
    }
    this._state.options = deepExtend(this._state.options, newOptions);
    this._dispatchOptions();
    return this;
  }

  _updateDimension() {
    const { width, height, plates } = this._state;
    const { margin } = this._state.options;
    const { top, right, bottom, left } = margin;

    this._state.innerWidth = width - left - right;
    this._state.innerHeight = height - top - bottom;

    this.chartRoot
      .style('width', `${width}px`)
      .style('height', `${height}px`);

    plates.forEach(plate => {
      plate.copyDimension(this)
        .updateDimensionNow();
    });

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
    const fitter = new Fitter(this._state.fitOptions);
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
        // pass getter instead of value
        // because the value may change when time the watcher checks
        () => this.dimension(),
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

  dispatchAs(name) {
    const self = this;
    return function handler(...args) {
      self.dispatcher.apply(name, this, args);
    };
  }

  destroy() {
    this._eventNames.forEach(name => {
      this.off(name);
    });
    this.stopFitWatcher();
  }
}

AbstractChart.DEFAULT_EVENTS = ['data', 'options', 'resize'];

export default AbstractChart;
