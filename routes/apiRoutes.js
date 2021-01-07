var noteData = require("../data/db.json");

module.exports = function(app) {
  app.get("/api/notes", function(req, res) {
    res.json(noteData);
  });

  app.post("/api/notes", function(req, res) {
  
  });

  app.delete("/api/notes/:id", function(req, res) {
  
  });


}