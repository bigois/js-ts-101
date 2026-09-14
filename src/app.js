// Import the Express module
import express from "express";

// Import data from the JSON file
import books from "../data/books.json" with { type: "json" };

// Create an instance of an Express application
const app = express();

// Define HTTP status codes
const HTTP_OK = 200;
const HTTP_NOT_FOUND = 404;

// Define a route for the root URL ("/")
app.get("/", (req, res) => {
    res.status(HTTP_OK).send("Hello, World!");
});

// Define a route for retrieving all books
app.get("/books", (req, res) => {
    res.status(HTTP_OK).type("application/json").json(books);
});

// Handle 404 errors for undefined routes
app.use((req, res) => {
    res.status(HTTP_NOT_FOUND).send("Not Found");
});

// Export the Express application instance for use in other modules
export default app;
