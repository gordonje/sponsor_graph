var margin = {top: 20, right: 20, bottom: 60, left: 50},
    width = 1200 - margin.left - margin.right,
    height = 600 - margin.top - margin.bottom;


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
  // console.log(link);

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
  rect.attr("data-hover-text", people[link.source].name + " (" + people[link.source].party + ")" + " & " + people[link.target].name + " (" + people[link.target].party + ") share " + link.shared_vote_count + " votes.");

  //Give the rect jQuery-targetable class
  rect.classed("grid-rect",true);
  rect.classed(link.source + "x" + link.target,true);

  //Giving the Rectangle Color
  var colorBefore = "rgba(200, 200, 200, " + link.shared_vote_count/maxRelationship + ")";
  if (people[link.source].party == "Republican" || people[link.source].party == "Libertarian"){
    if (people[link.target].party == "Republican" || people[link.source].party == "Libertarian"){
        colorBefore = "rgba(128, 0, 0, " + link.shared_vote_count/maxRelationship + ")";
    }
    else{
      colorBefore = "rgba(128, 0, 128, " + link.shared_vote_count/maxRelationship + ")";
    }
  }
  else if (people[link.source].party == "Democratic"){
    if (people[link.target].party == "Democratic"){
       colorBefore = "rgba(0, 51, 153," + link.shared_vote_count/maxRelationship + ")";
    }
    else{
      colorBefore = "rgba(128, 0, 128, " + link.shared_vote_count/maxRelationship + ")";
    }

  }
  rect.style("fill",colorBefore);
  var colorAfter = "#f5f5f5";
}