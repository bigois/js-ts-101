// Import necessary modules
import express from "express";                       // Express module
import connectDatabase from "./config/dbConnect.js"; // Database connection module
import routes from "./routes/index.js";              // Import routes module

// Establish a connection to the database and handle connection events
const connection = await connectDatabase();
connection.on("error", (err) => {
    console.error("Database connection error:", err);
});
connection.once("open", () => {
    console.log("Database connection established successfully");
});

// Create an instance of an Express application
const app = express();

// Middleware to parse incoming JSON requests, use the defined routes, and serve static files from the "public" directory
app.use(express.json());
app.use(express.static("public"));
app.use(routes);

// Export the Express application instance for use in other modules
export default app;
