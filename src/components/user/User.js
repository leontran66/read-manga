const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  accessLevel: {
    type: String,
    required: true
  },
  reading: [{
    type: Schema.Types.ObjectId,
    ref: 'Reading'
  }]
});

module.exports = mongoose.model('User', userSchema);