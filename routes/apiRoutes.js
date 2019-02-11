var db = require("../models");
var axios = require("axios");

module.exports = function(app) {
  // Get omdb info (no sequelize)
  app.get("/api/omdb", function(req, res) {
    var queryUrl =
      "http://www.omdbapi.com/?t=" + "batman" + "&y=&plot=short&apikey=trilogy";
    axios
      .get(queryUrl)
      .then(function(response) {
        console.log("Title of the movie: " + response.data.Title);
        console.log("Release Year:" + response.data.Year);
        console.log("Rating:" + response.data.imdbRating);
        console.log("Rotten Rating:" + response.data.tomatoRating);
        console.log("Country:" + response.data.Country);
        console.log("Language:" + response.data.Language);
        console.log("Plot:" + response.data.Plot);
        console.log("Actors:" + response.data.Actors);
        res.json(response.data);
      })
      .catch(err => {
        res.status(500).end(err);
      });
  });

  // Get all examples
  app.get("/api/examples", function(req, res) {
    db.Movie.findAll({})
      .then(function(dbMovie) {
        res.json(dbMovie);
      })
      .catch(err => {
        res.status(500).end(err);
      });
  });

  // Create a new example
  app.post("/api/examples", function(req, res) {
    db.Movie.create(req.body).then(function(dbMovie) {
      res.json(dbMovie);
    });
    // .catch(err => {
    //   res.status(500).end(err);
    // });
  });

  // Delete an example by id
  app.delete("/api/examples/:id", function(req, res) {
    db.Movie.destroy({ where: { id: req.params.id } })
      .then(function(dbMovie) {
        res.json(dbMovie);
      })
      .catch(err => {
        res.status(500).end(err);
      });
  });
};
