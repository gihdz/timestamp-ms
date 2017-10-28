// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();
require('dotenv').config();
// we've started you off with Express,
// but feel free to use whatever libs or frameworks you'd like through `package.json`.

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get('/', function(request, response) {
  response.sendFile(__dirname + '/views/index.html');
});

app.get('/api/timestamp/:date_string?', function(req, res) {
  var validResponse = function(validDate) {
    res.json({ unix: validDate.getTime(), utc: validDate.toUTCString() });
  };
  var invalidResponse = function() {
    res.json({ error: 'Invalid Date' });
  };
  var params = req.params;
  var dateString = params.date_string;
  var date;
  if (!dateString) {
    date = new Date();
    validResponse(date);
    return;
  }
  if (!isNaN(dateString)) {
    var dateInt = parseInt(dateString);
    date = new Date(dateInt);
    validResponse(date);
    return;
  }
  var date = new Date(dateString);
  if (Object.prototype.toString.call(date) === '[object Date]') {
    // it is a date
    if (isNaN(date.getTime())) {
      // d.valueOf() could also work
      // date is not valid
      console.log('date is not valid');
      invalidResponse();
      return;
    } else {
      // date is valid
      console.log('date is valid');
      validResponse(date);
      return;
    }
  } else {
    // not a date
    console.log('not a date');
  }
  invalidResponse();
});
// listen for requests :)
var listener = app.listen(process.env.PORT, function() {
  console.log('Your app is listening on port ' + listener.address().port);
});
