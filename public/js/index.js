// Get references to page elements
var $movieTitle = $("#movie-title");
var $movieLink = $("#movie-link");
var $movieDesc = $("#movie-desc");
var $movieImg = $("#movie-img");
var $userReview = $("#user-review");
var $userRating = $("#user-rating");
var $userName = $("#user-name");
var $submitBtn = $("#submit");
var $exampleList = $("#example-list");

// The API object contains methods for each kind of request we'll make
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
      //looping through each of the reviews and movie info
      for (var i = 0; i < movieData.length; i++) {
        //get a reference to the movietitle and populate it with the movie title
        var movieTitle = $(".is-scroll-wrapper");
        var movieRev = $(".is-scroll-wrapper");

        movieTitle.append(
          $("<div class='card is-showcase is-blue'>").html(
            `<img src= ${
              movieData[i].movieImg
            } style="height:100px; width: 70px; float: left;">${
              movieData[i].movieTitle
            }  user name: ${movieData[i].userName} User Review: ${
              movieData[i].userReview
            }`
          )
        );
        movieRev.append(
          $("<div class='card is-showcase is-blue>").html(
            `<h5> ${movieData[i].movieTitle} <p> User Name: ${
              movieData[i].userName
            }`
          )
        );
      }
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
  API.getExamples().then(function(data) {
    var $examples = data.map(function(example) {
      var $a = $("<a>")
        .text(example.text)
        .attr("href", "/example/" + example.id);

      var $li = $("<li>")
        .attr({
          class: "list-group-item",
          "data-id": example.id
        })
        .append($a);

      var $button = $("<button>")
        .addClass("btn btn-danger float-right delete")
        .text("ｘ");

      $li.append($button);

      return $li;
    });

    $exampleList.empty();
    $exampleList.append($examples);
  });
};

// handleFormSubmit is called whenever we submit a new example
// Save the new example to the db and refresh the list
var handleFormSubmit = function(event) {
  event.preventDefault();

  var newMovie = {
    movieTitle: $movieTitle.val().trim(),
    movieLink: $movieLink.val().trim(),
    movieDesc: $movieDesc.val().trim(),
    movieImg: $movieImg.val().trim(),
    userReview: $userReview.val().trim(),
    userRating: $userRating.val().trim(),
    userName: $userName.val().trim()
  };

  // if (!(newMovie.text && example.description)) {
  //   alert("You must enter an example text and description!");
  //   return;

  API.saveExample(newMovie).then(function() {
    refreshExamples();
  });

  $exampleText.val("");
  $exampleDescription.val("");
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
