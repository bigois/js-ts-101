// Import necessary modules
import express from "express";                                  // Express module
import connectDatabase from "./config/dbConnect.js";            // Database connection module
import Book from "./model/Book.js";                             // Mongoose model for the Book schema
import * as HTTP_STATUS from "./constants/httpStatus.js";       // HTTP status codes
import mongoose from "mongoose";                                // Mongoose module for MongoDB interactions
import createBaseResponse from "./utils/createBaseResponse.js"; // Utility function to create a standardized response object
import validateBook from "./middleware/validateBook.js";        // Middleware for validating book data in requests

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
app.post("/books", validateBook, async (req, res) => {
    // Extract the book data from the request body, excluding the ID since it should not be updated directly
    const { title, author, publicationYear, pages, available } = req.body;

    // Create a new book in the database using the validated data from the request body
    const createdBook = await Book.create({ title, author, publicationYear, pages, available });
    res.status(HTTP_STATUS.CREATED)
        .json(createBaseResponse(req, res, "Book successfully created", createdBook));
});

// Define a route for updating an existing book by its ID
app.put("/books/:id", validateBook, async (req, res) => {
    // Extract the book ID from the request parameters
    const bookId = req.params.id;

    // Validate the book ID before proceeding
    if (!mongoose.isObjectIdOrHexString(req.params.id)) {
        return res.status(HTTP_STATUS.BAD_REQUEST)
            .json(createBaseResponse(req, res, "Invalid book ID"));
    }

    // Check if the book exists before attempting to update it
    const book = /** @type {import("mongoose").HydratedDocument<{
     title: string,
     author: string,
     publicationYear: number,
     pages: number,
     available: boolean
     }> | null} */ await Book.findById(bookId);
    if (book) {
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
app.delete("/books/:id", async (req, res) => {
    // Extract the book ID from the request parameters
    const bookId = req.params.id;

    // Validate the book ID before proceeding
    if (!mongoose.isObjectIdOrHexString(req.params.id)) {
        return res.status(HTTP_STATUS.BAD_REQUEST)
            .json(createBaseResponse(req, res, "Invalid book ID"));
    }

    // Check if the book exists before attempting to delete it
    const deletedBook = await Book.findByIdAndDelete(bookId);
    if (deletedBook) {
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
