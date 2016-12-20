import { select } from 'd3-selection';
import CanvasChart from './CanvasChart.js';
import CanvasPlate from '../plates/CanvasPlate.js';

describe('CanvasChart', () => {
  let element, $element, $canvas, chart;

  beforeEach(() => {
    element = document.body.appendChild(document.createElement('div'));
    chart = new CanvasChart(element, null);
  });

  describe('new CanvasChart(element, options)', () => {
    it('should create <canvas> inside the element, which is accessible from chart.canvas', () => {
      expect(chart.canvas).to.exist;
      expect(chart.canvas.size()).to.be.equal(1);
    });
    it('has a CanvasPlate accessible from this.plates.canvas', () => {
      expect(chart.plates.canvas).to.be.instanceof(CanvasPlate);
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
