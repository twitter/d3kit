import { select } from 'd3-selection';
import AbstractChart from './AbstractChart.js';

describe('AbstractChart', () => {
  let element, $element, chart;

  beforeEach(() => {
    element = document.body.appendChild(document.createElement('div'));
    chart = new AbstractChart(element, null);
    $element = select(element);
  });

  describe('new AbstractChart(element, options)', () => {
    it('should create a dispatcher as chart.dispatcher', () => {
      const dispatcher = chart.dispatcher;
      expect(dispatcher).to.be.an('Object');
      expect(dispatcher.call).to.be.a('Function');
    });
  });

  describe('.getCustomEventNames()', () => {
    it('should return custom event names', () => {
      expect(chart.getCustomEventNames()).to.deep.equal([]);
    });
    it('should return custom event names', () => {
      class Chart extends AbstractChart {
        static getCustomEventNames() {
          return ['custom1', 'custom2'];
        }
      }
      const chart2 = new Chart();
      expect(chart2.getCustomEventNames()).to.deep.equal(['custom1', 'custom2']);
    });
  });

  describe('.getInnerWidth()', () => {
    it('should return width of the chart excluding margin', () => {
      chart
        .width(100)
        .options({
          margin: { left: 10, right: 10 },
        })
        .updateDimensionNow();
      expect(chart.getInnerWidth()).to.equal(80);
    });
  });

  describe('.getInnerHeight()', () => {
    it('should return height of the chart excluding margin', () => {
      chart
        .height(100)
        .options({
          margin: { top: 10, bottom: 20 },
        })
        .updateDimensionNow();
      expect(chart.getInnerHeight()).to.equal(70);
    });
  });

  describe('.data(data)', () => {
    it('should return data when called without argument', () => {
      chart.data({ a: 1 });
      expect(chart.data()).to.deep.equal({ a: 1 });
    });
    it('should set data when called with at least one argument', () => {
      chart.data('test');
      expect(chart.data()).to.equal('test');
    });
    it('after setting, should dispatch "data" event', done => {
      chart.on('data.test', () => {
        // This block should be reached to pass the test.
        done();
      });
      chart.data({ a: 1 });
    });
  });

  describe('.options(options)', () => {
    it('should return options when called without argument', () => {
      chart.options({ a: 2 });
      expect(chart.options()).to.include.key('a');
      expect(chart.options().a).to.equal(2);
    });
    it('should set options when called with at least one argument', () => {
      chart.options({ a: 1 });
      expect(chart.options()).to.include.key('a');
      expect(chart.options().a).to.equal(1);
    });
    it('should not overwrite but extend existing options when setting', () => {
      chart.options({ a: 1 });
      chart.options({ b: 2 });
      expect(chart.options()).to.include.keys(['a', 'b']);
      expect(chart.options().a).to.equal(1);
      expect(chart.options().b).to.equal(2);
    });
    it('after setting, should dispatch "options" event', done => {
      chart.on('options.test', () => {
        // This block should be reached to pass the test.
        expect(true).to.be.true;
        done();
      });
      chart.options({ a: 1 });
    });
  });

  describe('.margin(margin)', () => {
    it('should return margin when called without argument', () => {
      const margin = { left: 10, right: 10, top: 10, bottom: 10 };
      chart.margin(margin);
      expect(chart.margin()).to.deep.equal(margin);
    });
    it('should set margin when called with at least one argument', () => {
      const margin = { left: 10, right: 10, top: 10, bottom: 10 };
      chart.margin(margin);
      chart.margin({ left: 20 });
      expect(chart.margin().left).to.equal(20);
      expect(chart.margin().right).to.equal(10);
      chart.margin({ right: 20 });
      expect(chart.margin().right).to.equal(20);
      chart.margin({ top: 20 });
      expect(chart.margin().top).to.equal(20);
      chart.margin({ bottom: 20 });
      expect(chart.margin().bottom).to.equal(20);
    });
    it('should update innerWidth after setting margin', () => {
      chart
        .width(100)
        .margin({ left: 15, right: 15 })
        .updateDimensionNow();

      expect(chart.getInnerWidth()).to.equal(70);
    });
    it('should update innerHeight after setting margin', () => {
      chart
        .height(100)
        .margin({ top: 10, bottom: 10 })
        .updateDimensionNow();

      expect(chart.getInnerHeight()).to.equal(80);
    });
    it('after setting, should dispatch "resize" event', done => {
      chart.on('resize.test', () => {
        // This block should be reached to pass the test.
        expect(true).to.be.true;
        done();
      });
      chart.margin({ left: 33 });
    });
  });

  describe('.offset(offset)', () => {
    it('should return offset when called without argument', () => {
      const offset = [1, 1];
      chart.offset(offset);
      expect(chart.offset()).to.deep.equal(offset);
    });
    it('should set offset when called with at least one argument', () => {
      chart
        .offset([1, 1])
        .offset([2, 3]);
      expect(chart.offset()).to.deep.equal([2, 3]);
    });
  });

  describe('.width(width)', () => {
    it('after setting, should dispatch "resize" event', done => {
      chart.on('resize.test', () => {
        // This block should be reached to pass the test.
        expect(true).to.be.true;
        done();
      });
      chart.width(200);
    });
  });

  describe('.height(height)', () => {
    it('after setting, should dispatch "resize" event', done => {
      chart.on('resize.test', () => {
        // This block should be reached to pass the test.
        expect(true).to.be.true;
        done();
      });
      chart.height(200);
    });
  });

  describe('.dimension(dimension)', () => {
    it('after setting, should dispatch "resize" event', done => {
      chart.on('resize.test', () => {
        // This block should be reached to pass the test.
        expect(true).to.be.true;
        done();
      });
      chart.dimension([150, 150]);
    });
  });

  describe('fit(fitOptions)', () => {
    it('should fit the chart to container as instructed', () => {
      $element
        .style('width', '500px')
        .style('height', '500px');
      chart
        .fit({
          width: '100%',
          height: '100%',
        })
        .updateDimensionNow();

      expect(chart.dimension()).to.deep.equal([500, 500]);

      chart
        .fit({
          width: '50%',
          height: '80%',
        })
        .updateDimensionNow();

      expect(chart.dimension()).to.deep.equal([250, 400]);
    });
  });

  describe('.hasData()', () => {
    it('should return true when data are not null nor undefined', () => {
      chart.data({});
      expect(chart.hasData()).to.be.true;
      chart.data({ test: 1 });
      expect(chart.hasData()).to.be.true;
      chart.data([]);
      expect(chart.hasData()).to.be.true;
      chart.data(['test']);
      expect(chart.hasData()).to.be.true;
    });
    it('should return false when data are null or undefined', () => {
      chart.data(null);
      expect(chart.hasData()).to.be.false;
      chart.data(undefined);
      expect(chart.hasData()).to.be.false;
    });
  });

  describe('.hasNonZeroArea()', () => {
    it('should return true if innerWidth * innerHeight is more than zero', done => {
      chart
        .width(80)
        .height(50)
        .options({
          margin: { top: 10, bottom: 20, left: 10, right: 10 },
        });
      setTimeout(() => {
        expect(chart.hasNonZeroArea()).to.be.true;
        done();
      }, 0);
    });
    it('should return false otherwise', done => {
      chart
        .width(20)
        .height(30)
        .options({
          margin: { top: 10, bottom: 20, left: 10, right: 10 },
        });

      setTimeout(() => {
        expect(chart.hasNonZeroArea()).to.be.false;
        done();
      }, 0);
    });
  });
});
