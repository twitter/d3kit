import DivPlate from './DivPlate.js';

describe('DivPlate', () => {
  let plate;

  it('should exist', () => {
    expect(DivPlate).to.exist;
  });

  beforeEach(() => {
    plate = new DivPlate({
      initialWidth: 100,
      initialHeight: 100,
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

  describe('constructor(params)', () => {
    it('should construct a plate that contains <svg>', () => {
      expect(plate).to.exist;
      expect(plate.getNode().tagName.toLowerCase()).to.equal('div');
    });
  });

  describe('.updateDimensionNow()', () => {
    it('should update <div> dimension', () => {
      plate.updateDimensionNow();
      const div = plate.getNode();
      expect(div.style.width).to.equal('80px');
      expect(div.style.height).to.equal('80px');
      expect(div.style.marginLeft).to.equal('10px');
      expect(div.style.marginRight).to.equal('10px');
      expect(div.style.marginTop).to.equal('10px');
      expect(div.style.marginBottom).to.equal('10px');
    });
  });
});
