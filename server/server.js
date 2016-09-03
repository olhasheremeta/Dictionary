var express = require('express');
var serveStatic = require('serve-static');
var path = require('path');
var bodyParser = require('body-parser')

var app = express();

app.use(serveStatic(__dirname + '/../client'));
app.use(bodyParser.json());

app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname + '/../index.html'));
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});

app.get('/getEntry', function(req, res) {
  console.log(req.query);
  //get word from db
  res.json({
    en: 'Harry Potter',
    de: 'Harry Potter',
    pl: 'Harry Potter',
    ru: 'Harry Potter',
    ua: 'Harry Potter',
  });
});
