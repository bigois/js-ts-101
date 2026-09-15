// Import the Express module
import express from "express";

// Import data from the JSON file
import books from "../data/books.json" with { type: "json" };
let booksLength = books.length;

// Create an instance of an Express application
const app = express();

// Middleware to parse incoming JSON requests
app.use(express.json());

// Define HTTP status codes
const HTTP_OK = 200;
const HTTP_CREATED = 201;
const HTTP_NOT_FOUND = 404;

// Create a base response structure for API responses
const createBaseResponse = (req, res, message, details) => ({
    timestamp: new Date().toISOString(),
    path: req.originalUrl,
    status: res.statusCode,
    message,
    ...(details !== undefined && { details })
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

// Define a route for retrieving a single book by its ID
app.get("/books/:id", (req, res) => {
    // Get the book by its ID from the books array
    const bookId = parseInt(req.params.id);
    const book = books.find(b => b.id === bookId);

    // Check if the book exists before attempting to return it
    if (book) {
        res.status(HTTP_OK)
            .type("application/json")
            .json(createBaseResponse(req, res, "Book retrieved successfully", book));
    } else {
        res.status(HTTP_NOT_FOUND)
            .type("application/json")
            .json(createBaseResponse(req, res, "Book not found"));
    }
});

// Define a route for creating a new book
app.post("/books", (req, res) => {
    // Extract the new book data from the request body
    const { id: _id, ...newBook } = req.body;
    booksLength++;

    // Add the new book to the books array
    books.push({ id: booksLength, ...newBook });

    res.status(HTTP_CREATED)
        .type("application/json")
        .json(createBaseResponse(req, res, "Book successfully created", books.at(-1)));
});

// Define a route for updating an existing book by its ID
app.put("/books/:id", (req, res) => {
    // Get the book index by its ID from the books array
    const bookId = parseInt(req.params.id);
    const bookIndex = books.findIndex(b => b.id === bookId);

    // Check if the book exists before attempting to update it
    if (bookIndex !== -1) {
        // Extract the book data from the request body, excluding the ID since it should not be updated directly
        const { id: _id, ...book } = req.body;
        books[bookIndex] = { id: bookId, ...book };

        res.status(HTTP_OK)
            .type("application/json")
            .json(createBaseResponse(req, res, "Book successfully updated", books[bookIndex]));
    } else {
        res.status(HTTP_NOT_FOUND)
            .type("application/json")
            .json(createBaseResponse(req, res, "Book not found"));
    }
});

// Define a route for deleting an existing book by its ID
app.delete("/books/:id", (req, res) => {
    // Get the book index by its ID from the books array
    const bookId = parseInt(req.params.id);
    const bookIndex = books.findIndex(b => b.id === bookId);

    // Check if the book exists before attempting to delete it
    if (bookIndex !== -1) {
        const deletedBook = books.splice(bookIndex, 1)[0]; // [0] returns deletedBook instead of an array containing it
        res.status(HTTP_OK)
            .type("application/json")
            .json(createBaseResponse(req, res, "Book successfully deleted", deletedBook));
    } else {
        res.status(HTTP_NOT_FOUND)
            .type("application/json")
            .json(createBaseResponse(req, res, "Book not found"));
    }
});

// Handle 404 errors for undefined routes
app.use((req, res) => {
    res.status(HTTP_NOT_FOUND)
        .type("application/json")
        .json(createBaseResponse(req, res, "Not Found"));
});

// Export the Express application instance for use in other modules
export default app;
