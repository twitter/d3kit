import * as helper from './helper.js';

describe('helper', function () {
  describe('.deepExtend(target, src1, src2, ...)', function () {
    it('should copy fields from sources into target', function () {
      expect(helper.deepExtend({}, {
        a: 1,
        b: 2,
      }, {
        b: 3,
        c: 4,
      })).to.deep.equal({
        a: 1,
        b: 3,
        c: 4,
      });

      expect(helper.deepExtend({}, {
        a: 1,
        b: 2,
      }, {
        b: 3,
        c: 4,
      }, null)).to.deep.equal({
        a: 1,
        b: 3,
        c: 4,
      });
    });

    it('should copy arrays and functions correctly from sources into target', function () {
      const fn1 = function (d) { return d + 1; };
      const fn2 = function (d) { return d + 2; };
      expect(helper.deepExtend({}, {
        a: fn1,
        b: [1, 2],
      }, {
        b: [3, 4],
        c: fn2,
      })).to.deep.equal({
        a: fn1,
        b: [3, 4],
        c: fn2,
      });
    });

    it('should perform "deep" copy', function () {
      const fn1 = function (d) { return d + 1; };
      const fn2 = function (d) { return d + 2; };
      expect(helper.deepExtend({}, {
        a: { d: fn1 },
        b: [1, 2],
        c: { f: 3 },
        h: { i: [1, 2, 3], j: [3, 4, 5] },
      }, {
        a: { e: 2 },
        b: [3, 4],
        c: { f: 4, g: fn2 },
        h: { i: [2, 3, 4], k: [3, 4, 5], l: { m: 2 } },
      })).to.deep.equal({
        a: { d: fn1, e: 2 },
        b: [3, 4],
        c: { f: 4, g: fn2 },
        h: { i: [2, 3, 4], j: [3, 4, 5], k: [3, 4, 5], l: { m: 2 } },
      });
    });
  });

  describe('.extend(target, src1, src2, ...)', function () {
    it('should copy fields from sources into target', function () {
      expect(helper.extend({}, {
        a: 1,
        b: 2,
      }, {
        b: 3,
        c: 4,
      })).to.deep.equal({
        a: 1,
        b: 3,
        c: 4,
      });

      expect(helper.extend({}, {
        a: 1,
        b: 2,
      }, {
        b: 3,
        c: 4,
      }, null)).to.deep.equal({
        a: 1,
        b: 3,
        c: 4,
      });
    });

    it('should copy arrays and functions correctly from sources into target', function () {
      const fn1 = function (d) { return d + 1; };
      const fn2 = function (d) { return d + 2; };
      expect(helper.extend({}, {
        a: fn1,
        b: [1, 2],
      }, {
        b: [3, 4],
        c: fn2,
      })).to.deep.equal({
        a: fn1,
        b: [3, 4],
        c: fn2,
      });
    });

    it('should NOT perform "deep" copy', function () {
      const fn1 = function (d) { return d + 1; };
      const fn2 = function (d) { return d + 2; };
      expect(helper.extend({}, {
        a: { d: fn1 },
        b: [1, 2],
        c: { f: 3 },
        h: { i: [1, 2, 3], j: [3, 4, 5] },
      }, {
        a: { e: 2 },
        b: [3, 4],
        c: { f: 4, g: fn2 },
        h: { i: [2, 3, 4], k: [3, 4, 5], l: { m: 2 } },
      })).to.deep.equal({
        a: { e: 2 },
        b: [3, 4],
        c: { f: 4, g: fn2 },
        h: { i: [2, 3, 4], k: [3, 4, 5], l: { m: 2 } },
      });
    });
  });

  describe('.isFunction(function)', function () {
    it('should return true if the value is a function', function () {
      const fn1 = function (d) { return d + 1; };
      function fn2(d) { return d + 2; }

      expect(helper.isFunction(fn1)).to.be.true;
      expect(helper.isFunction(fn2)).to.be.true;
    });
    it('should return false if the value is not a function', function () {
      expect(helper.isFunction(0)).to.be.false;
      expect(helper.isFunction(1)).to.be.false;
      expect(helper.isFunction(true)).to.be.false;
      expect(helper.isFunction('what')).to.be.false;
      expect(helper.isFunction(null)).to.be.false;
      expect(helper.isFunction(undefined)).to.be.false;
    });
  });

  describe('.kebabCase(str)', function () {
    it('should convert input to dash-case', function () {
      expect(helper.kebabCase('camelCase')).to.equal('camel-case');
    });
  });
});
