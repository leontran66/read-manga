const mongoose = require('mongoose');
const { Schema } = mongoose;

const mangaSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  author: {
    type: String,
    required: true
  },
  genre: [{
    type: String
  }],
  synopsis: {
    type: String
  },
  chapters: {
    type: Number
  }
});

module.exports = mongoose.model('Manga', mangaSchema);