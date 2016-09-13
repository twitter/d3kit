import { select } from 'd3-selection';
import Skeleton from './Skeleton.js';

describe('Skeleton', () => {
  let element, $element, $svg, skeleton;

  beforeEach(() => {
    element = document.body.appendChild(document.createElement('div'));
    skeleton = new Skeleton(element, null);
    $element = select(element);
    $svg = $element.select('svg');
  });

  describe('new Skeleton(element, options)', () => {
    it('should create <svg> inside the element', () => {
      expect($element.select('svg').size()).to.be.equal(1);
    });
    it('which is accessible from skeleton.svg', () => {
      expect(skeleton.svg).to.exist;
    });
    it('should create <g> inside the <svg> above', () => {
      expect($element.select('svg').select('g').size()).to.be.equal(1);
    });
    it('which is accessible from skeleton.rootG', () => {
      expect(skeleton.rootG).to.exist;
    });
    it('should create a dispatcher as skeleton.dispatcher', () => {
      const dispatcher = skeleton.dispatcher;
      expect(dispatcher).to.be.an('Object');
      expect(dispatcher.call).to.be.a('Function');
    });
  });

  describe('.getCustomEventNames()', () => {
    it('should return custom event names', () => {
      expect(skeleton.getCustomEventNames()).to.deep.equal([]);
    });
    it('should return custom event names', () => {
      class Chart extends Skeleton {
        static getCustomEventNames() {
          return ['custom1', 'custom2'];
        }
      }
      const chart = new Chart();
      expect(chart.getCustomEventNames()).to.deep.equal(['custom1', 'custom2']);
    });
  });

  describe('.getInnerWidth()', () => {
    it('should return width of the skeleton excluding margin', () => {
      skeleton
        .width(100)
        .options({
          margin: { left: 10, right: 10 },
        })
        .updateDimensionNow();
      expect(skeleton.getInnerWidth()).to.equal(80);
    });
  });

  describe('.getInnerHeight()', () => {
    it('should return height of the skeleton excluding margin', () => {
      skeleton
        .height(100)
        .options({
          margin: { top: 10, bottom: 20 },
        })
        .updateDimensionNow();
      expect(skeleton.getInnerHeight()).to.equal(70);
    });
  });

  describe('.data(data)', () => {
    it('should return data when called without argument', () => {
      skeleton.data({ a: 1 });
      expect(skeleton.data()).to.deep.equal({ a: 1 });
    });
    it('should set data when called with at least one argument', () => {
      skeleton.data('test');
      expect(skeleton.data()).to.equal('test');
    });
    it('after setting, should dispatch "data" event', done => {
      skeleton.on('data.test', () => {
        // This block should be reached to pass the test.
        done();
      });
      skeleton.data({ a: 1 });
    });
  });

  describe('.options(options)', () => {
    it('should return options when called without argument', () => {
      skeleton.options({ a: 2 });
      expect(skeleton.options()).to.include.key('a');
      expect(skeleton.options().a).to.equal(2);
    });
    it('should set options when called with at least one argument', () => {
      skeleton.options({ a: 1 });
      expect(skeleton.options()).to.include.key('a');
      expect(skeleton.options().a).to.equal(1);
    });
    it('should not overwrite but extend existing options when setting', () => {
      skeleton.options({ a: 1 });
      skeleton.options({ b: 2 });
      expect(skeleton.options()).to.include.keys(['a', 'b']);
      expect(skeleton.options().a).to.equal(1);
      expect(skeleton.options().b).to.equal(2);
    });
    it('after setting, should dispatch "options" event', done => {
      skeleton.on('options.test', () => {
        // This block should be reached to pass the test.
        expect(true).to.be.true;
        done();
      });
      skeleton.options({ a: 1 });
    });
  });

  describe('.margin(margin)', () => {
    it('should return margin when called without argument', () => {
      const margin = { left: 10, right: 10, top: 10, bottom: 10 };
      skeleton.margin(margin);
      expect(skeleton.margin()).to.deep.equal(margin);
    });
    it('should set margin when called with at least one argument', () => {
      const margin = { left: 10, right: 10, top: 10, bottom: 10 };
      skeleton.margin(margin);
      skeleton.margin({ left: 20 });
      expect(skeleton.margin().left).to.equal(20);
      expect(skeleton.margin().right).to.equal(10);
      skeleton.margin({ right: 20 });
      expect(skeleton.margin().right).to.equal(20);
      skeleton.margin({ top: 20 });
      expect(skeleton.margin().top).to.equal(20);
      skeleton.margin({ bottom: 20 });
      expect(skeleton.margin().bottom).to.equal(20);
    });
    it('should update innerWidth after setting margin', () => {
      skeleton
        .width(100)
        .margin({ left: 15, right: 15 })
        .updateDimensionNow();

      expect(skeleton.getInnerWidth()).to.equal(70);
    });
    it('should update innerHeight after setting margin', () => {
      skeleton
        .height(100)
        .margin({ top: 10, bottom: 10 })
        .updateDimensionNow();

      expect(skeleton.getInnerHeight()).to.equal(80);
    });
    it('should update the root <g> transform/translate', () => {
      skeleton
        .margin({ left: 30, top: 30 })
        .offset({ x: 0.5, y: 0.5 })
        .margin({ left: 10, top: 10 })
        .updateDimensionNow();

      const translate = skeleton.rootG.attr('transform');
      expect(translate).to.equal('translate(10.5,10.5)');
    });
    it('after setting, should dispatch "resize" event', done => {
      skeleton.on('resize.test', () => {
        // This block should be reached to pass the test.
        expect(true).to.be.true;
        done();
      });
      skeleton.margin({ left: 33 });
    });
  });

  describe('.offset(offset)', () => {
    it('should return offset when called without argument', () => {
      const offset = { x: 1, y: 1 };
      skeleton.offset(offset);
      expect(skeleton.offset()).to.deep.equal(offset);
    });
    it('should set offset when called with at least one argument', () => {
      skeleton
        .offset({ x: 1, y: 1 })
        .offset({ x: 2, y: 3 });
      expect(skeleton.offset()).to.deep.equal({ x: 2, y: 3 });
    });
    it('should update the root <g> transform/translate', () => {
      skeleton
        .offset({ x: 0.5, y: 0.5 })
        .margin({ left: 10, top: 10 })
        .offset({ x: 2, y: 3 })
        .updateDimensionNow();
      const translate = skeleton.rootG.attr('transform');
      expect(translate).to.equal('translate(12,13)');
    });
  });

  describe('.width(width)', () => {
    it('should return <svg> width when called without argument', () => {
      const w = $svg.attr('width');
      expect(skeleton.width()).to.equal(+w);
    });
    it('should set <svg> width when called with Number as the first argument', () => {
      skeleton
        .width(300)
        .updateDimensionNow();
      expect(+$svg.attr('width')).to.equal(300);
    });
    it('after setting, should dispatch "resize" event', done => {
      skeleton.on('resize.test', () => {
        // This block should be reached to pass the test.
        expect(true).to.be.true;
        done();
      });
      skeleton.width(200);
    });
  });

  describe('.height(height)', () => {
    it('should return <svg> height when called without argument', () => {
      const w = $svg.attr('height');
      expect(skeleton.height()).to.equal(+w);
    });
    it('should set <svg> height when called with Number as the first argument', () => {
      skeleton
        .height(300)
        .updateDimensionNow();
      expect(+$svg.attr('height')).to.equal(300);
    });
    it('after setting, should dispatch "resize" event', done => {
      skeleton.on('resize.test', () => {
        // This block should be reached to pass the test.
        expect(true).to.be.true;
        done();
      });
      skeleton.height(200);
    });
  });

  describe('.dimension(dimension)', () => {
    it('should return an array [width, height] when called without argument', () => {
      const dim = [+$svg.attr('width'), +$svg.attr('height')];
      expect(skeleton.dimension()).to.deep.equal(dim);
    });
    it('should set width and height of the <svg> when called with an array [width, height] as the first argument', done => {
      skeleton.dimension([118, 118]);
      setTimeout(() => {
        expect([+$svg.attr('width'), +$svg.attr('height')]).to.deep.equal([118, 118]);
        done();
      }, 0);
    });
    it('after setting, should dispatch "resize" event', done => {
      skeleton.on('resize.test', () => {
        // This block should be reached to pass the test.
        expect(true).to.be.true;
        done();
      });
      skeleton.dimension([150, 150]);
    });
  });

  describe('.hasData()', () => {
    it('should return true when data are not null nor undefined', () => {
      skeleton.data({});
      expect(skeleton.hasData()).to.be.true;
      skeleton.data({ test: 1 });
      expect(skeleton.hasData()).to.be.true;
      skeleton.data([]);
      expect(skeleton.hasData()).to.be.true;
      skeleton.data(['test']);
      expect(skeleton.hasData()).to.be.true;
    });
    it('should return false when data are null or undefined', () => {
      skeleton.data(null);
      expect(skeleton.hasData()).to.be.false;
      skeleton.data(undefined);
      expect(skeleton.hasData()).to.be.false;
    });
  });

  describe('.hasNonZeroArea()', () => {
    it('should return true if innerWidth * innerHeight is more than zero', done => {
      skeleton
        .width(80)
        .height(50)
        .options({
          margin: { top: 10, bottom: 20, left: 10, right: 10 },
        });
      setTimeout(() => {
        expect(skeleton.hasNonZeroArea()).to.be.true;
        done();
      }, 0);
    });
    it('should return false otherwise', done => {
      skeleton
        .width(20)
        .height(30)
        .options({
          margin: { top: 10, bottom: 20, left: 10, right: 10 },
        });

      setTimeout(() => {
        expect(skeleton.hasNonZeroArea()).to.be.false;
        done();
      }, 0);
    });
  });
});
