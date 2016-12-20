import { select } from 'd3-selection';
import HybridChart from './HybridChart.js';
import CanvasPlate from '../plates/CanvasPlate.js';
import SvgPlate from '../plates/SvgPlate.js';

describe('HybridChart', () => {
  let element, $element, $canvas, chart;

  beforeEach(() => {
    element = document.body.appendChild(document.createElement('div'));
    chart = new HybridChart(element, null);
  });

  describe('new HybridChart(element, options)', () => {
    it('has a CanvasPlate accessible from this.plates.canvas', () => {
      expect(chart.plates.canvas).to.be.instanceof(CanvasPlate);
    });
    it('should create <canvas> inside the container, accessible as chart.canvas', () => {
      expect(chart.canvas).to.exist;
      expect(chart.container.select('canvas').node()).to.equal(chart.canvas.node());
    });

    it('has an SvgPlate accessible from this.plates.svg', () => {
      expect(chart.plates.svg).to.be.instanceof(SvgPlate);
    });
    it('should create <svg> inside the container, accessible from chart.svg', () => {
      expect(chart.svg).to.exist;
      expect(chart.container.select('svg').node()).to.equal(chart.svg.node());
    });
    it('should create <g> inside the <svg> above, accessible as chart.rootG', () => {
      expect(chart.rootG).to.exist;
      expect(chart.svg.select('g').node()).to.equal(chart.rootG.node());
    });
  });

  describe('.getContext2d()', () => {
    it('should return context2d from canvas', () => {
      const ctx = chart.getContext2d();
      expect(ctx).to.exist;
      expect(ctx).to.be.instanceof(CanvasRenderingContext2D);
    });
  });

  describe('.clear()', () => {
    it('should clear canvas and return this', () => {
      const returnValue = chart.clear();
      expect(returnValue).to.equal(chart);
    });
  });
});
