const mongoose = require('mongoose');

const wordsSchema = mongoose.Schema({
  eng: String,
  ger: String,
  pol: String,
  rus: String,
  ukr: String,
});

module.exports = mongoose.model('words', wordsSchema);
