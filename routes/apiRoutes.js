var noteData = require("../data/db.json");
const fs = require("fs");
const util = require("util");
const writeFileAsync = util.promisify(fs.writeFile);
const readFileAsync = util.promisify(fs.readFile)
let allNotes;
module.exports = function(app) {
  app.get("/api/notes", function(req, res) {
    readFileAsync('../data/db.json').then(function(data){
      res.json(data)
    })
  });

  app.post("/api/notes", function(req, res) {
      let newNote = req.body;
      readFileAsync('../data/db.json').then(function(data){
        allNotes = JSON.parse(data)
      })
      let newNoteId = allNotes.length +1;
      newNote['id'] = newNoteId;
      allNotes.push(newNote);
      writeFileAsync('../data/db.json',allNotes).then(function(){
        res.json(newNote);
      })
      
  });

  app.delete("/api/notes/:id", function(req, res) {
  
  });


}