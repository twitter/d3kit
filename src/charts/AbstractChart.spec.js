import { select } from 'd3-selection';
import AbstractChart from './AbstractChart.js';

class CustomChart extends AbstractChart {
  static getCustomEventNames() {
    return ['custom1', 'custom2'];
  }
}

describe('AbstractChart', () => {
  let element, $element, chart;

  beforeEach(() => {
    element = document.body.appendChild(document.createElement('div'));
    chart = new AbstractChart(element, null);
    $element = select(element);
  });

  describe('(static) AbstractChart.getCustomEventNames()', () => {
    it('should return an array of custom event names', () => {
      const names = AbstractChart.getCustomEventNames();
      expect(names).to.be.an('Array');
      expect(names).to.deep.equal([]);
    });
    it('can be overridden by subclass', () => {
      const names = CustomChart.getCustomEventNames();
      expect(names).to.be.an('Array');
      expect(names).to.deep.equal(['custom1', 'custom2']);
    });
  });

  describe('new AbstractChart(element, options)', () => {
    it('should create a dispatcher as chart.dispatcher', () => {
      const dispatcher = chart.dispatcher;
      expect(dispatcher).to.be.an('Object');
      expect(dispatcher.call).to.be.a('Function');
    });
  });

  describe('.getCustomEventNames()', () => {
    it('should return an array of custom event names', () => {
      const names = chart.getCustomEventNames();
      expect(names).to.be.an('Array');
      expect(names).to.deep.equal([]);
    });
    it('should return the same value with the static function by default', () => {
      const chart2 = new CustomChart();
      const names = chart2.getCustomEventNames();
      expect(names).to.deep.equal(CustomChart.getCustomEventNames());
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
    it('should dispatch "resize" as necessary if margin was included in the options.', (done) => {
      chart.on('resize.test', () => {
        expect(true).to.be.true;
        done();
      });
      chart.options({
        margin: { top: 12 },
      });
    });
    it('should dispatch "resize" as necessary if offset was included in the options.', (done) => {
      chart.on('resize.test', () => {
        expect(true).to.be.true;
        done();
      });
      chart.options({
        offset: [4, 4],
      });
    });
    it('should dispatch "resize" as necessary if pixelRatio was included in the options.', (done) => {
      chart.on('resize.test', () => {
        expect(true).to.be.true;
        done();
      });
      chart.options({
        pixelRatio: 3,
      });
    });
    it('after setting, should dispatch "options" event', done => {
      chart.on('options.test', () => {
        expect(true).to.be.true;
        done();
      });
      chart.options({ a: 1 });
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

  describe('.margin(margin)', () => {
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
    it('after setting, should dispatch "resize" event', done => {
      chart.on('resize.test', () => {
        // This block should be reached to pass the test.
        expect(true).to.be.true;
        done();
      });
      chart.offset([3, 3]);
    });
  });

  ['width', 'height', 'pixelRatio'].forEach(field => {
    describe(`.${field}(${field})`, () => {
      it('after setting, should dispatch "resize" event', done => {
        chart.on('resize.test', () => {
          // This block should be reached to pass the test.
          expect(true).to.be.true;
          done();
        });
        chart[field](200);
      });
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

    it('should be called repeatedly without problem', () => {
      chart.fit({
        width: '100%',
      }, true);
      chart.fit({
        width: '100%',
      }, true);
    });
  });

  describe('.stopFitWatcher()', () => {
    it('should kill the fitWatcher, if exists', () => {
      chart.fit({
        width: '100%',
      }, true);
      chart.stopFitWatcher();
      expect(chart.fitWatcher).to.not.exist;
    });
    it('should return this', () => {
      const returnValue = chart.stopFitWatcher();
      expect(returnValue).to.equal(chart);
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

  describe('.destroy()', () => {
    it('should unregister all event handlers', (done) => {
      const chart2 = new CustomChart();
      chart2.on('custom1', () => {
        assert.fail('should not be called');
      });
      chart2.destroy();
      chart2.dispatcher.call('custom1', chart);
      setTimeout(() => {
        expect(true).to.be.true;
        done();
      }, 20);
    });
    it('should stop fitWatcher if there is any', () => {
      chart.destroy();
      expect(chart.fitWatcher).to.not.exist;
    });
  });

  describe('.dispatchAs(eventName)', () => {
    it('should return a function which can be called to dispatch the named event with given arguments', (done) => {
      const chart2 = new CustomChart();
      chart2.on('custom1', (a, b, c) => {
        expect(a).to.equal(1);
        expect(b).to.equal(2);
        expect(c).to.equal(3);
        done();
      });
      chart2.dispatchAs('custom1')(1, 2, 3);
    });
  });
});
