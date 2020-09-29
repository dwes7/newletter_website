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

// main post method when name and email information is submitted
app.post("/", function(req, res){
  console.log(req.body.firstName);
  console.log(req.body.lastName);
  console.log(req.body.emailAddress);
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  const emailAddress = req.body.emailAddress;

  // Open JSON file with private keys and uids
  // TODO: figure out how to grab private data without
  // putting the rest of the code in the the scope of the
  // read file callback.
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

    // Need server number to contact the correct server. Last character in the API key
    const serverNum = privateData.apiKey[privateData.apiKey.length-1];
    const jsonData = JSON.stringify(subscribeData);
    const url = "https://us"+serverNum+".api.mailchimp.com/3.0/lists/"+privateData.listId;
    const options = {
      method:"POST",
      auth: "westley_barragan:" + privateData.apiKey
    }

    // https request
    const request = https.request(url, options, function(response){

      if (response.statusCode === 200){
        res.sendFile(__dirname + "/success.html");
      } else{
        res.sendFile(__dirname + "/failure.html");
      }

      // get the response from the MailChimp server
      response.on("data", function(data){
        console.log(JSON.parse(data));
      });
    });

    request.write(jsonData);
    request.end();

  });
});

// main sign up html
app.get("/", function(req, res){
    res.sendFile(__dirname + "/signup.html");
});

app.post("/failure", function(req, res){
  res.sendFile(__dirname +"/signup.html");
});
// run the listening server
var port = 3000;
app.listen(port, function(){
    console.log("Server is listening on port " + port);
});
