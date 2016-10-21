import { select } from 'd3-selection';
import CanvasChart from './CanvasChart.js';

describe('CanvasChart', () => {
  let element, $element, $canvas, chart;

  beforeEach(() => {
    element = document.body.appendChild(document.createElement('div'));
    chart = new CanvasChart(element, null);
    $element = select(element);
    $canvas = $element.select('canvas');
  });

  describe('new CanvasChart(element, options)', () => {
    it('should create <canvas> inside the element', () => {
      expect($canvas.size()).to.be.equal(1);
    });
    it('which is accessible from chart.canvas', () => {
      expect(chart.canvas).to.exist;
    });
  });

  describe('.getCustomEventNames()', () => {
    it('should return custom event names', () => {
      expect(chart.getCustomEventNames()).to.deep.equal([]);
    });
    it('should return custom event names', () => {
      class Chart extends CanvasChart {
        static getCustomEventNames() {
          return ['custom1', 'custom2'];
        }
      }
      const chart = new Chart();
      expect(chart.getCustomEventNames()).to.deep.equal(['custom1', 'custom2']);
    });
  });

  describe('.width(width)', () => {
    it('should return <canvas> width when called without argument', () => {
      const w = $canvas.attr('width');
      expect(chart.width()).to.equal(+w);
    });
    it('should set <canvas> width when called with Number as the first argument', () => {
      chart
        .width(300)
        .updateDimensionNow();
      expect(+$canvas.attr('width')).to.equal(300);
    });
  });

  describe('.height(height)', () => {
    it('should return <canvas> height when called without argument', () => {
      const w = $canvas.attr('height');
      expect(chart.height()).to.equal(+w);
    });
    it('should set <canvas> height when called with Number as the first argument', () => {
      chart
        .height(300)
        .updateDimensionNow();
      expect(+$canvas.attr('height')).to.equal(300);
    });
  });

  describe('.dimension(dimension)', () => {
    it('should return an array [width, height] when called without argument', () => {
      const dim = [+$canvas.attr('width'), +$canvas.attr('height')];
      expect(chart.dimension()).to.deep.equal(dim);
    });
    it('should set width and height of the <canvas> when called with an array [width, height] as the first argument', done => {
      chart.dimension([118, 118]);
      setTimeout(() => {
        expect([+$canvas.attr('width'), +$canvas.attr('height')]).to.deep.equal([118, 118]);
        done();
      }, 0);
    });
  });
});
