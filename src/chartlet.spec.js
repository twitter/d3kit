import Chartlet from './chartlet.js';

describe('Chartlet', function () {
  let enter, update, exit, chartlet;
  const customEvents = ['fooEvent'];
  let ChildChartlet = null;
  let ParentChartlet = null;

  const callback = function (selection, done) { done(); };
  beforeEach(function (done) {
    ChildChartlet = function () {
      const chartlet = new Chartlet(callback, callback, callback);
      chartlet.runTest = function (testFunction) {
        testFunction(chartlet);
      };
      return chartlet;
    };

    ParentChartlet = function (configureFunction) {
      const chartlet = new Chartlet(callback, callback, callback);
      const child = new ChildChartlet();
      configureFunction(chartlet, child);
      chartlet.runTest = child.runTest;
      return chartlet;
    };

    enter = callback;
    update = callback;
    exit = callback;
    chartlet = new Chartlet(enter, update, exit, customEvents);
    done();
  });

  describe('new Chartlet(enter, update, exit, customEvents)', function () {
    it('should create a chartlet', function () {
      expect(chartlet).to.be.an('Object');
      expect(chartlet).to.include.keys(['property', 'on']);
      expect(chartlet.enter).to.be.a('Function');
      expect(chartlet.update).to.be.a('Function');
      expect(chartlet.exit).to.be.a('Function');
      expect(function () { chartlet.enter(); }).to.not.throw(Error);
      expect(function () { chartlet.update(); }).to.not.throw(Error);
      expect(function () { chartlet.exit(); }).to.not.throw(Error);
      expect(chartlet.getCustomEventNames()).to.deep.equal(customEvents);
    });
    it('arguments "update", "exit" and "customEvents" are optional', function () {
      const comp = new Chartlet(enter);
      expect(comp).to.be.an('Object');
      expect(comp).to.include.keys(['property', 'on']);
      expect(comp.enter).to.be.a('Function');
      expect(comp.update).to.be.a('Function');
      expect(comp.exit).to.be.a('Function');
      expect(function () { comp.enter(); }).to.not.throw(Error);
      expect(function () { comp.update(); }).to.not.throw(Error);
      expect(function () { comp.exit(); }).to.not.throw(Error);
    });
  });

  describe('#getDispatcher()', function () {
    it('should return a dispatcher', function () {
      const dispatcher = chartlet.getDispatcher();
      expect(dispatcher).to.exist;
    });
    it('returned dispatcher should handle enter/update/exit events', function () {
      const dispatcher = chartlet.getDispatcher();
      expect(dispatcher._).to.include.keys(['enterDone', 'updateDone', 'exitDone'].concat(customEvents));
    });
  });

  describe('#getPropertyValue(name, d, i)', function () {
    it('should return computed value for specified property name, d and i', function () {
      const d = { a: 99 };
      const i = 2;

      chartlet.property('foo', 1);
      chartlet.property('bar', 'two');
      chartlet.property('baz', function (d, i) { return 3; });
      chartlet.property('qux', function (d, i) { return 'four'; });
      chartlet.property('nux', function (d, i) { return d.a * i; });

      expect(chartlet.getPropertyValue('foo', d, i)).to.equal(1);
      expect(chartlet.getPropertyValue('bar', d, i)).to.equal('two');
      expect(chartlet.getPropertyValue('baz', d, i)).to.equal(3);
      expect(chartlet.getPropertyValue('qux', d, i)).to.equal('four');
      expect(chartlet.getPropertyValue('nux', d, i)).to.equal(198);
    });
  });

  describe('#property(name, valueOrFn)', function () {
    describe('should act as a getter when called with one argument', function () {
      it('should always return a function', function () {
        chartlet.property('foo', 1);
        expect(chartlet.property('foo')).to.be.a('Function');
        chartlet.property('bar', function () { return 100; });
        expect(chartlet.property('bar')).to.be.a('Function');
      });
      it('should return a function that return undefined for unknown property name', function () {
        expect(chartlet.property('unknown name')).to.be.a('Function');
        expect(chartlet.property('unknown name')()).to.equal(undefined);
      });
    });

    describe('should act as a setter when called with two arguments', function () {
      it('should set specified property to a functor of given value', function () {
        chartlet.property('foo', 1);
        expect(chartlet.property('foo')).to.be.a('Function');
        expect(chartlet.property('foo')()).to.equal(1);
        chartlet.property('bar', function () { return 100; });
        expect(chartlet.property('bar')).to.be.a('Function');
        expect(chartlet.property('bar')()).to.equal(100);
      });
      it('should overwrite previous value when set property with the same name', function () {
        chartlet.property('foo', 1);
        expect(chartlet.property('foo')()).to.equal(1);
        chartlet.property('foo', 100);
        expect(chartlet.property('foo')()).to.equal(100);
      });
    });
  });

  describe('#on(eventName, listener)', function () {
    it('event "enterDone" should be triggered after chartlet.enter() is completed.', function (done) {
      chartlet.on('enterDone', function () { done(); });
      chartlet.enter([]);
    });
    it('event "updateDone" should be triggered after chartlet.update() is completed.', function (done) {
      chartlet.on('updateDone', function () { done(); });
      chartlet.update([]);
    });
    it('event "exitDone" should be triggered after chartlet.exit() is completed.', function (done) {
      chartlet.on('exitDone', function () { done(); });
      chartlet.exit([]);
    });
  });

  describe('#inheritPropertyFrom(parentChartlet, parentPropertyName, childPropertyName)', function () {
    it('it should cause a child to inherit a parent property', function () {
      parent = new ParentChartlet(
        function (parent, child) {
          child.inheritPropertyFrom(parent, 'foo', 'bar');
        })
        .property('foo', function (d) { return 2 * d; });

      parent.runTest(function (child) {
        expect(child.getPropertyValue('bar', 4)).to.be.equal(8);
      });
    });

    it('it should default to the parent property name', function () {
      parent = new ParentChartlet(
        function (parent, child) {
          child.inheritPropertyFrom(parent, 'foo');
        })
        .property('foo', function (d) { return 2 * d; });

      parent.runTest(function (child) {
        expect(child.getPropertyValue('foo', 4)).to.be.equal(8);
      });
    });
  });

  describe('#inheritProperties(parentChartlet, parentPropertyNames, childPropertyNames)', function () {
    it('it should cause a child to inherit many parent properties', function () {
      parent = new ParentChartlet(
        function (parent, child) {
          child.inheritPropertiesFrom(parent, ['foo', 'bar', 'baz'], ['foo-x', 'bar-x', 'baz-x']);
        })
        .property('foo', function (d) { return 2 * d; })
        .property('bar', function (d) { return 3 * d; })
        .property('baz', function (d) { return 4 * d; });

      parent.runTest(function (child) {
        expect(child.getPropertyValue('foo-x', 1)).to.be.equal(2);
        expect(child.getPropertyValue('bar-x', 1)).to.be.equal(3);
        expect(child.getPropertyValue('baz-x', 1)).to.be.equal(4);
      });
    });

    it('it should default to the parent property names', function () {
      parent = new ParentChartlet(
        function (parent, child) {
          child.inheritPropertiesFrom(parent, ['foo', 'bar', 'baz']);
        })
        .property('foo', function (d) { return 2 * d; })
        .property('bar', function (d) { return 3 * d; })
        .property('baz', function (d) { return 4 * d; });

      parent.runTest(function (child) {
        expect(child.getPropertyValue('foo', 1)).to.be.equal(2);
        expect(child.getPropertyValue('bar', 1)).to.be.equal(3);
        expect(child.getPropertyValue('baz', 1)).to.be.equal(4);
      });
    });
  });

  describe('#publishEventsTo(foreignDispatcher)', function () {
    it('should map events to a foreignDispatcher', function (done) {
      const parent = new Chartlet(callback, callback, callback, ['foo']);
      parent.getDispatcher().on('foo', function (value) {
        expect(value).to.be.equal(99);
        done();
      });

      const child = new Chartlet(callback, callback, callback, ['foo'])
        .publishEventsTo(parent.getDispatcher());

      child.getDispatcher().call('foo', this, 99);
    });
  });
});
