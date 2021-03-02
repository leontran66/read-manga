const mongoose = require('mongoose');
const { Schema } = mongoose;

const readingSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    required: true
  },
  manga: {
    type: Schema.Types.ObjectId,
    required: true
  },
  currentChapter: {
    type: Number
  }
});

module.exports = mongoose.model('Reading', readingSchema);