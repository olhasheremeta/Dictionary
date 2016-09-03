const express = require('express');
const serveStatic = require('serve-static');
const path = require('path');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const config = require('./config');

const Word = require('./models/Word');

const app = express();
mongoose.connect('mongodb://'+ config.user +':' + config.password
  + '@ds017776.mlab.com:17776/dictionary');

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

  Word.find({ eng: 'Won-Won' })
    .then(docs => res.json(docs[0]))
    .catch(() => res.send(500));
});
