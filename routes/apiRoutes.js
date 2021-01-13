// var noteData = require("../db.json");
const fs = require("fs");
const util = require("util");
const writeFileAsync = util.promisify(fs.writeFile);
const readFileAsync = util.promisify(fs.readFile)
var allNotes;
module.exports = function (app) {

  app.get("/api/notes", function (req, res) {
    readFileAsync('db/db.json').then(function (data) {
      try {
        res.json(JSON.parse(data))

      } catch (err) {
        console.log(err)
      }
    })
  });

  app.post("/api/notes", function (req, res) {
    try {

      let newNote = req.body;
      readFileAsync('db/db.json').then(function (data) {

        console.log("----------");
        console.log(JSON.parse(data));
        console.log("----------");
        allNotes = JSON.parse(data)
        // allNotes = data;

        // This means you'll need to find a way to give each note a unique `id` when it's saved.
        //recreate id;
        // let newNoteId = allNotes.length + 1;
        //set the new id = 0 if json file is empty, if not empty, new id = id of the last item +1;
        let newNoteId = 0;
        console.log(allNotes);
        if (allNotes.length === 0) {

        } else {
          newNoteId = parseInt(allNotes[allNotes.length - 1].id) + 1;
        }
        newNote['id'] = newNoteId;
        allNotes.push(newNote);
        // writeFileAsync('db/db.json', JSON.stringify(allNotes));
    
        fs.writeFile('db/db.json', JSON.stringify(allNotes), (err, data) => {
          if (err) throw err;
          console.log("New note added");
        })
      })
    } catch (err) {
      console.log(err)
    }

  });

  // when someone comes to this route w/ a delete req
  app.delete("/api/notes/:id", function (req, res) {
    let deleteId = parseInt(req.params.id);
    try {
      readFileAsync('db/db.json').then(function (data) {
        allNotes = JSON.parse(data)
        allNotes = allNotes.filter(note => {
          return note.id != deleteId;
        });
        // writeFileAsync('db/db.json',JSON.stringify(allNotes));
        fs.writeFile('db/db.json', JSON.stringify(allNotes), (err, data) => {
          if (err) throw err;
          console.log("Selected note is deleted");
        })
      }
      );
    } catch (err) {
      console.log(err)
    }
    // Should receive a query parameter containing the id of a note to delete.
    // In order to delete a note, you'll need to read all notes from the `db.json` file
    // remove the note with the given `id` property
    // and then rewrite the notes to the `db.json` file.
  });


}