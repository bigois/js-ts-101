// Import necessary modules
import express from "express";                                // Express module
import books from "../data/books.json" with { type: "json" }; // Import data from the JSON file
import connectDatabase from "../config/dbConnect.js";         // Database connection module
import Book from "../model/Book.js";                          // Mongoose model for the Book schema
import * as HTTP_STATUS from "./constants/httpStatus.js";     // HTTP status codes
import mongoose from "mongoose";                              // Mongoose module for MongoDB interactions

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

// Create a base response structure for API responses
const createBaseResponse = (req, res, message, details) => ({
    timestamp: new Date().toISOString(),
    path: req.originalUrl,
    status: res.statusCode,
    message,
    ...(details !== undefined && { details })
});

// Validate the structure and content of a book object
const isValidBook = (book) => {
    return book &&
    typeof book === "object" && !Array.isArray(book) &&
    typeof book.title === "string" && book.title.trim().length > 0 &&
    typeof book.author === "string" && book.author.trim().length > 0 &&
    Number.isInteger(book.publicationYear) && book.publicationYear > 0 &&
    Number.isInteger(book.pages) && book.pages > 0 &&
    typeof book.available === "boolean";
};

// Define a route for the root URL ("/")
app.get("/", (req, res) => {
    res.status(HTTP_STATUS.OK)
        .json(createBaseResponse(req, res, "Welcome!"));
});

// Define a route for retrieving all books
app.get("/books", async (req, res) => {
    // Get all books from the database
    const book = await Book.find();
    res.status(HTTP_STATUS.OK)
        .json(createBaseResponse(req, res, "Books retrieved successfully", book));
});

// Define a route for retrieving a single book by its ID
app.get("/books/:id", async (req, res) => {
    // Extract the book ID from the request parameters
    const bookId = req.params.id;

    // Validate the book ID before proceeding
    if (!mongoose.isObjectIdOrHexString(req.params.id)) {
        return res.status(HTTP_STATUS.BAD_REQUEST)
            .json(createBaseResponse(req, res, "Invalid book ID"));
    }

    const book = await Book.findById(bookId);

    // Check if the book exists before attempting to return it
    if (book) {
        res.status(HTTP_STATUS.OK)
            .json(createBaseResponse(req, res, "Book retrieved successfully", book));
    } else {
        res.status(HTTP_STATUS.NOT_FOUND)
            .json(createBaseResponse(req, res, "Book not found"));
    }
});

// Define a route for creating a new book
app.post("/books", async (req, res) => {
    // Validate the incoming book data before proceeding
    if (!isValidBook(req.body)) {
        return res.status(HTTP_STATUS.BAD_REQUEST)
            .json(createBaseResponse(req, res, "Invalid book data"));
    }

    const book = await Book.create(req.body);

    res.status(HTTP_STATUS.CREATED)
        .json(createBaseResponse(req, res, "Book successfully created", book));
});

// Define a route for updating an existing book by its ID
app.put("/books/:id", async (req, res) => {
    // Extract the book ID from the request parameters
    const bookId = req.params.id;

    // Validate the book ID before proceeding
    if (!mongoose.isObjectIdOrHexString(req.params.id)) {
        return res.status(HTTP_STATUS.BAD_REQUEST)
            .json(createBaseResponse(req, res, "Invalid book ID"));
    }

    // Check if the book exists before attempting to update it
    const book = await Book.findById(bookId);
    if (book) {
        // Validate the incoming book data before updating the existing book
        if (!isValidBook(req.body)) {
            return res.status(HTTP_STATUS.BAD_REQUEST)
                .json(createBaseResponse(req, res, "Invalid book data"));
        }

        // Extract the book data from the request body, excluding the ID since it should not be updated directly
        const { title, author, publicationYear, pages, available } = req.body;

        // Update the existing book with the new data and save it to the database
        Object.assign(book, { title, author, publicationYear, pages, available });
        const updatedBook = await book.save();

        res.status(HTTP_STATUS.OK)
            .json(createBaseResponse(req, res, "Book successfully updated", updatedBook));
    } else {
        res.status(HTTP_STATUS.NOT_FOUND)
            .json(createBaseResponse(req, res, "Book not found"));
    }
});

// Define a route for deleting an existing book by its ID
app.delete("/books/:id", (req, res) => {
    // Get the book index by its ID from the books array
    const bookId = Number(req.params.id);

    if (!Number.isInteger(bookId)) {
        return res.status(HTTP_STATUS.BAD_REQUEST)
            .json(createBaseResponse(req, res, "Invalid book ID"));
    }

    // Check if the book exists before attempting to delete it
    const bookIndex = books.findIndex(b => b.id === bookId);
    if (bookIndex !== -1) {
        const deletedBook = books.splice(bookIndex, 1)[0]; // [0] returns deletedBook instead of an array containing it
        res.status(HTTP_STATUS.OK)
            .json(createBaseResponse(req, res, "Book successfully deleted", deletedBook));
    } else {
        res.status(HTTP_STATUS.NOT_FOUND)
            .json(createBaseResponse(req, res, "Book not found"));
    }
});

// Handle 404 errors for undefined routes
app.use((req, res) => {
    res.status(HTTP_STATUS.NOT_FOUND)
        .json(createBaseResponse(req, res, "Not Found"));
});

// Export the Express application instance for use in other modules
export default app;
