/* jshint expr: true */

import { select } from 'd3-selection';
import LayerOrganizer from './layerOrganizer.js';

describe('LayerOrganizer', () => {
  let container, layers;
  before(done => {
    container = select('body').append('svg').append('g');
    layers = new LayerOrganizer(container);
    done();
  });

  describe('new LayerOrganizer(container)', () => {
    it('should create an organizer', () => {
      const l = new LayerOrganizer(container);
      expect(l).to.exist;
    });
  });

  describe('.create(config)', () => {
    it('should create single layer as <g> given a String "name"', () => {
      layers.create('single');
      expect(container.select('g.single-layer').size()).to.be.equal(1);
    });

    it('should create single layer as <tag> given a String "tag.name"', () => {
      layers.create('div.customTag');
      expect(container.select('div.custom-tag-layer').size()).to.be.equal(1);
    });

    it('should create multiple layers given an array', () => {
      layers.create(['a', 'div.b', 'span.c']);
      expect(container.select('g.a-layer').size()).to.be.equal(1);
      expect(container.select('div.b-layer').size()).to.be.equal(1);
      expect(container.select('span.c-layer').size()).to.be.equal(1);
    });

    it('should create nested layers given a plain Object with a String inside', () => {
      layers.create({ 'g.d': 'div.e' });
      expect(container.select('g.d-layer').size()).to.be.equal(1);
      expect(container.select('g.d-layer div.e-layer').size()).to.be.equal(1);
    });

    it('should create nested layers given a plain Object with an Array inside', () => {
      layers.create({ f: ['g', 'h'] });
      expect(container.select('g.f-layer').size()).to.be.equal(1);
      expect(container.select('g.f-layer g.g-layer').size()).to.be.equal(1);
      expect(container.select('g.f-layer g.h-layer').size()).to.be.equal(1);
    });

    it('should create multiple nested layers given an array of objects', () => {
      layers.create([{ 'i': ['x'] }, { 'j': 'x' }, { 'k': ['x', 'y'] }]);
      expect(container.select('g.i-layer').size()).to.be.equal(1);
      expect(container.select('g.j-layer').size()).to.be.equal(1);
      expect(container.select('g.k-layer').size()).to.be.equal(1);
      expect(container.select('g.i-layer g.x-layer').size()).to.be.equal(1);
      expect(container.select('g.i-layer g.x-layer').size()).to.be.equal(1);
      expect(container.select('g.k-layer g.x-layer').size()).to.be.equal(1);
      expect(container.select('g.k-layer g.y-layer').size()).to.be.equal(1);
    });

    it('should create multi-level nested layers given a nested plain Object', () => {
      layers.create({
        l: [
          'm',
          { 'n': [
            { 'o': ['p'] }, 'q',
          ] },
        ],
      });
      expect(container.select('g.l-layer').size()).to.be.equal(1);
      expect(container.select('g.l-layer g.m-layer').size()).to.be.equal(1);
      expect(container.select('g.l-layer g.n-layer').size()).to.be.equal(1);
      expect(container.select('g.l-layer g.n-layer g.o-layer').size()).to.be.equal(1);
      expect(container.select('g.l-layer g.n-layer g.o-layer g.p-layer').size()).to.be.equal(1);
      expect(container.select('g.l-layer g.n-layer g.q-layer').size()).to.be.equal(1);
    });
  });

  describe('.has(name)', () => {
    it('should be able to check first-level layer', () => {
      expect(layers.has('single')).to.be.true;
      expect(layers.has('test')).to.be.false;
    });
    it('should be able to check second-level layer', () => {
      expect(layers.has('l/m')).to.be.true;
      expect(layers.has('l/x')).to.be.false;
    });
    it('should be able to check third-level layer', () => {
      expect(layers.has('l/n/q')).to.be.true;
      expect(layers.has('l/n/x')).to.be.false;
    });
  });

  describe('.get(name)', () => {
    it('should be able to get first-level layer', () => {
      expect(layers.get('single')).to.exist;
      expect(layers.get('test')).to.be.not.exist;
    });
    it('should be able to get second-level layer', () => {
      expect(layers.get('l/m')).to.exist;
      expect(layers.get('l/x')).to.not.exist;
    });
    it('should be able to get third-level layer', () => {
      expect(layers.get('l/n/o')).to.exist;
      expect(layers.get('l/n/x')).to.not.exist;
    });
  });
});
