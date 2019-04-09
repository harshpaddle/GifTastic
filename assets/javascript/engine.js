var states = ["nj", "ny", "Florida", "Texas", "Iowa", "Montana", "Utah"];



function renderButtons() {

  $("#gif-buttons").empty();
  
  for (var i = 0; i < states.length; i++) {
    var state = states[i];
    var $button = $("<button>");
      $button
        .attr("data-state-name", state)
        .addClass("btn btn-outline-success gif")
        .text(state)
        .appendTo($("#gif-buttons"));

  }
  
}

function displayGifs() {

  var stateName = $(this).attr("data-state-name");

  console.log(stateName);
  
  var queryURL = `https://api.giphy.com/v1/gifs/search?api_key=Uc0dCJmFi61sNZ0MRU9qqKgGVJPML7XL&q=${stateName}&limit=10&offset=0&rating=G&lang=en`;
  
  console.log()
  $.ajax({
    url: queryURL,
    request: "GET"
  }).then(function(response) {
    console.log(response);
    var $p = $("<p>");
    $p.text("Rating: " + response.rating)
    .appendTo($(".gifs"))


    var $gifImg = $("<img>");
    $gifImg.addClass("gif")
      .attr("src", response.data[0].images.downsized.url)
      .appendTo($p);

    console.log(stateName);
  })
  
}

$("#add-state").on("click", function(event) {
  event.preventDefault();
  if ($("#state-input").val().length === 0) {
    return false;
  }
  var state = $("#state-input").val().trim();
  states.push(state);
  console.log(state);
  console.log(states);
  renderButtons();
  $("#state-input").val("")
})



renderButtons();

$(document).on("click", ".gif", displayGifs);