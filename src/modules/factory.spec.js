/* jshint expr: true */

define(['./factory'], function(factory){
  describe.only('#createChart', function(){
    var Chart = factory.createChart({}, ['test'], function(skeleton){
      return skeleton;
    });

    it('should return a function to create a chart', function(){
      expect(Chart).to.be.a('Function');
    });

    it('results should have function getCustomEvents()', function(){
      expect(Chart.getCustomEvents).to.exists;
      expect(Chart.getCustomEvents()).to.deep.equal(['test']);
    });
  });
});