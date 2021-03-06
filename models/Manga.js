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
  genres: [{
    type: Schema.Types.ObjectId,
    ref: 'Genre'
  }],
  synopsis: {
    type: String
  },
  chapters: {
    type: Number,
    min: 0
  }
});

module.exports = mongoose.model('Manga', mangaSchema);