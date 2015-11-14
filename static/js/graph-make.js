var margin = {top: 20, right: 20, bottom: 60, left: 50},
    width = 1000 - margin.left - margin.right,
    height = 600 - margin.top - margin.bottom;

var people = [
  { 'name':'John', 
    'index':0,
    'party':'moea'
  },
    { 'name':'Kenneth', 
    'index':1,
    'party':'Democrat'
  },
  { 'name':'Mary', 
    'index':3,
    'party':'Republican'
  }
];

var links = [
  {
    'source':0,
    'target':1,
    'value' :12
  },
  {
    'source':1,
    'target':2,
    'value' :12
  },
  {
    'source':0,
    'target':2,
    'value' :12
  }
]

var cellWidth = width / people.length;
var cellHeight = height / people.length;

var svg = d3.select("#chart")
  .append("svg")
  .attr("width", width)
  .attr("height", height);

for (var i=0; i < links.length; i++){
  //Basic selection of "link"
  var link = links[i];
  console.log(link);

  //Making the Rectangle itself
  var rect = svg.append("rect")
    .attr("width", cellWidth)
    .attr("height", cellHeight);

  //Grid Positioning
  var gridHorizPosition = (link.source) * cellWidth;
  var gridVertPosition = (link.target) * cellHeight;
  rect.attr("x",gridHorizPosition);
  rect.attr("y",gridVertPosition);

  //Giving the Rectangle Color
  var colorBefore = "#f5f5f5";
  if (people[link.source].party == "Republican"){
    colorBefore = "#800000";
  }
  else if (people[link.source].party == "Democrat"){
    colorBefore = "#003399";
  }
  rect.style("fill",colorBefore);
}