var db = require("../models");
var path = require("path");

module.exports = function(app) {
  // Load index page
  app.get("/", function(req, res) {
    db.Movie.findAll({}).then(function(dbMovie) {
      res.sendFile(path.join(__dirname, "../public/index.html"));
    });
  });
};
