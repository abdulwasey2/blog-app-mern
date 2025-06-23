// backend/config/db.js

const mongoose = require('mongoose');

/**
 * Asynchronous function to connect to the MongoDB database.
 * It uses the MONGODB_URI from the .env file.
 * If the connection fails, it logs the error and exits the process.
 */
const connectDB = async () => {
  try {
    // Attempt to connect to the MongoDB cluster
    const conn = await mongoose.connect(process.env.MONGODB_URI);

    // Log a success message with the host name upon successful connection
    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    // Log the error message if the connection fails
    console.error(`❌ MongoDB Connection Error: ${error.message}`);
    
    // Exit the Node.js process with a failure code (1)
    process.exit(1);
  }
};

module.exports = connectDB;