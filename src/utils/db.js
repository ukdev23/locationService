const mongoose = require("mongoose");
require("dotenv").config();

// const NODE_ENV = process.env.NODE_ENV || "development";
// const PORT = process.env.PORT || 3000;
// const DATABASE_URL =
//   process.env.DATABASE_URL || "mongodb://0.0.0.0:27017/sarathidb";

  const DATABASE_URL ="mongodb://0.0.0.0:27017/sarathidb";

  const connectToDatabase =  () => {
    mongoose.connect(`${DATABASE_URL}`, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    const db = mongoose.connection;
  
    db.on("error", console.error.bind(console, "MongoDB connection error:"));
    db.once("open", () => {
      console.log("Connected to MongoDB");
    });
  
    return db;
  };

// Create a MongoClient with a MongoClientOptions object to set the Stable API version


module.exports = connectToDatabase;
