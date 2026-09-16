// Import necessary modules
import express from "express";                                   // Express module
import * as BOOK_VALIDATION from "../middleware/validateBook.js"; // Middleware for validating book data in requests
import BookController from "../controller/BookController.js";     // Controller for handling book-related operations

// Create an instance of an Express router to define book-related routes
const router = express.Router();

// Define routes for book-related operations, including validation middleware and controller methods
router.get("/books", BookController.findAll);
router.get("/books/:id", BOOK_VALIDATION.validateBookId, BookController.findById);
router.post("/books", BOOK_VALIDATION.validateObject, BookController.create);
router.put("/books/:id", BOOK_VALIDATION.validateBookId, BOOK_VALIDATION.validateObject, BookController.update);
router.delete("/books/:id", BOOK_VALIDATION.validateBookId, BookController.delete);

// Export the router instance for use in other modules
export default router;