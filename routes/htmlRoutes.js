var db = require("../models");
var path = require("path")

module.exports = function(app) {
  // Load index page
  app.get("/", function(req, res) {
    db.Movie.findAll({}).then(function(dbMovie) {
      res.sendFile(path.join(__dirname, "../public/index.html"));
      });
    });
  

  // Load example page and pass in an example by id
//   app.get("/example/:id", function(req, res) {
//     db.Movie.findOne({ where: { id: req.params.id } }).then(function(dbMovie) {
//       res.sendfile("example", {
//         example: dbMovie
//       });
//     });
//   });

//   // Render 404 page for any unmatched routes
//   app.get("*", function(req, res) {
//     res.sendfile("404");
//   });
// };
