$(".grid-rect").hover(
  function() {
    $("#caption").replaceWith("<div id=\"caption\">" + $(this).data("hover-text") + "</div>");
    console.log("hover");
  }
);