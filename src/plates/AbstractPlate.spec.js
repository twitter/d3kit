import AbstractPlate from './AbstractPlate.js';

describe('AbstractPlate', () => {
  let node, plate;

  it('should exist', () => {
    expect(AbstractPlate).to.exist;
  });

  beforeEach(() => {
    node = document.createElement('div');
    plate = new AbstractPlate(node, {
      initialWidth: 5,
      initialHeight: 5,
    });
  });

  describe('new AbstractPlate(node, options)', () => {
    it('should construct an object with the given parameters', () => {
      expect(plate).to.exist;
      expect(plate.width()).to.equal(5);
      expect(plate.height()).to.equal(5);
    });
  });

  describe('.getNode()', () => {
    it('should return the node passed to constructor', () => {
      expect(plate.getNode()).to.equal(node);
    });
  });

  describe('.getSelection()', () => {
    it('should return selection of the node passed to constructor', () => {
      expect(plate.getSelection().node()).to.equal(node);
    });
  });
});
