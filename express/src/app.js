// Import necessary modules
import express from "express";                                   // Express module
import connectDatabase from "./config/dbConnect.js";             // Database connection module
import * as HTTP_STATUS from "./constants/httpStatus.js";        // HTTP status codes
import createBaseResponse from "./utils/createBaseResponse.js";  // Utility function to create a standardized response object
import * as BOOK_VALIDATION from "./middleware/validateBook.js"; // Middleware for validating book data in requests
import BookController from "./controller/BookController.js";     // Controller for handling book-related operations

// Establish a connection to the database and handle connection events
const connection = await connectDatabase();
connection.on("error", (err) => {
    console.error("Database connection error:", err);
});
connection.once("open", () => {
    console.log("Database connection established successfully");
});

// Create an instance of an Express application and add middleware for parsing JSON requests
const app = express();
app.use(express.json());

// Define a route for the root URL ("/")
app.get("/", (req, res) => {
    res.status(HTTP_STATUS.OK)
        .json(createBaseResponse(req, res, "Welcome!"));
});

// Define a route for retrieving all books
app.get("/books", BookController.findAll);

// Define a route for retrieving a single book by its ID
app.get("/books/:id", BOOK_VALIDATION.validateBookId, BookController.findById);

// Define a route for creating a new book
app.post("/books", BOOK_VALIDATION.validateObject, BookController.create);

// Define a route for updating an existing book by its ID
app.put("/books/:id", BOOK_VALIDATION.validateBookId, BOOK_VALIDATION.validateObject, BookController.update);

// Define a route for deleting an existing book by its ID
app.delete("/books/:id", BOOK_VALIDATION.validateBookId, BookController.delete);

// Handle 404 errors for undefined routes
app.use((req, res) => {
    res.status(HTTP_STATUS.NOT_FOUND)
        .json(createBaseResponse(req, res, "Not Found"));
});

// Export the Express application instance for use in other modules
export default app;
