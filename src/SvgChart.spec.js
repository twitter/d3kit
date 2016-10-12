import { select } from 'd3-selection';
import SvgChart from './SvgChart.js';

describe('SvgChart', () => {
  let element, $element, $svg, svgChart;

  beforeEach(() => {
    element = document.body.appendChild(document.createElement('div'));
    svgChart = new SvgChart(element, null);
    $element = select(element);
    $svg = $element.select('svg');
  });

  describe('new SvgChart(element, options)', () => {
    it('should create <svg> inside the element', () => {
      expect($element.select('svg').size()).to.be.equal(1);
    });
    it('which is accessible from svgChart.svg', () => {
      expect(svgChart.svg).to.exist;
    });
    it('should create <g> inside the <svg> above', () => {
      expect($element.select('svg').select('g').size()).to.be.equal(1);
    });
    it('which is accessible from svgChart.rootG', () => {
      expect(svgChart.rootG).to.exist;
    });
    it('should create a dispatcher as svgChart.dispatcher', () => {
      const dispatcher = svgChart.dispatcher;
      expect(dispatcher).to.be.an('Object');
      expect(dispatcher.call).to.be.a('Function');
    });
  });

  describe('.getCustomEventNames()', () => {
    it('should return custom event names', () => {
      expect(svgChart.getCustomEventNames()).to.deep.equal([]);
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

  describe('.getInnerWidth()', () => {
    it('should return width of the svgChart excluding margin', () => {
      svgChart
        .width(100)
        .options({
          margin: { left: 10, right: 10 },
        })
        .updateDimensionNow();
      expect(svgChart.getInnerWidth()).to.equal(80);
    });
  });

  describe('.getInnerHeight()', () => {
    it('should return height of the svgChart excluding margin', () => {
      svgChart
        .height(100)
        .options({
          margin: { top: 10, bottom: 20 },
        })
        .updateDimensionNow();
      expect(svgChart.getInnerHeight()).to.equal(70);
    });
  });

  describe('.data(data)', () => {
    it('should return data when called without argument', () => {
      svgChart.data({ a: 1 });
      expect(svgChart.data()).to.deep.equal({ a: 1 });
    });
    it('should set data when called with at least one argument', () => {
      svgChart.data('test');
      expect(svgChart.data()).to.equal('test');
    });
    it('after setting, should dispatch "data" event', done => {
      svgChart.on('data.test', () => {
        // This block should be reached to pass the test.
        done();
      });
      svgChart.data({ a: 1 });
    });
  });

  describe('.options(options)', () => {
    it('should return options when called without argument', () => {
      svgChart.options({ a: 2 });
      expect(svgChart.options()).to.include.key('a');
      expect(svgChart.options().a).to.equal(2);
    });
    it('should set options when called with at least one argument', () => {
      svgChart.options({ a: 1 });
      expect(svgChart.options()).to.include.key('a');
      expect(svgChart.options().a).to.equal(1);
    });
    it('should not overwrite but extend existing options when setting', () => {
      svgChart.options({ a: 1 });
      svgChart.options({ b: 2 });
      expect(svgChart.options()).to.include.keys(['a', 'b']);
      expect(svgChart.options().a).to.equal(1);
      expect(svgChart.options().b).to.equal(2);
    });
    it('after setting, should dispatch "options" event', done => {
      svgChart.on('options.test', () => {
        // This block should be reached to pass the test.
        expect(true).to.be.true;
        done();
      });
      svgChart.options({ a: 1 });
    });
  });

  describe('.margin(margin)', () => {
    it('should return margin when called without argument', () => {
      const margin = { left: 10, right: 10, top: 10, bottom: 10 };
      svgChart.margin(margin);
      expect(svgChart.margin()).to.deep.equal(margin);
    });
    it('should set margin when called with at least one argument', () => {
      const margin = { left: 10, right: 10, top: 10, bottom: 10 };
      svgChart.margin(margin);
      svgChart.margin({ left: 20 });
      expect(svgChart.margin().left).to.equal(20);
      expect(svgChart.margin().right).to.equal(10);
      svgChart.margin({ right: 20 });
      expect(svgChart.margin().right).to.equal(20);
      svgChart.margin({ top: 20 });
      expect(svgChart.margin().top).to.equal(20);
      svgChart.margin({ bottom: 20 });
      expect(svgChart.margin().bottom).to.equal(20);
    });
    it('should update innerWidth after setting margin', () => {
      svgChart
        .width(100)
        .margin({ left: 15, right: 15 })
        .updateDimensionNow();

      expect(svgChart.getInnerWidth()).to.equal(70);
    });
    it('should update innerHeight after setting margin', () => {
      svgChart
        .height(100)
        .margin({ top: 10, bottom: 10 })
        .updateDimensionNow();

      expect(svgChart.getInnerHeight()).to.equal(80);
    });
    it('should update the root <g> transform/translate', () => {
      svgChart
        .margin({ left: 30, top: 30 })
        .offset({ x: 0.5, y: 0.5 })
        .margin({ left: 10, top: 10 })
        .updateDimensionNow();

      const translate = svgChart.rootG.attr('transform');
      expect(translate).to.equal('translate(10.5,10.5)');
    });
    it('after setting, should dispatch "resize" event', done => {
      svgChart.on('resize.test', () => {
        // This block should be reached to pass the test.
        expect(true).to.be.true;
        done();
      });
      svgChart.margin({ left: 33 });
    });
  });

  describe('.offset(offset)', () => {
    it('should return offset when called without argument', () => {
      const offset = { x: 1, y: 1 };
      svgChart.offset(offset);
      expect(svgChart.offset()).to.deep.equal(offset);
    });
    it('should set offset when called with at least one argument', () => {
      svgChart
        .offset({ x: 1, y: 1 })
        .offset({ x: 2, y: 3 });
      expect(svgChart.offset()).to.deep.equal({ x: 2, y: 3 });
    });
    it('should update the root <g> transform/translate', () => {
      svgChart
        .offset({ x: 0.5, y: 0.5 })
        .margin({ left: 10, top: 10 })
        .offset({ x: 2, y: 3 })
        .updateDimensionNow();
      const translate = svgChart.rootG.attr('transform');
      expect(translate).to.equal('translate(12,13)');
    });
  });

  describe('.width(width)', () => {
    it('should return <svg> width when called without argument', () => {
      const w = $svg.attr('width');
      expect(svgChart.width()).to.equal(+w);
    });
    it('should set <svg> width when called with Number as the first argument', () => {
      svgChart
        .width(300)
        .updateDimensionNow();
      expect(+$svg.attr('width')).to.equal(300);
    });
    it('after setting, should dispatch "resize" event', done => {
      svgChart.on('resize.test', () => {
        // This block should be reached to pass the test.
        expect(true).to.be.true;
        done();
      });
      svgChart.width(200);
    });
  });

  describe('.height(height)', () => {
    it('should return <svg> height when called without argument', () => {
      const w = $svg.attr('height');
      expect(svgChart.height()).to.equal(+w);
    });
    it('should set <svg> height when called with Number as the first argument', () => {
      svgChart
        .height(300)
        .updateDimensionNow();
      expect(+$svg.attr('height')).to.equal(300);
    });
    it('after setting, should dispatch "resize" event', done => {
      svgChart.on('resize.test', () => {
        // This block should be reached to pass the test.
        expect(true).to.be.true;
        done();
      });
      svgChart.height(200);
    });
  });

  describe('.dimension(dimension)', () => {
    it('should return an array [width, height] when called without argument', () => {
      const dim = [+$svg.attr('width'), +$svg.attr('height')];
      expect(svgChart.dimension()).to.deep.equal(dim);
    });
    it('should set width and height of the <svg> when called with an array [width, height] as the first argument', done => {
      svgChart.dimension([118, 118]);
      setTimeout(() => {
        expect([+$svg.attr('width'), +$svg.attr('height')]).to.deep.equal([118, 118]);
        done();
      }, 0);
    });
    it('after setting, should dispatch "resize" event', done => {
      svgChart.on('resize.test', () => {
        // This block should be reached to pass the test.
        expect(true).to.be.true;
        done();
      });
      svgChart.dimension([150, 150]);
    });
  });

  describe('fit(fitOptions)', () => {
    it('should fit the svgChart to container as instructed', () => {
      $element
        .style('width', '500px')
        .style('height', '500px');
      svgChart
        .fit({
          width: '100%',
          height: '100%',
        })
        .updateDimensionNow();

      expect(svgChart.dimension()).to.deep.equal([500, 500]);

      svgChart
        .fit({
          width: '50%',
          height: '80%',
        })
        .updateDimensionNow();

      expect(svgChart.dimension()).to.deep.equal([250, 400]);
    });
  });

  describe('.hasData()', () => {
    it('should return true when data are not null nor undefined', () => {
      svgChart.data({});
      expect(svgChart.hasData()).to.be.true;
      svgChart.data({ test: 1 });
      expect(svgChart.hasData()).to.be.true;
      svgChart.data([]);
      expect(svgChart.hasData()).to.be.true;
      svgChart.data(['test']);
      expect(svgChart.hasData()).to.be.true;
    });
    it('should return false when data are null or undefined', () => {
      svgChart.data(null);
      expect(svgChart.hasData()).to.be.false;
      svgChart.data(undefined);
      expect(svgChart.hasData()).to.be.false;
    });
  });

  describe('.hasNonZeroArea()', () => {
    it('should return true if innerWidth * innerHeight is more than zero', done => {
      svgChart
        .width(80)
        .height(50)
        .options({
          margin: { top: 10, bottom: 20, left: 10, right: 10 },
        });
      setTimeout(() => {
        expect(svgChart.hasNonZeroArea()).to.be.true;
        done();
      }, 0);
    });
    it('should return false otherwise', done => {
      svgChart
        .width(20)
        .height(30)
        .options({
          margin: { top: 10, bottom: 20, left: 10, right: 10 },
        });

      setTimeout(() => {
        expect(svgChart.hasNonZeroArea()).to.be.false;
        done();
      }, 0);
    });
  });
});
