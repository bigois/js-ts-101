// Import necessary modules
import mongoose from "mongoose"; // Mongoose module

// Database connection configuration
const password = encodeURIComponent(process.env.DB_PASSWORD);
const connectionString =
    `mongodb://bigois:${password}@localhost:27017/library?authSource=admin`;

// Function to connect to the MongoDB database using Mongoose
const connectDatabase = async () => {
    try {
        await mongoose.connect(connectionString);
        console.log("Database connection successful");
        return mongoose.connection;
    } catch (err) {
        console.error("Database connection error:", err);
        throw err;
    }
};

// Export the connectDatabase function as the default export
export default connectDatabase;
