import { select } from 'd3-selection';
import SvgChart from './SvgChart.js';
import SvgPlate from '../plates/SvgPlate.js';

describe('SvgChart', () => {
  let element, $element, chart;

  beforeEach(() => {
    element = document.body.appendChild(document.createElement('div'));
    chart = new SvgChart(element, null);
    $element = select(element);
  });

  describe('new SvgChart(element, options)', () => {
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

  describe('.width(width)', () => {
    it('should return <svg> width when called without argument', () => {
      const w = chart.svg.attr('width');
      expect(chart.width()).to.equal(+w);
    });
    it('should set <svg> width when called with Number as the first argument', () => {
      chart
        .width(300)
        .updateDimensionNow();
      expect(+chart.svg.attr('width')).to.equal(300);
    });
  });

  describe('.height(height)', () => {
    it('should return <svg> height when called without argument', () => {
      const w = chart.svg.attr('height');
      expect(chart.height()).to.equal(+w);
    });
    it('should set <svg> height when called with Number as the first argument', () => {
      chart
        .height(300)
        .updateDimensionNow();
      expect(+chart.svg.attr('height')).to.equal(300);
    });
    it('should override line-height and set <svg> height correctly', () => {
      const element2 = document.body.appendChild(document.createElement('div'));
      element2.style.lineHeight = 1;
      const chart2 = new SvgChart(element2);
      chart2
        .height(300)
        .updateDimensionNow();
      expect(+chart2.svg.attr('height')).to.equal(300);
      expect(+chart2.container.node().clientHeight).to.equal(300);
      expect(+element2.style.lineHeight).to.equal(0);
    });
  });

});
