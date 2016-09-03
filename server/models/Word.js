const mongoose = require('mongoose');

const wordsSchema = mongoose.Schema({
  en: String,
  de: String,
  pl: String,
  ru: String,
  ua: String,
})

module.exports = mongoose.model('words', wordsSchema);
