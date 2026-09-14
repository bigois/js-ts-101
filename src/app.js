// Import the Express module
import express from "express";

// Import data from the JSON file
import books from "../data/books.json" with { type: "json" };

// Create an instance of an Express application
const app = express();

// Define HTTP status codes
const HTTP_OK = 200;
const HTTP_NOT_FOUND = 404;

// Create a base response structure for API responses
const createBaseResponse = (req, res, message, detail) => ({
    timestamp: new Date().toISOString(),
    path: req.originalUrl,
    status: res.statusCode,
    message,
    ...(detail !== undefined && { detail })
});


// Define a route for the root URL ("/")
app.get("/", (req, res) => {
    res.status(HTTP_OK)
        .type("application/json")
        .json(createBaseResponse(req, res, "Welcome!"));
});

// Define a route for retrieving all books
app.get("/books", (req, res) => {
    res.status(HTTP_OK)
        .type("application/json")
        .json(createBaseResponse(req, res, "Books retrieved successfully", books));
});

// Handle 404 errors for undefined routes
app.use((req, res) => {
    res.status(HTTP_NOT_FOUND)
        .type("application/json")
        .json(createBaseResponse(req, res, "Not Found"));
});

// Export the Express application instance for use in other modules
export default app;
