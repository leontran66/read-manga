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

readingSchema.index({ user: 1, manga: 1 }, { unique: true })

module.exports = mongoose.model('Reading', readingSchema);