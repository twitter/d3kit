import { select } from 'd3-selection';
import SkeletonSvg from './skeletonSvg.js';

describe('SkeletonSvg', () => {
  let element, $element, $svg, skeletonSvg;

  beforeEach(() => {
    element = document.body.appendChild(document.createElement('div'));
    skeletonSvg = new SkeletonSvg(element, null);
    $element = select(element);
    $svg = $element.select('svg');
  });

  describe('new SkeletonSvg(element, options)', () => {
    it('should create <svg> inside the element', () => {
      expect($element.select('svg').size()).to.be.equal(1);
    });
    it('which is accessible from skeletonSvg.svg', () => {
      expect(skeletonSvg.svg).to.exist;
    });
    it('should create <g> inside the <svg> above', () => {
      expect($element.select('svg').select('g').size()).to.be.equal(1);
    });
    it('which is accessible from skeletonSvg.rootG', () => {
      expect(skeletonSvg.rootG).to.exist;
    });
    it('should create a dispatcher as skeletonSvg.dispatcher', () => {
      const dispatcher = skeletonSvg.dispatcher;
      expect(dispatcher).to.be.an('Object');
      expect(dispatcher.call).to.be.a('Function');
    });
  });

  describe('.getCustomEventNames()', () => {
    it('should return custom event names', () => {
      expect(skeletonSvg.getCustomEventNames()).to.deep.equal([]);
    });
    it('should return custom event names', () => {
      class Chart extends SkeletonSvg {
        static getCustomEventNames() {
          return ['custom1', 'custom2'];
        }
      }
      const chart = new Chart();
      expect(chart.getCustomEventNames()).to.deep.equal(['custom1', 'custom2']);
    });
  });

  describe('.getInnerWidth()', () => {
    it('should return width of the skeletonSvg excluding margin', () => {
      skeletonSvg
        .width(100)
        .options({
          margin: { left: 10, right: 10 },
        })
        .updateDimensionNow();
      expect(skeletonSvg.getInnerWidth()).to.equal(80);
    });
  });

  describe('.getInnerHeight()', () => {
    it('should return height of the skeletonSvg excluding margin', () => {
      skeletonSvg
        .height(100)
        .options({
          margin: { top: 10, bottom: 20 },
        })
        .updateDimensionNow();
      expect(skeletonSvg.getInnerHeight()).to.equal(70);
    });
  });

  describe('.data(data)', () => {
    it('should return data when called without argument', () => {
      skeletonSvg.data({ a: 1 });
      expect(skeletonSvg.data()).to.deep.equal({ a: 1 });
    });
    it('should set data when called with at least one argument', () => {
      skeletonSvg.data('test');
      expect(skeletonSvg.data()).to.equal('test');
    });
    it('after setting, should dispatch "data" event', done => {
      skeletonSvg.on('data.test', () => {
        // This block should be reached to pass the test.
        done();
      });
      skeletonSvg.data({ a: 1 });
    });
  });

  describe('.options(options)', () => {
    it('should return options when called without argument', () => {
      skeletonSvg.options({ a: 2 });
      expect(skeletonSvg.options()).to.include.key('a');
      expect(skeletonSvg.options().a).to.equal(2);
    });
    it('should set options when called with at least one argument', () => {
      skeletonSvg.options({ a: 1 });
      expect(skeletonSvg.options()).to.include.key('a');
      expect(skeletonSvg.options().a).to.equal(1);
    });
    it('should not overwrite but extend existing options when setting', () => {
      skeletonSvg.options({ a: 1 });
      skeletonSvg.options({ b: 2 });
      expect(skeletonSvg.options()).to.include.keys(['a', 'b']);
      expect(skeletonSvg.options().a).to.equal(1);
      expect(skeletonSvg.options().b).to.equal(2);
    });
    it('after setting, should dispatch "options" event', done => {
      skeletonSvg.on('options.test', () => {
        // This block should be reached to pass the test.
        expect(true).to.be.true;
        done();
      });
      skeletonSvg.options({ a: 1 });
    });
  });

  describe('.margin(margin)', () => {
    it('should return margin when called without argument', () => {
      const margin = { left: 10, right: 10, top: 10, bottom: 10 };
      skeletonSvg.margin(margin);
      expect(skeletonSvg.margin()).to.deep.equal(margin);
    });
    it('should set margin when called with at least one argument', () => {
      const margin = { left: 10, right: 10, top: 10, bottom: 10 };
      skeletonSvg.margin(margin);
      skeletonSvg.margin({ left: 20 });
      expect(skeletonSvg.margin().left).to.equal(20);
      expect(skeletonSvg.margin().right).to.equal(10);
      skeletonSvg.margin({ right: 20 });
      expect(skeletonSvg.margin().right).to.equal(20);
      skeletonSvg.margin({ top: 20 });
      expect(skeletonSvg.margin().top).to.equal(20);
      skeletonSvg.margin({ bottom: 20 });
      expect(skeletonSvg.margin().bottom).to.equal(20);
    });
    it('should update innerWidth after setting margin', () => {
      skeletonSvg
        .width(100)
        .margin({ left: 15, right: 15 })
        .updateDimensionNow();

      expect(skeletonSvg.getInnerWidth()).to.equal(70);
    });
    it('should update innerHeight after setting margin', () => {
      skeletonSvg
        .height(100)
        .margin({ top: 10, bottom: 10 })
        .updateDimensionNow();

      expect(skeletonSvg.getInnerHeight()).to.equal(80);
    });
    it('should update the root <g> transform/translate', () => {
      skeletonSvg
        .margin({ left: 30, top: 30 })
        .offset({ x: 0.5, y: 0.5 })
        .margin({ left: 10, top: 10 })
        .updateDimensionNow();

      const translate = skeletonSvg.rootG.attr('transform');
      expect(translate).to.equal('translate(10.5,10.5)');
    });
    it('after setting, should dispatch "resize" event', done => {
      skeletonSvg.on('resize.test', () => {
        // This block should be reached to pass the test.
        expect(true).to.be.true;
        done();
      });
      skeletonSvg.margin({ left: 33 });
    });
  });

  describe('.offset(offset)', () => {
    it('should return offset when called without argument', () => {
      const offset = { x: 1, y: 1 };
      skeletonSvg.offset(offset);
      expect(skeletonSvg.offset()).to.deep.equal(offset);
    });
    it('should set offset when called with at least one argument', () => {
      skeletonSvg
        .offset({ x: 1, y: 1 })
        .offset({ x: 2, y: 3 });
      expect(skeletonSvg.offset()).to.deep.equal({ x: 2, y: 3 });
    });
    it('should update the root <g> transform/translate', () => {
      skeletonSvg
        .offset({ x: 0.5, y: 0.5 })
        .margin({ left: 10, top: 10 })
        .offset({ x: 2, y: 3 })
        .updateDimensionNow();
      const translate = skeletonSvg.rootG.attr('transform');
      expect(translate).to.equal('translate(12,13)');
    });
  });

  describe('.width(width)', () => {
    it('should return <svg> width when called without argument', () => {
      const w = $svg.attr('width');
      expect(skeletonSvg.width()).to.equal(+w);
    });
    it('should set <svg> width when called with Number as the first argument', () => {
      skeletonSvg
        .width(300)
        .updateDimensionNow();
      expect(+$svg.attr('width')).to.equal(300);
    });
    it('after setting, should dispatch "resize" event', done => {
      skeletonSvg.on('resize.test', () => {
        // This block should be reached to pass the test.
        expect(true).to.be.true;
        done();
      });
      skeletonSvg.width(200);
    });
  });

  describe('.height(height)', () => {
    it('should return <svg> height when called without argument', () => {
      const w = $svg.attr('height');
      expect(skeletonSvg.height()).to.equal(+w);
    });
    it('should set <svg> height when called with Number as the first argument', () => {
      skeletonSvg
        .height(300)
        .updateDimensionNow();
      expect(+$svg.attr('height')).to.equal(300);
    });
    it('after setting, should dispatch "resize" event', done => {
      skeletonSvg.on('resize.test', () => {
        // This block should be reached to pass the test.
        expect(true).to.be.true;
        done();
      });
      skeletonSvg.height(200);
    });
  });

  describe('.dimension(dimension)', () => {
    it('should return an array [width, height] when called without argument', () => {
      const dim = [+$svg.attr('width'), +$svg.attr('height')];
      expect(skeletonSvg.dimension()).to.deep.equal(dim);
    });
    it('should set width and height of the <svg> when called with an array [width, height] as the first argument', done => {
      skeletonSvg.dimension([118, 118]);
      setTimeout(() => {
        expect([+$svg.attr('width'), +$svg.attr('height')]).to.deep.equal([118, 118]);
        done();
      }, 0);
    });
    it('after setting, should dispatch "resize" event', done => {
      skeletonSvg.on('resize.test', () => {
        // This block should be reached to pass the test.
        expect(true).to.be.true;
        done();
      });
      skeletonSvg.dimension([150, 150]);
    });
  });

  describe('fit(fitOptions)', () => {
    it('should fit the skeletonSvg to container as instructed', () => {
      $element
        .style('width', '500px')
        .style('height', '500px');
      skeletonSvg
        .fit({
          width: '100%',
          height: '100%',
        })
        .updateDimensionNow();

      expect(skeletonSvg.dimension()).to.deep.equal([500, 500]);

      skeletonSvg
        .fit({
          width: '50%',
          height: '80%',
        })
        .updateDimensionNow();

      expect(skeletonSvg.dimension()).to.deep.equal([250, 400]);
    });
  });

  describe('.hasData()', () => {
    it('should return true when data are not null nor undefined', () => {
      skeletonSvg.data({});
      expect(skeletonSvg.hasData()).to.be.true;
      skeletonSvg.data({ test: 1 });
      expect(skeletonSvg.hasData()).to.be.true;
      skeletonSvg.data([]);
      expect(skeletonSvg.hasData()).to.be.true;
      skeletonSvg.data(['test']);
      expect(skeletonSvg.hasData()).to.be.true;
    });
    it('should return false when data are null or undefined', () => {
      skeletonSvg.data(null);
      expect(skeletonSvg.hasData()).to.be.false;
      skeletonSvg.data(undefined);
      expect(skeletonSvg.hasData()).to.be.false;
    });
  });

  describe('.hasNonZeroArea()', () => {
    it('should return true if innerWidth * innerHeight is more than zero', done => {
      skeletonSvg
        .width(80)
        .height(50)
        .options({
          margin: { top: 10, bottom: 20, left: 10, right: 10 },
        });
      setTimeout(() => {
        expect(skeletonSvg.hasNonZeroArea()).to.be.true;
        done();
      }, 0);
    });
    it('should return false otherwise', done => {
      skeletonSvg
        .width(20)
        .height(30)
        .options({
          margin: { top: 10, bottom: 20, left: 10, right: 10 },
        });

      setTimeout(() => {
        expect(skeletonSvg.hasNonZeroArea()).to.be.false;
        done();
      }, 0);
    });
  });
});
