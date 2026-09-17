// Import necessary modules
import Book from "../model/Book.js";                             // Mongoose model for the Book schema
import * as HTTP_STATUS from "../constants/httpStatus.js";       // HTTP status codes
import createBaseResponse from "../utils/createBaseResponse.js"; // Utility function to create a standardized response object

// Define the BookController class to handle book-related operations
class BookController {
    // Get all books from the database
    static async findAll(req, res) {
        try {
            const book = await Book.find();
            res.status(HTTP_STATUS.OK)
                .json(createBaseResponse(req, res, "Books retrieved successfully", book));
        } catch (error) {
            res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR)
                .json(createBaseResponse(req, res, "Internal server error"));
        }
    }

    // Get a single book by its ID
    static async findById(req, res) {
        try {
            // Try to find the corresponding book in the database
            const bookId = req.params.id;
            const book = await Book.findById(bookId);

            // Check if the book exists before attempting to return it
            if (book) {
                res.status(HTTP_STATUS.OK)
                    .json(createBaseResponse(req, res, "Book retrieved successfully", book));
            } else {
                res.status(HTTP_STATUS.NOT_FOUND)
                    .json(createBaseResponse(req, res, "Book not found"));
            }
        } catch (error) {
            res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR)
                .json(createBaseResponse(req, res, "Internal server error"));
        }
    }

    // Create a new book in the database
    static async create(req, res) {
        try {
            // Extract the book data from the request body, excluding the ID since it should not be updated directly
            const { title, author, publicationYear, pages, available } = req.body;

            // Create a new book in the database using the validated data from the request body
            const createdBook = await Book.create({ title, author, publicationYear, pages, available });
            res.status(HTTP_STATUS.CREATED)
                .json(createBaseResponse(req, res, "Book successfully created", createdBook));
        } catch (error) {
            res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR)
                .json(createBaseResponse(req, res, "Internal server error"));
        }
    }

    // Update an existing book in the database
    static async fullUpdate(req, res) {
        try {
            // Extract the book data from the request body, excluding the ID since it should not be updated directly
            const bookId = req.params.id;
            const { title, author, publicationYear, pages, available } = req.body;

            // Try to find and update the corresponding book in the database
            const updatedBook = await Book.findByIdAndUpdate(bookId, { title, author, publicationYear, pages, available },
                { new: true, runValidators: true });

            // Check if the book was found and updated before sending a response
            if (updatedBook) {
                res.status(HTTP_STATUS.OK)
                    .json(createBaseResponse(req, res, "Book successfully updated", updatedBook));
            } else {
                res.status(HTTP_STATUS.NOT_FOUND)
                    .json(createBaseResponse(req, res, "Book not found"));
            }
        } catch (error) {
            res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR)
                .json(createBaseResponse(req, res, "Internal server error"));
        }
    }

    // Partially update an existing book in the database
    static async partialUpdate(req, res) {
        try {
            // Update only the fields validated and sent in the request body
            const bookId = req.params.id;
            const updatedBook = await Book.findByIdAndUpdate(bookId, { $set: req.body },
                { new: true, runValidators: true });

            // Check if the book was found and updated before sending a response
            if (updatedBook) {
                res.status(HTTP_STATUS.OK)
                    .json(createBaseResponse(req, res, "Book successfully updated", updatedBook));
            } else {
                res.status(HTTP_STATUS.NOT_FOUND)
                    .json(createBaseResponse(req, res, "Book not found"));
            }
        } catch (error) {
            res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR)
                .json(createBaseResponse(req, res, "Internal server error"));
        }
    }

    // Delete a book from the database
    static async delete(req, res) {
        try {
            // Try to find and delete the corresponding book in the database
            const bookId = req.params.id;
            const deletedBook = await Book.findByIdAndDelete(bookId);

            // Check if the book was found and deleted before sending a response
            if (deletedBook) {
                res.status(HTTP_STATUS.OK)
                    .json(createBaseResponse(req, res, "Book successfully deleted", deletedBook));
            } else {
                res.status(HTTP_STATUS.NOT_FOUND)
                    .json(createBaseResponse(req, res, "Book not found"));
            }
        } catch (error) {
            res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR)
                .json(createBaseResponse(req, res, "Internal server error"));
        }
    }
}

// Export the BookController class for use in other parts of the application
export default BookController;
