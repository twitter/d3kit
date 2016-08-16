/* jshint expr: true */

import { select } from 'd3-selection';
import LayerOrganizer from './layerOrganizer.js';

describe('LayerOrganizer', function(){

  describe('new LayerOrganizer(container) will create layers as <g> by default', function(){
    var container, layers;
    before(function(done){
      container = select('body').append('svg').append('g');
      layers = new LayerOrganizer(container);
      done();
    });

    describe('#create(names)', function(){
      it('should create single layer given a String', function(){
        layers.create('single');
        expect(container.select('g.single-layer').size()).to.be.equal(1);
      });

      it('should create multiple layers given an array', function(){
        layers.create(['a', 'b', 'c']);
        expect(container.select('g.a-layer').size()).to.be.equal(1);
        expect(container.select('g.b-layer').size()).to.be.equal(1);
        expect(container.select('g.c-layer').size()).to.be.equal(1);
      });

      it('should create nested layers given a plain Object with a String inside', function(){
        layers.create({d: 'e'});
        expect(container.select('g.d-layer').size()).to.be.equal(1);
        expect(container.select('g.d-layer g.e-layer').size()).to.be.equal(1);
      });

      it('should create nested layers given a plain Object with an Array inside', function(){
        layers.create({f: ['g', 'h']});
        expect(container.select('g.f-layer').size()).to.be.equal(1);
        expect(container.select('g.f-layer g.g-layer').size()).to.be.equal(1);
        expect(container.select('g.f-layer g.h-layer').size()).to.be.equal(1);
      });

      it('should create multiple nested layers given an array of objects', function(){
        layers.create([{'i': ['x']}, {'j': 'x'}, {'k': ['x','y']}]);
        expect(container.select('g.i-layer').size()).to.be.equal(1);
        expect(container.select('g.j-layer').size()).to.be.equal(1);
        expect(container.select('g.k-layer').size()).to.be.equal(1);
        expect(container.select('g.i-layer g.x-layer').size()).to.be.equal(1);
        expect(container.select('g.i-layer g.x-layer').size()).to.be.equal(1);
        expect(container.select('g.k-layer g.x-layer').size()).to.be.equal(1);
        expect(container.select('g.k-layer g.y-layer').size()).to.be.equal(1);
      });

      it('should create multi-level nested layers given a nested plain Object', function(){
        layers.create({
          l: [
            'm',
            {'n': [
              {'o': ['p']}, 'q'
            ]}
          ]
        });
        expect(container.select('g.l-layer').size()).to.be.equal(1);
        expect(container.select('g.l-layer g.m-layer').size()).to.be.equal(1);
        expect(container.select('g.l-layer g.n-layer').size()).to.be.equal(1);
        expect(container.select('g.l-layer g.n-layer g.o-layer').size()).to.be.equal(1);
        expect(container.select('g.l-layer g.n-layer g.o-layer g.p-layer').size()).to.be.equal(1);
        expect(container.select('g.l-layer g.n-layer g.q-layer').size()).to.be.equal(1);
      });

    });

    describe('#has(name)', function(){
      it('should be able to check first-level layer', function(){
        expect(layers.has('single')).to.be.true;
        expect(layers.has('test')).to.be.false;
      });
      it('should be able to check second-level layer', function(){
        expect(layers.has('l.m')).to.be.true;
        expect(layers.has('l.x')).to.be.false;
      });
      it('should be able to check third-level layer', function(){
        expect(layers.has('l.n.q')).to.be.true;
        expect(layers.has('l.n.x')).to.be.false;
      });
    });

    describe('#get(name)', function(){
      it('should be able to get first-level layer', function(){
        expect(layers.get('single')).to.exist;
        expect(layers.get('test')).to.be.not.exist;
      });
      it('should be able to get second-level layer', function(){
        expect(layers.get('l.m')).to.exist;
        expect(layers.get('l.x')).to.not.exist;
      });
      it('should be able to get third-level layer', function(){
        expect(layers.get('l.n.o')).to.exist;
        expect(layers.get('l.n.x')).to.not.exist;
      });
    });
  });

  describe('new LayerOrganizer(container, tag) will create layers with the given tag instead of <g>', function(){
    var container, layers;
    before(function(done){
      container = select('body').append('div');
      layers = new LayerOrganizer(container, 'div');
      done();
    });

    describe('#create(names)', function(){
      it('should create single layer given a String', function(){
        layers.create('single');
        expect(container.select('div.single-layer').size()).to.be.equal(1);
      });

      it('should create multiple layers given an array', function(){
        layers.create(['a', 'b', 'c']);
        expect(container.select('div.a-layer').size()).to.be.equal(1);
        expect(container.select('div.b-layer').size()).to.be.equal(1);
        expect(container.select('div.c-layer').size()).to.be.equal(1);
      });

      it('should create nested layers given a plain Object with a String inside', function(){
        layers.create({d: 'e'});
        expect(container.select('div.d-layer').size()).to.be.equal(1);
        expect(container.select('div.d-layer div.e-layer').size()).to.be.equal(1);
      });

      it('should create nested layers given a plain Object with an Array inside', function(){
        layers.create({f: ['g', 'h']});
        expect(container.select('div.f-layer').size()).to.be.equal(1);
        expect(container.select('div.f-layer div.g-layer').size()).to.be.equal(1);
        expect(container.select('div.f-layer div.h-layer').size()).to.be.equal(1);
      });

      it('should create multiple nested layers given an array of objects', function(){
        layers.create([{'i': ['x']}, {'j': 'x'}, {'k': ['x','y']}]);
        expect(container.select('div.i-layer').size()).to.be.equal(1);
        expect(container.select('div.j-layer').size()).to.be.equal(1);
        expect(container.select('div.k-layer').size()).to.be.equal(1);
        expect(container.select('div.i-layer div.x-layer').size()).to.be.equal(1);
        expect(container.select('div.i-layer div.x-layer').size()).to.be.equal(1);
        expect(container.select('div.k-layer div.x-layer').size()).to.be.equal(1);
        expect(container.select('div.k-layer div.y-layer').size()).to.be.equal(1);
      });

      it('should create multi-level nested layers given a nested plain Object', function(){
        layers.create({
          l: [
            'm',
            {'n': [
              {'o': ['p']}, 'q'
            ]}
          ]
        });
        expect(container.select('div.l-layer').size()).to.be.equal(1);
        expect(container.select('div.l-layer div.m-layer').size()).to.be.equal(1);
        expect(container.select('div.l-layer div.n-layer').size()).to.be.equal(1);
        expect(container.select('div.l-layer div.n-layer div.o-layer').size()).to.be.equal(1);
        expect(container.select('div.l-layer div.n-layer div.o-layer div.p-layer').size()).to.be.equal(1);
        expect(container.select('div.l-layer div.n-layer div.q-layer').size()).to.be.equal(1);
      });

    });

    describe('#has(name)', function(){
      it('should be able to check first-level layer', function(){
        expect(layers.has('single')).to.be.true;
        expect(layers.has('test')).to.be.false;
      });
      it('should be able to check second-level layer', function(){
        expect(layers.has('l.m')).to.be.true;
        expect(layers.has('l.x')).to.be.false;
      });
      it('should be able to check third-level layer', function(){
        expect(layers.has('l.n.q')).to.be.true;
        expect(layers.has('l.n.x')).to.be.false;
      });
    });

    describe('#get(name)', function(){
      it('should be able to get first-level layer', function(){
        expect(layers.get('single')).to.exist;
        expect(layers.get('test')).to.be.not.exist;
      });
      it('should be able to get second-level layer', function(){
        expect(layers.get('l.m')).to.exist;
        expect(layers.get('l.x')).to.not.exist;
      });
      it('should be able to get third-level layer', function(){
        expect(layers.get('l.n.o')).to.exist;
        expect(layers.get('l.n.x')).to.not.exist;
      });
    });
  });

});
