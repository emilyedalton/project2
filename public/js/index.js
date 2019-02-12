// Get references to page elements

var m1, m2, m3, m4, m5, m6;
var $submitBtn = $("#submit");
var $exampleList = $("#example-list");

// Random Shuffle

function shuffle(a) {
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

// The API object contains methods for each kind of requests
var API = {
  saveExample: function(example) {
    return $.ajax({
      headers: {
        "Content-Type": "application/json"
      },
      type: "POST",
      url: "api/examples",
      data: JSON.stringify(example)
    });
  },
  getExamples: function() {
    return $.ajax({
      url: "/api/examples",
      type: "GET"
    }).then(function(movieData) {
      //log the moviedata
      console.log(movieData);
      var movieDataRandom = movieData.slice();
      shuffle(movieDataRandom);
      $(".is-scroll-wrapper1").empty();
      $(".is-scroll-wrapper2").empty();
      //looping through each of the reviews and movie info
      for (var i = 0; i < movieData.length; i++) {
        //get a reference to the movietitle and populate it with the movie title
        var movieTitle1 = $(".is-scroll-wrapper1");
        var movieTitle2 = $(".is-scroll-wrapper2");
        var movieRev = $(".is-scroll-wrapper");

        movieTitle1.append(
          $("<div class='card is-showcase is-blue'>").html(
            `<img src="${movieDataRandom[i].movieImg}">
            <b>${movieDataRandom[i].movieTitle}</b> <br>
            Description: ${movieDataRandom[i].movieDesc} <br>
            User Name: ${movieDataRandom[i].userName} <br>
            User Review: ${movieDataRandom[i].userReview}<br>
            User Rating: ${movieDataRandom[i].userRating}/5`
          )
          // $("#user-rating").rating({displayOnly: true, step: 0.5})
        );
        movieTitle2.append(
          $("<div class='card is-showcase is-blue'>").html(
            `<img src= ${movieData[i].movieImg}"> <br>
            ${movieData[i].movieTitle} <br>
            Description: ${movieData[i].movieDesc} <br>
            User Name: ${movieData[i].userName} <br>
            User Review: ${movieData[i].userReview} <br>
            User Rating: ${movieData[i].userRating}/5`
          )
          // $("#user-rating").rating({displayOnly: true, step: 0.5})
        );
        movieRev.append(
          $("<div class='card is-showcase is-blue>").html(
            `<h5> ${movieData[i].movieTitle} <p> User Name: ${
              movieData[i].userName
            }`
          )
        );
      }
      return movieData;
    });
  },

  //This is the ajax call that goes to the omdb route
  getOmdb: function() {
    return $.ajax({
      url: "/api/omdb",
      type: "GET"
    });
  }
};
// refreshExamples gets new examples from the db and repopulates the list
var refreshExamples = function() {
  API.getExamples();
  // .then(function(data) {
  //   var $examples = data.map(function(data) {
  //     var $a = $("<a>")
  //       .text(data.text)
  //       .attr("href", "/example/" + data.id);

  //     var $li = $("<li>")
  //       .attr({
  //         class: "list-group-item",
  //         "data-id": data.id
  //       })
  //       .append($a);

  //     var $button = $("<button>")
  //       .addClass("btn btn-danger float-right delete")
  //       .text("ｘ");

  //     $li.append($button);

  //     return $li;
  //   });

  //   $exampleList.empty();
  //   $exampleList.append($examples);
  // });
};

// handleFormSubmit is called whenever we submit a new example
// Save the new example to the db and refresh the list
// $("#submit").on("click", function() {});
// var num = 10;
var handleFormSubmit = function(event) {
  event.preventDefault();
  console.log("running");
  let word = $("#movie-title").val();
  $.ajax({
    url: `https://www.omdbapi.com/?t=${word}&y=&plot=short&apikey=trilogy`,
    method: "GET"
  }).then(function(response) {
    console.log(response);
    m1 = response.Title;
    m2 = response.Website;
    m3 = response.Plot;
    m4 = response.Poster;
    m5 = $("#user-review")
      .val()
      .trim();
    m6 = $("#user-name")
      .val()
      .trim();

    var newMovie = {
      movieTitle: m1,
      movieLink: m2,
      movieDesc: m3,
      movieImg: m4,
      userReview: $("#user-review")
        .val()
        .trim(),
      userName: $("#user-name")
        .val()
        .trim(),
      userRating: $("#user-rating")
        .val()
        .trim()
    };

    API.saveExample(newMovie).then(function() {
      refreshExamples();
    });
  });
};

// handleDeleteBtnClick is called when an example's delete button is clicked
// Remove the example from the db and refresh the list
var handleDeleteBtnClick = function() {
  var idToDelete = $(this)
    .parent()
    .attr("data-id");

  API.deleteExample(idToDelete).then(function() {
    refreshExamples();
  });
};

// Add event listeners to the submit and delete buttons
$submitBtn.on("click", handleFormSubmit);
$exampleList.on("click", ".delete", handleDeleteBtnClick);
refreshExamples();
