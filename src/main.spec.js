import * as d3Kit from './main.js';

describe('d3Kit', () => {
  it('should exist', () => {
    expect(d3Kit).to.exist;
  });

  [
    'AbstractChart',
    'CanvasChart',
    'HybridChart',
    'SvgChart',
    'AbstractPlate',
    'CanvasPlate',
    'DivPlate',
    'SvgPlate',
    'helper',
    'LayerOrganizer',
  ].forEach(module => {
    it(`should include module ${module}`, () => {
      expect(d3Kit[module]).to.exist;
    });
  });
});
