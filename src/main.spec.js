import * as d3Kit from './main.js';

describe('d3Kit', () => {
  it('should exist', () => {
    expect(d3Kit).to.be.defined;
  });

  it('should have Skeleton', () => {
    expect(d3Kit.Skeleton).to.be.defined;
  });

  it('should have Chartlet', () => {
    expect(d3Kit.Chartlet).to.be.defined;
  });

  it('should have factory', () => {
    expect(d3Kit.factory).to.be.defined;
  });

  it('should have helper', () => {
    expect(d3Kit.helper).to.be.defined;
  });

  it('should have LayerOrganizer', () => {
    expect(d3Kit.LayerOrganizer).to.be.defined;
  });
});
