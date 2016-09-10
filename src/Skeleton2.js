import { select } from 'd3-selection';
import { dispatch } from 'd3-dispatch';
import LayerOrganizer from './layerOrganizer.js';
import helper from './helper.js';

class Skeleton {
  constructor(selector, options) {
    const mergedOptions = helper.deepExtend({
      initialWidth: 720,
      initialHeight: 500
    }, options);

    this.state = {
      width: mergedOptions.initialWidth,
      height: mergedOptions.initialHeight,
      innerWidth: 0,
      innerHeight: 0,
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
      autoFit: false,
      fitOptions: null,
      options: mergedOptions,
      data: null,
    };

    this.container = select(selector);
    this.svg = this.container.append('svg');
    this.rootG = this.svg.append('g');
    this.layers = new LayerOrganizer(this.rootG);

    this.setupDispatcher();

    this.updateDimension = helper.debounce(this.updateDimension, 0);
    this.fireEventResize = helper.debounce(this.fireEventResize, 0);

    this.updateDimension();
  }

  setupDispatcher(eventNames) {
    this.eventNames = ['data', 'options', 'resize'].concat(eventNames);
    this.dispatcher = dispatch.apply(this, this.eventNames);
  }

  getInnerWidth() {
    return this.state.innerWidth;
  }

  getInnerHeight() {
    return this.state.innerHeight;
  }

  width(...args) {
    if(args.length === 0) return this.state.width;
    const newValue = Math.floor(args[0]);
    if(newValue !== this.state.width) {
      this.state.width = newValue;
      this.updateDimension();
      this.fireEventResize();
    }
    return this;
  }

  height(...args) {
    if(args.length === 0) return this.state.height;
    const newValue = Math.floor(args[0]);
    if(newValue !== this.state.height) {
      this.state.height = newValue;
      this.updateDimension();
      this.fireEventResize();
    }
    return this;
  }

  dimension(...args) {
    if (args.length === 0) {
      return [this.state.width, this.state.height];
    }
    const [w, h] = args[0];
    this.width(w);
    this.height(h);
    return this;
  }

  margin(...args) {
    if(args.length === 0) return this.state.margin;
    const newMargin = Object.assign({}, this.state.margin, args[0]);
    const changed = Object.keys(this.state.margin).some(field => {
      return this.state.margin[field] !== newMargin[field];
    });
    if(changed) {
      this.state.margin = newMargin;
      this.updateDimension();
      this.fireEventResize();
    }
    return this;
  }

  offset(...args) {
    if(args.length === 0) return this.state.offset;
    const newOffset = Object.assign({}, this.state.ofset, args[0]);
    const changed = Object.keys(this.state.offset).some(field => {
      return this.state.offset[field] !== newOffset[field];
    });
    if(changed) {
      this.state.offset = newOffset;
      this.updateDimension();
      this.fireEventResize();
    }
    return this;
  }

  updateDimension() {
    this.state.innerWidth = this.state.width - this.state.margin.left - this.state.margin.right;
    this.state.innerHeight = this.state.height - this.state.margin.top - this.state.margin.bottom;

    this.svg
      .attr('width', this.state.width)
      .attr('height', this.state.height);

    const x = this.state.margin.left + this.state.offset.x;
    const y = this.state.margin.top + this.state.offset.y;

    this.rootG
      .attr('transform', `translate(${x}, ${y})`);

    return this;
  }

  hasData() {
    return this.state.data !== null && this.state.data !== undefined;
  }

  data(...args) {
    if(args.length === 0) return this.state.data;
    const [newData] = args;
    this.state.data = newData;
    this.dispatcher.call('data', this, newData);
    return this;
  }

  options(...args) {
    if(args.length === 0) return this.state.options;
    const [newOptions] = args;
    this.state.options = helper.deepExtend(this.state.options, newOptions);
    this.dispatcher.call('options', this, newOptions);
    return this;
  }

  hasNonZeroArea() {
    return (this.state.innerWidth > 0 && this.state.innerHeight > 0);
  }

  fit(fitOptions) {
    this.state.fitOptions = fitOptions;
    return this;
  }

  autoFit(enable, fitOptions) {
    this.state.autoFit = enable;
    if(fitOptions) {
      this.state.fitOptions = fitOptions;
    }
    return this;
  }

  fireEventResize() {
    this.dispatcher.call('resize', this, [_width, _height, _innerWidth, _innerHeight]);
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

export default Skeleton;