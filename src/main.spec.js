import * as d3Kit from './main.js';

describe('d3Kit', () => {
  it('should exist', () => {
    expect(d3Kit).to.exist;
  });

  [
    'AbstractChart',
    'CanvasChart',
    'SvgChart',
    'helper',
    'LayerOrganizer',
  ].forEach(module => {
    it(`should have ${module}`, () => {
      expect(d3Kit[module]).to.exist;
    });
  })

});
