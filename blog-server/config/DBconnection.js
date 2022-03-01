const mongoose = require("mongoose");
const connect = () => {
  mongoose.connect(process.env.MONGO_URI, {}, (error) => {
    if (error) throw error;
    console.log("database connected ");
  });
};

module.exports = connect;