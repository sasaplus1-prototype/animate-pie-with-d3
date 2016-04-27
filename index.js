(function(){

  'use strict';

  var colors, pie;

  colors = d3.scale.category20();
  pie = d3.layout.pie();

  var area, width, arc, pies;

  area = d3.select('#js-pie-area');
  width = parseInt(area.style('width'), 10);

  arc =
    d3
      .svg
      .arc()
      .innerRadius(width / 4)
      .outerRadius(width / 2)
      ;

  pies =
    area
      .selectAll('path')
      .data(
        pie([30, 20, 20, 10, 10, 5, 5])
      )
      .enter()
      .append('path')
      .attr(
        'transform',
        'translate(' + (width / 2) + ',' + (width / 2) + ')'
      )
      .style('stroke', 'transparent')
      .style('fill', function(d, i) {
        return colors(i);
      })
      .transition()
      .duration(500)
      .delay(function(d, i) {
        return i * 500;
      })
      .ease('bounce')
      .attrTween('d', function(d, i) {
        var interpolate = d3.interpolate(
          { startAngle: d.startAngle, endAngle: d.startAngle },
          { startAngle: d.startAngle, endAngle: d.endAngle }
        );

        return function(t) {
          return arc(interpolate(t));
        };
      })
      ;

}());
