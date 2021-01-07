var express = require('express');
var path = require('path');

var app = express();
var PORT = 3000;
var fs = require('fs');
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/api/notes", function(req,res) {

})