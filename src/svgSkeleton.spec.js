import { select } from 'd3-selection';
import SvgSkeleton from './svgSkeleton.js';

describe('SvgSkeleton', () => {
  let element, $element, $svg, svgSkeleton;

  beforeEach(() => {
    element = document.body.appendChild(document.createElement('div'));
    svgSkeleton = new SvgSkeleton(element, null);
    $element = select(element);
    $svg = $element.select('svg');
  });

  describe('new SvgSkeleton(element, options)', () => {
    it('should create <svg> inside the element', () => {
      expect($element.select('svg').size()).to.be.equal(1);
    });
    it('which is accessible from svgSkeleton.svg', () => {
      expect(svgSkeleton.svg).to.exist;
    });
    it('should create <g> inside the <svg> above', () => {
      expect($element.select('svg').select('g').size()).to.be.equal(1);
    });
    it('which is accessible from svgSkeleton.rootG', () => {
      expect(svgSkeleton.rootG).to.exist;
    });
    it('should create a dispatcher as svgSkeleton.dispatcher', () => {
      const dispatcher = svgSkeleton.dispatcher;
      expect(dispatcher).to.be.an('Object');
      expect(dispatcher.call).to.be.a('Function');
    });
  });

  describe('.getCustomEventNames()', () => {
    it('should return custom event names', () => {
      expect(svgSkeleton.getCustomEventNames()).to.deep.equal([]);
    });
    it('should return custom event names', () => {
      class Chart extends SvgSkeleton {
        static getCustomEventNames() {
          return ['custom1', 'custom2'];
        }
      }
      const chart = new Chart();
      expect(chart.getCustomEventNames()).to.deep.equal(['custom1', 'custom2']);
    });
  });

  describe('.getInnerWidth()', () => {
    it('should return width of the svgSkeleton excluding margin', () => {
      svgSkeleton
        .width(100)
        .options({
          margin: { left: 10, right: 10 },
        })
        .updateDimensionNow();
      expect(svgSkeleton.getInnerWidth()).to.equal(80);
    });
  });

  describe('.getInnerHeight()', () => {
    it('should return height of the svgSkeleton excluding margin', () => {
      svgSkeleton
        .height(100)
        .options({
          margin: { top: 10, bottom: 20 },
        })
        .updateDimensionNow();
      expect(svgSkeleton.getInnerHeight()).to.equal(70);
    });
  });

  describe('.data(data)', () => {
    it('should return data when called without argument', () => {
      svgSkeleton.data({ a: 1 });
      expect(svgSkeleton.data()).to.deep.equal({ a: 1 });
    });
    it('should set data when called with at least one argument', () => {
      svgSkeleton.data('test');
      expect(svgSkeleton.data()).to.equal('test');
    });
    it('after setting, should dispatch "data" event', done => {
      svgSkeleton.on('data.test', () => {
        // This block should be reached to pass the test.
        done();
      });
      svgSkeleton.data({ a: 1 });
    });
  });

  describe('.options(options)', () => {
    it('should return options when called without argument', () => {
      svgSkeleton.options({ a: 2 });
      expect(svgSkeleton.options()).to.include.key('a');
      expect(svgSkeleton.options().a).to.equal(2);
    });
    it('should set options when called with at least one argument', () => {
      svgSkeleton.options({ a: 1 });
      expect(svgSkeleton.options()).to.include.key('a');
      expect(svgSkeleton.options().a).to.equal(1);
    });
    it('should not overwrite but extend existing options when setting', () => {
      svgSkeleton.options({ a: 1 });
      svgSkeleton.options({ b: 2 });
      expect(svgSkeleton.options()).to.include.keys(['a', 'b']);
      expect(svgSkeleton.options().a).to.equal(1);
      expect(svgSkeleton.options().b).to.equal(2);
    });
    it('after setting, should dispatch "options" event', done => {
      svgSkeleton.on('options.test', () => {
        // This block should be reached to pass the test.
        expect(true).to.be.true;
        done();
      });
      svgSkeleton.options({ a: 1 });
    });
  });

  describe('.margin(margin)', () => {
    it('should return margin when called without argument', () => {
      const margin = { left: 10, right: 10, top: 10, bottom: 10 };
      svgSkeleton.margin(margin);
      expect(svgSkeleton.margin()).to.deep.equal(margin);
    });
    it('should set margin when called with at least one argument', () => {
      const margin = { left: 10, right: 10, top: 10, bottom: 10 };
      svgSkeleton.margin(margin);
      svgSkeleton.margin({ left: 20 });
      expect(svgSkeleton.margin().left).to.equal(20);
      expect(svgSkeleton.margin().right).to.equal(10);
      svgSkeleton.margin({ right: 20 });
      expect(svgSkeleton.margin().right).to.equal(20);
      svgSkeleton.margin({ top: 20 });
      expect(svgSkeleton.margin().top).to.equal(20);
      svgSkeleton.margin({ bottom: 20 });
      expect(svgSkeleton.margin().bottom).to.equal(20);
    });
    it('should update innerWidth after setting margin', () => {
      svgSkeleton
        .width(100)
        .margin({ left: 15, right: 15 })
        .updateDimensionNow();

      expect(svgSkeleton.getInnerWidth()).to.equal(70);
    });
    it('should update innerHeight after setting margin', () => {
      svgSkeleton
        .height(100)
        .margin({ top: 10, bottom: 10 })
        .updateDimensionNow();

      expect(svgSkeleton.getInnerHeight()).to.equal(80);
    });
    it('should update the root <g> transform/translate', () => {
      svgSkeleton
        .margin({ left: 30, top: 30 })
        .offset({ x: 0.5, y: 0.5 })
        .margin({ left: 10, top: 10 })
        .updateDimensionNow();

      const translate = svgSkeleton.rootG.attr('transform');
      expect(translate).to.equal('translate(10.5,10.5)');
    });
    it('after setting, should dispatch "resize" event', done => {
      svgSkeleton.on('resize.test', () => {
        // This block should be reached to pass the test.
        expect(true).to.be.true;
        done();
      });
      svgSkeleton.margin({ left: 33 });
    });
  });

  describe('.offset(offset)', () => {
    it('should return offset when called without argument', () => {
      const offset = { x: 1, y: 1 };
      svgSkeleton.offset(offset);
      expect(svgSkeleton.offset()).to.deep.equal(offset);
    });
    it('should set offset when called with at least one argument', () => {
      svgSkeleton
        .offset({ x: 1, y: 1 })
        .offset({ x: 2, y: 3 });
      expect(svgSkeleton.offset()).to.deep.equal({ x: 2, y: 3 });
    });
    it('should update the root <g> transform/translate', () => {
      svgSkeleton
        .offset({ x: 0.5, y: 0.5 })
        .margin({ left: 10, top: 10 })
        .offset({ x: 2, y: 3 })
        .updateDimensionNow();
      const translate = svgSkeleton.rootG.attr('transform');
      expect(translate).to.equal('translate(12,13)');
    });
  });

  describe('.width(width)', () => {
    it('should return <svg> width when called without argument', () => {
      const w = $svg.attr('width');
      expect(svgSkeleton.width()).to.equal(+w);
    });
    it('should set <svg> width when called with Number as the first argument', () => {
      svgSkeleton
        .width(300)
        .updateDimensionNow();
      expect(+$svg.attr('width')).to.equal(300);
    });
    it('after setting, should dispatch "resize" event', done => {
      svgSkeleton.on('resize.test', () => {
        // This block should be reached to pass the test.
        expect(true).to.be.true;
        done();
      });
      svgSkeleton.width(200);
    });
  });

  describe('.height(height)', () => {
    it('should return <svg> height when called without argument', () => {
      const w = $svg.attr('height');
      expect(svgSkeleton.height()).to.equal(+w);
    });
    it('should set <svg> height when called with Number as the first argument', () => {
      svgSkeleton
        .height(300)
        .updateDimensionNow();
      expect(+$svg.attr('height')).to.equal(300);
    });
    it('after setting, should dispatch "resize" event', done => {
      svgSkeleton.on('resize.test', () => {
        // This block should be reached to pass the test.
        expect(true).to.be.true;
        done();
      });
      svgSkeleton.height(200);
    });
  });

  describe('.dimension(dimension)', () => {
    it('should return an array [width, height] when called without argument', () => {
      const dim = [+$svg.attr('width'), +$svg.attr('height')];
      expect(svgSkeleton.dimension()).to.deep.equal(dim);
    });
    it('should set width and height of the <svg> when called with an array [width, height] as the first argument', done => {
      svgSkeleton.dimension([118, 118]);
      setTimeout(() => {
        expect([+$svg.attr('width'), +$svg.attr('height')]).to.deep.equal([118, 118]);
        done();
      }, 0);
    });
    it('after setting, should dispatch "resize" event', done => {
      svgSkeleton.on('resize.test', () => {
        // This block should be reached to pass the test.
        expect(true).to.be.true;
        done();
      });
      svgSkeleton.dimension([150, 150]);
    });
  });

  describe('fit(fitOptions)', () => {
    it('should fit the svgSkeleton to container as instructed', () => {
      $element
        .style('width', '500px')
        .style('height', '500px');
      svgSkeleton
        .fit({
          width: '100%',
          height: '100%',
        })
        .updateDimensionNow();

      expect(svgSkeleton.dimension()).to.deep.equal([500, 500]);

      svgSkeleton
        .fit({
          width: '50%',
          height: '80%',
        })
        .updateDimensionNow();

      expect(svgSkeleton.dimension()).to.deep.equal([250, 400]);
    });
  });

  describe('.hasData()', () => {
    it('should return true when data are not null nor undefined', () => {
      svgSkeleton.data({});
      expect(svgSkeleton.hasData()).to.be.true;
      svgSkeleton.data({ test: 1 });
      expect(svgSkeleton.hasData()).to.be.true;
      svgSkeleton.data([]);
      expect(svgSkeleton.hasData()).to.be.true;
      svgSkeleton.data(['test']);
      expect(svgSkeleton.hasData()).to.be.true;
    });
    it('should return false when data are null or undefined', () => {
      svgSkeleton.data(null);
      expect(svgSkeleton.hasData()).to.be.false;
      svgSkeleton.data(undefined);
      expect(svgSkeleton.hasData()).to.be.false;
    });
  });

  describe('.hasNonZeroArea()', () => {
    it('should return true if innerWidth * innerHeight is more than zero', done => {
      svgSkeleton
        .width(80)
        .height(50)
        .options({
          margin: { top: 10, bottom: 20, left: 10, right: 10 },
        });
      setTimeout(() => {
        expect(svgSkeleton.hasNonZeroArea()).to.be.true;
        done();
      }, 0);
    });
    it('should return false otherwise', done => {
      svgSkeleton
        .width(20)
        .height(30)
        .options({
          margin: { top: 10, bottom: 20, left: 10, right: 10 },
        });

      setTimeout(() => {
        expect(svgSkeleton.hasNonZeroArea()).to.be.false;
        done();
      }, 0);
    });
  });
});
