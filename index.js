// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});


app.get("/api/:date_string?", function (req, res) { 
  let dateString = req?.params?.date_string;

  if(dateString===undefined){
    let dateNow = new Date();
    return res.json({unix: dateNow.getTime(),utc:dateNow.toUTCString()});
  }
  if(parseInt(dateString)>10000){
    let unixTime =new Date(parseInt(dateString));
    return res.json({unix: unixTime.getTime(),utc:unixTime.toUTCString()});
  }
  let parseInValue = new Date(dateString)
  if(parseInValue=="Invalid Date"){
    return res.json({error: "Invalid Date"});
  }else{
    return res.json({unix: parseInValue.getTime(),utc:parseInValue.toUTCString()});
  }

});


// listen for requests :)
var listener = app.listen(process.env.PORT||3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
