const mongoose = require('mongoose');
const db = process.env.MONGODB_URI;

const connect = async () => {
  try {
    await mongoose.connect(db, {
      useNewUrlParser: true,
      useFindAndModify: false,
      useCreateIndex: true,
      useUnifiedTopology: true
    });
  } catch (error) {
    process.exit(1);
  }
};

module.exports = connect;