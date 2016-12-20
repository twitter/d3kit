import CanvasPlate from './CanvasPlate.js';
import LayerOrganizer from '../layerOrganizer.js';

describe('CanvasPlate', () => {
  let plate;

  it('should exist', () => {
    expect(CanvasPlate).to.exist;
  });

  beforeEach(() => {
    plate = new CanvasPlate({
      initialWidth: 100,
      initialHeight: 100,
      margin: {
        top: 10,
        right: 10,
        bottom: 10,
        left: 10,
      },
      offset: [1, 1],
      pixelRatio: 2,
    });
  });

  describe('constructor(params)', () => {
    it('should construct a plate that contains <canvas>', () => {
      expect(plate).to.exist;
      expect(plate.getNode().tagName.toLowerCase()).to.equal('canvas');
    });
  });

  describe('.getContext2d()', () => {
    it('should return context', () => {
      const ctx = plate.getContext2d();
      expect(ctx).to.exist;
    });

    it('should adjust scale and translation', () => {
      const ctx = plate.getContext2d();
      ctx.fillStyle = 'rgb(44,44,44)';
      ctx.fillRect(0, 0, 10, 10);
      const outside = ctx.getImageData(21, 21, 1, 1).data;
      expect(outside[0]).to.equal(0);
      expect(outside[1]).to.equal(0);
      expect(outside[2]).to.equal(0);
      const inside = ctx.getImageData(22, 22, 1, 1).data;
      expect(inside[0]).to.equal(44);
      expect(inside[1]).to.equal(44);
      expect(inside[2]).to.equal(44);
    });
  });

  describe('.clear()', () => {
    it('should clear canvas', () => {
      // fill first
      const ctx = plate.getContext2d();
      ctx.fillStyle = 'rgb(44,44,44)';
      ctx.fillRect(0, 0, 10, 10);
      const before = ctx.getImageData(22, 22, 1, 1).data;
      expect(before[0]).to.equal(44);
      expect(before[1]).to.equal(44);
      expect(before[2]).to.equal(44);

      // then clear
      plate.clear();
      const after = ctx.getImageData(22, 22, 1, 1).data;
      expect(after[0]).to.equal(0);
      expect(after[1]).to.equal(0);
      expect(after[2]).to.equal(0);
    });
  });

  describe('.updateDimensionNow()', () => {
    it('should update <canvas> dimension', () => {
      plate.updateDimensionNow();
      const canvas = plate.getSelection();
      expect(+canvas.attr('width')).to.equal(200);
      expect(+canvas.attr('height')).to.equal(200);
      expect(canvas.node().style.width).to.equal('100px');
      expect(canvas.node().style.height).to.equal('100px');
    });
  });
});
