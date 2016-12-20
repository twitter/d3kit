import SvgPlate from './SvgPlate.js';
import LayerOrganizer from '../layerOrganizer.js';

describe('SvgPlate', ()=>{
  let plate

  it('should exist', ()=>{
    expect(SvgPlate).to.exist;
  });

  beforeEach(() => {
    plate = new SvgPlate({
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

  describe('constructor(params)', ()=>{
    it('should construct a plate that contains <svg>', ()=>{
      expect(plate).to.exist;
      expect(plate.getNode().tagName).to.equal('svg');
    });
    it('should create root <g> inside <svg>', ()=>{
      expect(plate.rootG.node().tagName).to.equal('g');
    });
    it('should create layer organizer', ()=>{
      expect(plate.layers).to.exist;
    });
  });

  describe('.updateDimensionNow()', ()=>{
    it('should update <svg> dimension', ()=>{
      plate.updateDimensionNow();
      const svg = plate.getSelection();
      expect(+svg.attr('width')).to.equal(10);
      expect(+svg.attr('height')).to.equal(10);
      expect(plate.rootG.attr('transform')).to.equal('translate(11,11)');
    });
  });

});