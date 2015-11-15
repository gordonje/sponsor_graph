var margin = {top: 20, right: 20, bottom: 60, left: 50},
    width = 800 - margin.left - margin.right,
    height = 600 - margin.top - margin.bottom;

var people = [
  { 'name':'John', 
    'index':0,
    'party':'Republican'
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
    'shared_vote_count' :12
  },
  {
    'source':1,
    'target':2,
    'shared_vote_count' :20
  },
  {
    'source':0,
    'target':2,
    'shared_vote_count' :30
  },
  {
    'source':1,
    'target':0,
    'shared_vote_count' :2
  },
  {
    'source':2,
    'target':1,
    'shared_vote_count' :2
  },
  {
    'source':0,
    'target':0,
    'shared_vote_count' :2
  },
  {
    'source':1,
    'target':1,
    'shared_vote_count' :22
  },
  {
    'source':2,
    'target':2,
    'shared_vote_count' :27
  },
  {
    'source':2,
    'target':0,
    'shared_vote_count' :16
  }
]

var cellWidth = width / people.length;
var cellHeight = height / people.length;

var svg = d3.select("#chart")
  .append("svg")
  .attr("width", width)
  .attr("height", height);

//The FIRST for loop overlinks, to find maxRelationship for scaling purposes
var maxRelationship = 0;
for (var i=0; i < links.length; i++){
  if (links[i].shared_vote_count > maxRelationship){
    maxRelationship = links[i].shared_vote_count;
  }
}

//The SECOND for loop over links, this time to actually build things.
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

  //Alt Text
  rect.attr("data-hover-text", people[link.source].name + " (" + people[link.source].party + ")" + " & " + people[link.target].name + " (" + people[link.target].party + ")");

  //Give the rect jQuery-targetable class
  rect.classed("grid-rect",true);
  rect.classed(link.source + "x" + link.target,true);

  //Giving the Rectangle Color
  var colorBefore = "rgba(200, 200, 200, " + link.shared_vote_count/maxRelationship + ")";
  if (people[link.source].party == "Republican"){
    if (people[link.target].party == "Republican"){
        colorBefore = "rgba(128, 0, 0, " + link.shared_vote_count/maxRelationship + ")";
    }
  }
  else if (people[link.source].party == "Democrat"){
    if (people[link.target].party == "Democrat"){
       colorBefore = "rgba(0, 51, 153," + link.shared_vote_count/maxRelationship + ")";
    }
  }
  rect.style("fill",colorBefore);
  var colorAfter = "#f5f5f5";
}