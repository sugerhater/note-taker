//this file is my original draft

var express = require('express');
var path = require('path');

var app = express();
var PORT = 3000;
var fs = require('fs');
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/notes", function(req,res) {
  res.sendFile(path.join(__dirname, 'notes.html'));
})

app.get("/*", function(req,res) {
  res.sendFile(path.join(__dirname, 'notes.html'));
})

app.get("/api/notes", function(req,res) {

})

app.get("/api/notes", function(req,res) {

})


app.listen()
