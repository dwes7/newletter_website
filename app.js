//jshint esversion: 6

const express = require("express");
const request = require("request");
const bodyParser = require("body-parser");
const fs = require('fs');



const app = express();

// Used to host static files (e.i. images, html, etc)
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));

app.post("/", function(req, res){
  console.log(req.body.firstName);
  console.log(req.body.lastName);
  console.log(req.body.emailAddress);
  fs.readFile("private/apikey.json", (err, data) => {
    if (err) throw err;
    var key = JSON.parse(data.toString()).key;
    console.log(key);
  });

});
app.get("/", function(req, res){
    res.sendFile(__dirname + "/signup.html");
});
app.listen(3000, function(){
    console.log("Server is listening on port 3000");
});
