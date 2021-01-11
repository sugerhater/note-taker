var noteData = require("../data/db.json");
const fs = require("fs");
const util = require("util");
const writeFileAsync = util.promisify(fs.writeFile);
const readFileAsync = util.promisify(fs.readFile)
module.exports = function(app) {
  app.get("/api/notes", function(req, res) {
    readFileAsync('../data/db.json').then(function(data){
      res.json(data)
    })
  });

  app.post("/api/notes", function(req, res) {
  
  });

  app.delete("/api/notes/:id", function(req, res) {
  
  });


}