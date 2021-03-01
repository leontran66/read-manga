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

    console.log('Established MongoDB connection');
  } catch (error) {
    console.log(error.message);
    process.exit(1);
  }
};

module.exports = connect;