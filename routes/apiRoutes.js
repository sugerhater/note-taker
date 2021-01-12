var noteData = require("../db.json");
const fs = require("fs");
const util = require("util");
const writeFileAsync = util.promisify(fs.writeFile);
const readFileAsync = util.promisify(fs.readFile)
let allNotes;
module.exports = function (app) {

  app.get("/api/notes", function (req, res) {
    readFileAsync('../db/db.json').then(function (data) {
      try {
        res.json(data)

      } catch (err) {
        console.log(err)
      }
    })
  });

  app.post("/api/notes", function (req, res) {
    try {

      let newNote = req.body;
      readFileAsync('../db/db.json').then(function (data) {
        allNotes = JSON.parse(data)
      })

      // This means you'll need to find a way to give each note a unique `id` when it's saved.
      //recreate id;
      // let newNoteId = allNotes.length + 1;
      //set the new id = 0 if json file is empty, if not empty, new id = id of the last item +1;
      let newNoteId = 0;

      if (allNotes.length === 0) {

      } else {
        newNoteId = allNotes[allNotes.length - 1].id + 1;
      }
      newNote['id'] = newNoteId;
      allNotes.push(newNote);
      writeFileAsync('../db/db.json', allNotes).then(function () {
        res.json(newNote);
      })
    } catch (err) {
      console.log(err)
    }

  });

  // when someone comes to this route w/ a delete req
  app.delete("/api/notes/:id", function (req, res) {
    try {
      let deleteId = req.params.id;
      readFileAsync('../db/db.json').then(function (data) {
        allNotes = JSON.parse(data)
      });
      allNotes = allNotes.filter(note=>{
        return note.id != deleteId;
      })
      writeFileAsync('../db/db.json',allNotes).then(function(){
        res.json(allNotes)
      })
    } catch (err) {
      console.log(err)
    }
    // Should receive a query parameter containing the id of a note to delete.
    // In order to delete a note, you'll need to read all notes from the `db.json` file
    // remove the note with the given `id` property
    // and then rewrite the notes to the `db.json` file.
  });


}