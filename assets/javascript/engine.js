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
      .addClass("border")
      .appendTo($(".gifs"));

      $p.append($("<br> <br>"))
      
      var $gifImg = $("<img>");
      $gifImg.addClass("gif float-left m-1")
        .attr("src", response.data[i].images.original_still.url)
        .attr("data-still", response.data[i].images.original_still.url)
        .attr("data-animate", response.data[i].images.original.url)
        .attr("gif-state", "still")
        .attr("style", "height: 180px")
        .appendTo($p);

      // $p.append($("<hr>"))
    }
  })
};

$("#add-state").on("click", function() {
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
});



$(document).on("click", ".gif-btn", displayGifs);

$(document).on("click", ".gif", function (event) {
  event.preventDefault();

  var state = $(this).attr("gif-state");
  if (state === "still") {
    $(this).attr("src", $(this).attr("data-animate"));
    $(this).attr("gif-state", "animate")
  } else {
    $(this).attr("src", $(this).attr("data-still"));
    $(this).attr("gif-state", "still")
  }
})



renderButtons();






