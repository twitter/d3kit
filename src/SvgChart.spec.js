import { select } from 'd3-selection';
import SvgChart from './SvgChart.js';

describe('SvgChart', () => {
  let element, $element, $svg, chart;

  beforeEach(() => {
    element = document.body.appendChild(document.createElement('div'));
    chart = new SvgChart(element, null);
    $element = select(element);
    $svg = $element.select('svg');
  });

  describe('new SvgChart(element, options)', () => {
    it('should create <svg> inside the element', () => {
      expect($element.select('svg').size()).to.be.equal(1);
    });
    it('which is accessible from chart.svg', () => {
      expect(chart.svg).to.exist;
    });
    it('should create <g> inside the <svg> above', () => {
      expect($element.select('svg').select('g').size()).to.be.equal(1);
    });
    it('which is accessible from chart.rootG', () => {
      expect(chart.rootG).to.exist;
    });
  });

  describe('.getCustomEventNames()', () => {
    it('should return custom event names', () => {
      expect(chart.getCustomEventNames()).to.deep.equal([]);
    });
    it('should return custom event names', () => {
      class Chart extends SvgChart {
        static getCustomEventNames() {
          return ['custom1', 'custom2'];
        }
      }
      const chart = new Chart();
      expect(chart.getCustomEventNames()).to.deep.equal(['custom1', 'custom2']);
    });
  });

  describe('.margin(margin)', () => {
    it('should update the root <g> transform/translate', () => {
      chart
        .margin({ left: 30, top: 30 })
        .offset({ x: 0.5, y: 0.5 })
        .margin({ left: 10, top: 10 })
        .updateDimensionNow();

      const translate = chart.rootG.attr('transform');
      expect(translate).to.equal('translate(10.5,10.5)');
    });
  });

  describe('.offset(offset)', () => {
    it('should update the root <g> transform/translate', () => {
      chart
        .offset({ x: 0.5, y: 0.5 })
        .margin({ left: 10, top: 10 })
        .offset({ x: 2, y: 3 })
        .updateDimensionNow();
      const translate = chart.rootG.attr('transform');
      expect(translate).to.equal('translate(12,13)');
    });
  });

  describe('.width(width)', () => {
    it('should return <svg> width when called without argument', () => {
      const w = $svg.attr('width');
      expect(chart.width()).to.equal(+w);
    });
    it('should set <svg> width when called with Number as the first argument', () => {
      chart
        .width(300)
        .updateDimensionNow();
      expect(+$svg.attr('width')).to.equal(300);
    });
  });

  describe('.height(height)', () => {
    it('should return <svg> height when called without argument', () => {
      const w = $svg.attr('height');
      expect(chart.height()).to.equal(+w);
    });
    it('should set <svg> height when called with Number as the first argument', () => {
      chart
        .height(300)
        .updateDimensionNow();
      expect(+$svg.attr('height')).to.equal(300);
    });
  });

  describe('.dimension(dimension)', () => {
    it('should return an array [width, height] when called without argument', () => {
      const dim = [+$svg.attr('width'), +$svg.attr('height')];
      expect(chart.dimension()).to.deep.equal(dim);
    });
    it('should set width and height of the <svg> when called with an array [width, height] as the first argument', done => {
      chart.dimension([118, 118]);
      setTimeout(() => {
        expect([+$svg.attr('width'), +$svg.attr('height')]).to.deep.equal([118, 118]);
        done();
      }, 0);
    });
  });
});
