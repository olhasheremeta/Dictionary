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
  Word.find({ [req.query.lang]: new RegExp(req.query.word, 'i') })
    .then(docs => {
      console.log(docs[0]);
      res.json(docs[0])
    })
    .catch(() => res.send(500));
});

app.put('/editEntry', function(req, res) {
  const { eng, ukr, rus, ger, pol } = req.body;
  Word.findById(req.body._id, function (err, doc) {
    if (err) res.send(500);
    doc.set('eng', eng);
    doc.set('ukr', ukr);
    doc.set('rus', rus);
    doc.set('ger', ger);
    doc.set('pol', pol);
    doc.save((err, word) => {
      if (err) res.send(500);
      res.send(word);
    });
  });
});
