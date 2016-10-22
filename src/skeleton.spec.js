import { select } from 'd3-selection';
import Skeleton from './skeleton.js';

describe('Skeleton', function () {
  let element, $element, $svg, skeleton;

  beforeEach(function (done) {
    element = document.body.appendChild(document.createElement('div'));
    skeleton = new Skeleton(element, null, ['custom1', 'custom2']);
    $element = select(element);
    $svg = $element.select('svg');
    done();
  });

  describe('new Skeleton()', function () {
    it('should create <svg> inside the element', function () {
      expect($element.select('svg').size()).to.be.equal(1);
    });
    it('should create <g> inside <svg> inside the element', function () {
      expect($element.select('svg').select('g').size()).to.be.equal(1);
    });
  });

  describe('#getCustomEventNames()', function () {
    it('should return custom event names', function () {
      expect(skeleton.getCustomEventNames()).to.deep.equal(['custom1', 'custom2']);
    });
  });

  describe('#getDispatcher()', function () {
    it('should return event dispatcher', function () {
      expect(skeleton.getDispatcher()).to.be.an('Object');
      expect(skeleton.getDispatcher().call).to.be.a('Function');
    });
  });

  describe('#getInnerWidth()', function () {
    it('should return width of the skeleton excluding margin', function () {
      skeleton.options({
        margin: { left: 10, right: 10 },
      });
      skeleton.width(100);
      expect(skeleton.getInnerWidth()).to.equal(80);
    });
  });

  describe('#getInnerHeight()', function () {
    it('should return height of the skeleton excluding margin', function () {
      skeleton.options({
        margin: { top: 10, bottom: 20 },
      });
      skeleton.height(100);
      expect(skeleton.getInnerHeight()).to.equal(70);
    });
  });

  describe('#getLayerOrganizer()', function () {
    it('should return the LayerOrganizer', function () {
      expect(skeleton.getLayerOrganizer()).to.be.an('Object');
    });
  });

  describe('#getRootG()', function () {
    it('should return d3 selection of the root <g>', function () {
      const g = skeleton.getRootG();
      expect(g.size()).to.equal(1);
      expect(g.node().tagName).to.equal('g');
    });
  });

  describe('#getSvg()', function () {
    it('should return d3 selection of the <svg>', function () {
      const svg = skeleton.getSvg();
      expect(svg.size()).to.equal(1);
      expect(svg.node().tagName).to.equal('svg');
    });
  });

  describe('#data(data, doNotDispatch)', function () {
    it('should return data when called without argument', function () {
      skeleton.data({ a: 1 });
      expect(skeleton.data()).to.deep.equal({ a: 1 });
    });
    it('should set data when called with at least one argument', function () {
      skeleton.data('test');
      expect(skeleton.data()).to.equal('test');
    });
    it('after setting, should dispatch "data" event', function (done) {
      skeleton.on('data.test', function () {
        // This block should be reached to pass the test.
        expect(true).to.be.true;
        done();
      });
      skeleton.data({ a: 1 });
    });
    it('after setting, should not dispatch "data" event if doNotDispatch is true', function (done) {
      skeleton.on('data.test', function () {
        // This block should not be reached.
        expect(true).to.be.false;
        done();
      });
      skeleton.data({ a: 1 }, true);
      setTimeout(done, 100);
    });
  });

  describe('#options(options, doNotDispatch)', function () {
    it('should return options when called without argument', function () {
      skeleton.options({ a: 2 });
      expect(skeleton.options()).to.include.key('a');
      expect(skeleton.options().a).to.equal(2);
    });
    it('should set options when called with at least one argument', function () {
      skeleton.options({ a: 1 });
      expect(skeleton.options()).to.include.key('a');
      expect(skeleton.options().a).to.equal(1);
    });
    it('should not overwrite but extend existing options when setting', function () {
      skeleton.options({ a: 1 });
      skeleton.options({ b: 2 });
      expect(skeleton.options()).to.include.keys(['a', 'b']);
      expect(skeleton.options().a).to.equal(1);
      expect(skeleton.options().b).to.equal(2);
    });
    it('after setting, should dispatch "options" event', function (done) {
      skeleton.on('options.test', function () {
        // This block should be reached to pass the test.
        expect(true).to.be.true;
        done();
      });
      skeleton.options({ a: 1 });
    });
    it('after setting, should not dispatch "options" event if doNotDispatch is true', function (done) {
      skeleton.on('options.test', function () {
        // This block should not be reached.
        expect(true).to.be.false;
        done();
      });
      skeleton.options({ a: 1 }, true);
      setTimeout(done, 100);
    });
  });

  describe('#margin(margin, doNotDispatch)', function () {
    it('should return margin when called without argument', function () {
      const margin = { left: 10, right: 10, top: 10, bottom: 10 };
      skeleton.margin(margin);
      expect(skeleton.margin()).to.deep.equal(margin);
    });
    it('should set margin when called with at least one argument', function () {
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
    it('should update innerWidth after setting margin', function () {
      skeleton.width(100);
      skeleton.margin({ left: 10, right: 10 });
      expect(skeleton.getInnerWidth()).to.equal(80);
      skeleton.margin({ left: 15, right: 15 });
      expect(skeleton.getInnerWidth()).to.equal(70);
    });
    it('should update innerHeight after setting margin', function () {
      skeleton.height(100);
      skeleton.margin({ top: 10, bottom: 10 });
      expect(skeleton.getInnerHeight()).to.equal(80);
      skeleton.margin({ top: 15, bottom: 15 });
      expect(skeleton.getInnerHeight()).to.equal(70);
    });
    it('should update the root <g> transform/translate', function () {
      skeleton.margin({ left: 30, top: 30 });
      skeleton.offset([0.5, 0.5]);
      skeleton.margin({ left: 10, top: 10 });
      const translate = skeleton.getRootG().attr('transform');
      expect(translate).to.equal('translate(10.5,10.5)');
    });
    it('after setting, should dispatch "resize" event', function (done) {
      skeleton.on('resize.test', function () {
        // This block should be reached to pass the test.
        expect(true).to.be.true;
        done();
      });
      skeleton.margin({ left: 33 });
    });
    it('after setting, should not dispatch "resize" event if doNotDispatch is true', function (done) {
      skeleton.on('resize.test', function () {
        // This block should not be reached.
        expect(true).to.be.false;
        done();
      });
      skeleton.margin({ left: 33 }, true);
      setTimeout(done, 100);
    });
  });

  describe('#offset(offset)', function () {
    it('should return offset when called without argument', function () {
      const offset = [1, 1];
      skeleton.offset(offset);
      expect(skeleton.offset()).to.deep.equal(offset);
    });
    it('should set offset when called with at least one argument', function () {
      const offset = [1, 1];
      skeleton.offset(offset);
      skeleton.offset([2, 3]);
      expect(skeleton.offset()).to.deep.equal([2, 3]);
    });
    it('should update the root <g> transform/translate', function () {
      skeleton.offset([0.5, 0.5]);
      skeleton.margin({ left: 10, top: 10 });
      skeleton.offset([2, 3]);
      const translate = skeleton.getRootG().attr('transform');
      expect(translate).to.equal('translate(12,13)');
    });
  });

  describe('#width(width, doNotDispatch)', function () {
    it('should return <svg> width when called without argument', function () {
      const w = $svg.attr('width');
      expect(skeleton.width()).to.equal(+w);
    });
    it('should set <svg> width when called with Number as the first argument', function () {
      skeleton.width(300);
      expect(+$svg.attr('width')).to.equal(300);
    });
    it('should set <svg> width when called with a Number and "px" such as "100px" as the first argument', function () {
      skeleton.width('299px');
      expect(+$svg.attr('width')).to.equal(299);
    });
    it('should set <svg> width to container\'s width when called with "auto" as the first argument', function () {
      const w = element.clientWidth;
      skeleton.width('auto');
      expect(+$svg.attr('width')).to.equal(w);
    });
    it('after setting, should dispatch "resize" event', function (done) {
      skeleton.on('resize.test', function () {
        // This block should be reached to pass the test.
        expect(true).to.be.true;
        done();
      });
      skeleton.width(200);
    });
    it('after setting, should not dispatch "resize" event if doNotDispatch is true', function (done) {
      skeleton.on('resize.test', function () {
        // This block should not be reached.
        expect(true).to.be.false;
        done();
      });
      skeleton.width(200, true);
      setTimeout(done, 100);
    });
  });

  describe('#height(height, doNotDispatch)', function () {
    it('should return <svg> height when called without argument', function () {
      const w = $svg.attr('height');
      expect(skeleton.height()).to.equal(+w);
    });
    it('should set <svg> height when called with Number as the first argument', function () {
      skeleton.height(300);
      expect(+$svg.attr('height')).to.equal(300);
    });
    it('should set <svg> height when called with a Number and "px" such as "100px" as the first argument', function () {
      skeleton.height('299px');
      expect(+$svg.attr('height')).to.equal(299);
    });
    it('should set <svg> height to container\'s height when called with "auto" as the first argument', function () {
      const w = element.clientHeight;
      skeleton.height('auto');
      expect(+$svg.attr('height')).to.equal(w);
    });
    it('after setting, should dispatch "resize" event', function (done) {
      skeleton.on('resize.test', function () {
        // This block should be reached to pass the test.
        expect(true).to.be.true;
        done();
      });
      skeleton.height(200);
    });
    it('after setting, should not dispatch "resize" event if doNotDispatch is true', function (done) {
      skeleton.on('resize.test', function () {
        // This block should not be reached.
        expect(true).to.be.false;
        done();
      });
      skeleton.height(200, true);
      setTimeout(done, 100);
    });
  });

  describe('#dimension(dimension, doNotDispatch)', function () {
    it('should return an array [width, height] when called without argument', function () {
      const dim = [+$svg.attr('width'), +$svg.attr('height')];
      expect(skeleton.dimension()).to.deep.equal(dim);
    });
    it('should set width and height of the <svg> when called with an array [width, height] as the first argument', function () {
      skeleton.dimension([118, 118]);
      expect([+$svg.attr('width'), +$svg.attr('height')]).to.deep.equal([118, 118]);
    });
    it('after setting, should dispatch "resize" event', function (done) {
      skeleton.on('resize.test', function () {
        // This block should be reached to pass the test.
        expect(true).to.be.true;
        done();
      });
      skeleton.dimension([150, 150]);
    });
    it('after setting, should not dispatch "resize" event if doNotDispatch is true', function (done) {
      skeleton.on('resize.test', function () {
        // This block should not be reached.
        expect(true).to.be.false;
        done();
      });
      skeleton.dimension([150, 150], true);
      setTimeout(done, 100);
    });
  });

  describe('#hasData()', function () {
    it('should return true when data are not null nor undefined', function () {
      skeleton.data({});
      expect(skeleton.hasData()).to.be.true;
      skeleton.data({ test: 1 });
      expect(skeleton.hasData()).to.be.true;
      skeleton.data([]);
      expect(skeleton.hasData()).to.be.true;
      skeleton.data(['test']);
      expect(skeleton.hasData()).to.be.true;
    });
    it('should return false when data are null or undefined', function () {
      skeleton.data(null);
      expect(skeleton.hasData()).to.be.false;
      skeleton.data(undefined);
      expect(skeleton.hasData()).to.be.false;
    });
  });

  describe('#hasNonZeroArea()', function () {
    it('should return true if <svg>\'s width & height excluding margin is more than zero', function () {
      skeleton.options({
        margin: { left: 10, right: 10 },
      });
      skeleton.width(80);
      skeleton.options({
        margin: { top: 10, bottom: 20 },
      });
      skeleton.height(50);
      expect(skeleton.hasNonZeroArea()).to.be.true;
    });
    it('should return false otherwise', function () {
      skeleton.options({
        margin: { left: 10, right: 10 },
      });
      skeleton.width(20);
      skeleton.options({
        margin: { top: 10, bottom: 20 },
      });
      skeleton.height(30);
      expect(skeleton.hasNonZeroArea()).to.be.false;
    });
  });

  describe('#mixin({})', function () {
    it('should extend this skeleton with new fields/functions', function () {
      skeleton.mixin({
        a: 1,
        b: 2,
      });
      expect(skeleton).to.include.keys(['a', 'b']);
      expect(skeleton.a).to.equal(1);
      expect(skeleton.b).to.equal(2);
    });
    it('should overwrite existing fields', function () {
      skeleton.mixin({
        b: 2,
      });
      skeleton.mixin({
        b: 3,
      });
      expect(skeleton).to.include.keys(['b']);
      expect(skeleton.b).to.equal(3);
    });
    it('should keep original fields if not overwritten', function () {
      skeleton.mixin({
        a: 1,
        b: 2,
      });
      skeleton.mixin({
        c: 20,
        b: 3,
      });
      expect(skeleton).to.include.key(['a', 'b', 'c']);
      expect(skeleton.a).to.equal(1);
      expect(skeleton.b).to.equal(3);
      expect(skeleton.c).to.equal(20);
    });
  });

  describe('#resizeToFitContainer(mode)', function () {
    it('when mode is "all" should resize to fit both width and height', function () {
      skeleton.dimension([element.clientWidth / 2, element.clientHeight / 2]);
      const w = element.clientWidth;
      const h = element.clientHeight;
      skeleton.resizeToFitContainer('all');
      expect(skeleton.dimension()).to.deep.equal([w, h]);
    });
    it('when mode is "both" should resize to fit both width and height', function () {
      skeleton.dimension([element.clientWidth / 2, element.clientHeight / 2]);
      const w = element.clientWidth;
      const h = element.clientHeight;
      skeleton.resizeToFitContainer('both');
      expect(skeleton.dimension()).to.deep.equal([w, h]);
    });
    it('when mode is "full" should resize to fit both width and height', function () {
      skeleton.dimension([element.clientWidth / 2, element.clientHeight / 2]);
      const w = element.clientWidth;
      const h = element.clientHeight;
      skeleton.resizeToFitContainer('full');
      expect(skeleton.dimension()).to.deep.equal([w, h]);
    });
    it('when mode is "width" should resize width to fit container but keep original height', function () {
      const w1 = element.clientWidth;
      const h1 = element.clientHeight;

      skeleton.dimension([200, 200]);
      skeleton.resizeToFitContainer('width');

      expect(skeleton.width()).to.equal(w1);
      expect(skeleton.height()).to.equal(200);
      expect(skeleton.width()).to.not.equal(200);
      expect(skeleton.height()).to.not.equal(h1);
    });
    it('when mode is "height" should resize height to fit container but keep original width', function () {
      const w1 = element.clientWidth;
      element.style.height = '400px';
      const h1 = element.clientHeight;

      skeleton.dimension([200, 200]);
      skeleton.resizeToFitContainer('height');

      expect(skeleton.width()).to.equal(200);
      expect(skeleton.height()).to.equal(400);
      expect(skeleton.width()).to.not.equal(w1);
      expect(skeleton.height()).to.not.equal(200);
    });
  });

  describe('#resizeToAspectRatio(ratio)', function () {
    // todo
  });

  describe('#autoResize(mode)', function () {
    it('should return current mode when called without argument', function () {
      skeleton.autoResize(false);
      expect(skeleton.autoResize()).to.be.false;
      skeleton.autoResize('width');
      expect(skeleton.autoResize()).to.equal('width');
    });
    it('should enable auto resize when set mode to "width/height/both/etc.", similar to parameters of resizeToFitContainer()', function (done) {
      // set initial size
      skeleton.width(50);
      skeleton.autoResize('width');
      setTimeout(function () {
        expect(skeleton.width()).to.equal(element.clientWidth);
        done();
      }, 500);
    });
    it('should disable auto resize when set mode to false', function (done) {
      // set initial size
      skeleton.width(50);
      skeleton.autoResize('width');
      setTimeout(function () {
        expect(skeleton.width()).to.equal(element.clientWidth);
        // disable resize and
        skeleton.autoResize(false);
        skeleton.width(50);
        setTimeout(function () {
          expect(skeleton.width()).to.not.equal(element.clientWidth);
          done();
        }, 500);
      }, 500);
    });
  });

  describe('#autoResizeDetection(detection)', function () {
    // todo
  });

  describe('#autoResizeToAspectRatio(ratio)', function () {
    // todo
  });
});
