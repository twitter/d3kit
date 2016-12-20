import Base from './Base.js';

class TestBase extends Base {
  constructor(...args) {
    super(...args);
    this.counter = {
      updateDimension: 0,
    };
  }

  _updateDimension() {
    this.counter.updateDimension++;
  }
}

describe('Base', () => {
  let base;

  it('should exist', () => {
    expect(Base).to.exist;
  });

  beforeEach(() => {
    base = new TestBase({
      initialWidth: 10,
      initialHeight: 10,
      margin: {
        top: 10,
        right: 10,
        bottom: 10,
        left: 10,
      },
      offset: [1, 1],
      pixelRatio: 10,
    });
  });

  describe('(static) Base.getDefaultOptions()', () => {
    it('should return an options object', () => {
      const options = Base.getDefaultOptions();
      expect(options).to.be.an('Object');
    });
  });

  describe('new Base(options)', () => {
    it('should construct an object with the given options', () => {
      expect(base).to.exist;
      expect(base.width()).to.equal(10);
      expect(base.height()).to.equal(10);
      expect(base.margin()).to.deep.equal({ top: 10, right: 10, bottom: 10, left: 10 });
      expect(base.pixelRatio()).to.equal(10);
      expect(base.offset()).to.deep.equal([1, 1]);
    });
  });

  describe('.dimension([dimension])', () => {
    describe('as getter: when called without argument', () => {
      it('should return current value', () => {
        expect(base.dimension()).to.deep.equal([10, 10]);
      });
    });
    describe('as setter: when called with argument', () => {
      it('should set value and update dimension if the new value is different from current value', (done) => {
        base.dimension([20, 20]);
        expect(base.dimension()).to.deep.equal([20, 20]);
        window.setTimeout(() => {
          expect(base.counter.updateDimension).to.equal(1);
          done();
        }, 10);
      });
      it('should not update dimension if the new value is equal to current value', (done) => {
        base.dimension([10, 10]);
        expect(base.dimension()).to.deep.equal([10, 10]);
        window.setTimeout(() => {
          expect(base.counter.updateDimension).to.equal(0);
          done();
        }, 10);
      });
      it('should return this', () => {
        expect(base.dimension([5, 5])).to.equal(base);
      });
    });
  });

  describe('.margin([margin])', () => {
    describe('as getter: when called without argument', () => {
      it('should return current value', () => {
        expect(base.margin()).to.deep.equal({ left: 10, right: 10, top: 10, bottom: 10 });
      });
    });
    describe('as setter: when called with argument', () => {
      it('should set value and update dimension if the new value is different from current value', (done) => {
        base.margin({ left: 1, right: 1, top: 1, bottom: 1 });
        expect(base.margin()).to.deep.equal({ left: 1, right: 1, top: 1, bottom: 1 });
        window.setTimeout(() => {
          expect(base.counter.updateDimension).to.equal(1);
          done();
        }, 10);
      });
      it('should accept partial values, not all "top", "left", "bottom", "right" have to be present.', () => {
        base.margin({ left: 21 });
        expect(base.margin().left).to.equal(21);
        base.margin({ right: 22 });
        expect(base.margin().right).to.equal(22);
        base.margin({ top: 23 });
        expect(base.margin().top).to.equal(23);
        base.margin({ bottom: 24 });
        expect(base.margin().bottom).to.equal(24);
      });
      it('should not update dimension if the new value is equal to current value', (done) => {
        base.margin({ left: 10, right: 10, top: 10, bottom: 10 });
        expect(base.margin()).to.deep.equal({ left: 10, right: 10, top: 10, bottom: 10 });
        window.setTimeout(() => {
          expect(base.counter.updateDimension).to.equal(0);
          done();
        }, 10);
      });
      it('should return this', () => {
        expect(base.margin({ top: 12 })).to.equal(base);
      });
    });
  });

  describe('.offset([offset])', () => {
    describe('as getter: when called without argument', () => {
      it('should return current value', () => {
        expect(base.offset()).to.deep.equal([1, 1]);
      });
    });
    describe('as setter: when called with argument', () => {
      it('should set value and update dimension if the new value is different from current value', (done) => {
        base.offset([2, 2]);
        expect(base.offset()).to.deep.equal([2, 2]);
        window.setTimeout(() => {
          expect(base.counter.updateDimension).to.equal(1);
          done();
        }, 10);
      });
      it('should not update dimension if the new value is equal to current value', (done) => {
        base.offset([1, 1]);
        expect(base.offset()).to.deep.equal([1, 1]);
        window.setTimeout(() => {
          expect(base.counter.updateDimension).to.equal(0);
          done();
        }, 10);
      });
      it('should return this', () => {
        expect(base.offset([3, 3])).to.equal(base);
      });
    });
  });

  ['width', 'height', 'pixelRatio'].forEach(field => {
    describe(`.${field}([${field}]])`, () => {
      describe('as getter: when called without argument', () => {
        it('should return current value', () => {
          expect(base[field]()).to.equal(10);
        });
      });
      describe('as setter: when called with argument', () => {
        it('should set value and update dimension if the new value is different from current value', (done) => {
          base[field](1);
          expect(base[field]()).to.equal(1);
          window.setTimeout(() => {
            expect(base.counter.updateDimension).to.equal(1);
            done();
          }, 10);
        });
        it('should not update dimension if the new value is equal to current value', (done) => {
          base[field](10);
          expect(base[field]()).to.equal(10);
          window.setTimeout(() => {
            expect(base.counter.updateDimension).to.equal(0);
            done();
          }, 10);
        });
        it('should return this', () => {
          expect(base[field](12)).to.equal(base);
        });
      });
    });
  });

  describe('.copyDimension(another)', () => {
    it('should copy all fields and update dimension', (done) => {
      const state = {
        initialWidth: 20,
        initialHeight: 20,
        margin: {
          top: 20,
          right: 20,
          bottom: 20,
          left: 20,
        },
        offset: [2, 2],
        pixelRatio: 2,
      };
      base.copyDimension(new Base(state));
      expect(base.width()).to.equal(state.initialWidth);
      expect(base.height()).to.equal(state.initialHeight);
      expect(base.pixelRatio()).to.equal(state.pixelRatio);
      expect(base.margin()).to.deep.equal(state.margin);
      expect(base.offset()).to.deep.equal(state.offset);

      window.setTimeout(() => {
        expect(base.counter.updateDimension).to.equal(1);
        done();
      }, 10);
    });
    it('should do nothing if "another" is not defined', (done) => {
      base.copyDimension(null);
      base.copyDimension(undefined);
      window.setTimeout(() => {
        expect(base.counter.updateDimension).to.equal(0);
        done();
      }, 10);
    });
    it('should return this', () => {
      expect(base.copyDimension()).to.equal(base);
    });
  });

  describe('.updateDimensionNow()', () => {
    it('should trigger update dimension immediately', () => {
      expect(base.counter.updateDimension).to.equal(0);
      base.updateDimensionNow();
      expect(base.counter.updateDimension).to.equal(1);
    });
    it('should return this', () => {
      expect(base.updateDimensionNow()).to.equal(base);
    });
  });
});
