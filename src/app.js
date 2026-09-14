// Import the Express module
import express from "express";

// Create an instance of an Express application
const app = express();

// Define a route for the root URL ("/")
app.get("/", (req, res) => {
    res.status(200).send("Hello, World!");
});

// Handle 404 errors for undefined routes
app.use((req, res) => {
    res.status(404).send("Not Found");
});

// Export the Express application instance for use in other modules
export default app;
