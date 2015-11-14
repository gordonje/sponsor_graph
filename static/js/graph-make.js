var margin = {top: 20, right: 20, bottom: 60, left: 50},
    width = 1000 - margin.left - margin.right,
    height = 600 - margin.top - margin.bottom;

// var nodeScale = d3.scale.log()

var color = d3.scale.category10();

var force = d3.layout.force()
    .charge(-120)
    .linkDistance(30)
    .size([width, height]);

var svg = d3.select(".chart").append("svg")
      .attr("width", width)
      .attr("height", height)
    .append("g")
      .call(d3.behavior.zoom().scaleExtent([0, 8]).on("zoom", zoom))
    .append("g");

  svg.append("rect")
    .attr("class", "overlay")
    .attr("width", width)
    .attr("height", height);

d3.json("data/dummy.json", function(error, graph) {
  force
      .nodes(graph.nodes)
      .links(graph.links)
      .start();

  var link = svg.selectAll(".link")
      .data(graph.links)
    .enter().append("line")
      .attr("class", "link")
      // .style("stroke-width", function(d) { return Math.sqrt(d.value); })
      // .attr("transform", function(d) { return "translate(" + d + ")"; });

  var node = svg.selectAll(".node")
      .data(graph.nodes)
    .enter().append("circle")
      .attr("class", "node")
      
      // .attr("r", function(d) { d.bw_cent);}) // w/ centrality, either d.deg_cent, d.bw_cent, d.ev_cent
      .attr("r", 5) // w/o centrality

      // .attr("transform", function(d) { return "translate(" + d + ")"; })
      .style("fill", function(d) { return color(d.sex); })
      .call(force.drag);

  node.append("title")
      .text(function(d) { return d.label; });

  force.on("tick", function() {
    link.attr("x1", function(d) { return d.source.x; })
        .attr("y1", function(d) { return d.source.y; })
        .attr("x2", function(d) { return d.target.x; })
        .attr("y2", function(d) { return d.target.y; });

    node.attr("cx", function(d) { return d.x; })
        .attr("cy", function(d) { return d.y; });
  });

});

function zoom() {
  svg.attr("transform", "translate(" + d3.event.translate + ")scale(" + d3.event.scale + ")");
};