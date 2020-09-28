//jshint esversion: 6

const express = require("express");
const request = require("request");
const bodyParser = require("body-parser");
const fs = require('fs');
const https = require("https");


const app = express();

// Used to host static files (e.i. images, html, etc)
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));

app.post("/", function(req, res){
  console.log(req.body.firstName);
  console.log(req.body.lastName);
  console.log(req.body.emailAddress);
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  const emailAddress = req.body.emailAddress;

  fs.readFile("private/private.json", (err, data) => {
    if (err) throw err;
    privateData = JSON.parse(data.toString());
    console.log(privateData.apiKey);
    console.log(privateData.listId);
    const subscribeData = {
      members : [
        {
          email_address : emailAddress,
          status: "subscribed",
          merge_fields: {
            FNAME: firstName,
            LNAME: lastName
          }
        }
      ]
    };
    const serverNum = privateData.apiKey[privateData.apiKey.length-1];
    const jsonData = JSON.stringify(subscribeData);
    const url = "https://us"+serverNum+".api.mailchimp.com/3.0/lists/"+privateData.listId;
    const options = {
      method:"POST",
      auth: "westley_barragan:" + privateData.apiKey
    }
    const request = https.request(url, options, function(response){
      response.on("data", function(data){
        console.log(JSON.parse(data));

      })
    });

    request.write(jsonData);
    request.end();

  });


});
app.get("/", function(req, res){
    res.sendFile(__dirname + "/signup.html");
});
app.listen(3000, function(){
    console.log("Server is listening on port 3000");
});
