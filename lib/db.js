const mongoose = require('mongoose');
const db = process.env.MONGODB_URI_LOCAL;

const connect = async () => {
  try {
    await mongoose.connect(db, {
      useNewUrlParser: true,
      useFindAndModify: false,
      useCreateIndex: true,
      useUnifiedTopology: true
    });
  } catch (err) {
    console.log(`MongoDB connection error. Please make sure MongoDB is running. ${err}`);
    process.exit(1);
  }
};

module.exports = connect;