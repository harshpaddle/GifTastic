var states = ["nj", "ny", "Florida", "Texas", "Iowa", "Montana", "Utah"];



function renderButtons() {

  $("#gif-buttons").empty();
  
  for (var i = 0; i < states.length; i++) {
    var state = states[i];
    var $button = $("<button>");
      $button
        .attr("data-state-name", state)
        .addClass("btn btn-outline-success gif-btn")
        .text(state)
        .appendTo($("#gif-buttons"));

  }
  
}

function displayGifs() {
  $(".gifs").empty();

  var stateName = $(this).attr("data-state-name");

  console.log(stateName);
  
  var queryURL = `https://api.giphy.com/v1/gifs/search?api_key=Uc0dCJmFi61sNZ0MRU9qqKgGVJPML7XL&q=${stateName}&limit=10&offset=0&rating=G&lang=en`;
  
  console.log()
  $.ajax({
    url: queryURL,
    request: "GET"
  }).then(function (response) {
    console.log(response);
    
    for (var i = 0; i < 10; i++) {
      var $p = $("<p>");
      $p.text("Rating: " + response.data[i].rating)
        .appendTo($(".gifs"));


      var $gifImg = $("<img>");
      $gifImg.addClass("gif")
        .attr("src", response.data[i].images.original_still.url)
        .attr("data-still", response.data[i].images.original_still.url)
        .attr("data-animate", response.data[i].images.original.url)
        .attr("gif-state", "still")
        .appendTo($p);

    }

    console.log(stateName);
  })

}

$("#add-state").on("click", function (event) {
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

$(".gif").on("click", function(event) {

  var state = $(this).attr("gif-state");
  console.log("hitting");
  if (state === "still") {
    $(this).attr("src", $(this).attr("data-animate"));
    $(this).attr("gif-state", "animate")
  } else {
    $(this).attr("src", $(this).attr("data-still"));
    $(this).attr("gif-state", "still")
  }
})



renderButtons();

$(document).on("click", ".gif-btn", displayGifs);