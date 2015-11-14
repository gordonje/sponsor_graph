var margin = {top: 20, right: 20, bottom: 60, left: 50},
    width = 1000 - margin.left - margin.right,
    height = 600 - margin.top - margin.bottom;

var people = [
  { 'name':'John', 
    'index':0,
    'party':'Democrat'
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
  }
]

var cellWidth = width / people.length;
var cellHeight = height / people.length;

var svg = d3.select("#chart")
  .append("svg")
  .attr("width", width)
  .attr("height", height);

for (link in links)
var rect = svg.append("rect")
  .attr("width", cellWidth)
  .attr("height", cellHeight);
