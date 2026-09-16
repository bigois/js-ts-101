// Import necessary modules
import Book from "../model/Book.js";                             // Mongoose model for the Book schema
import * as HTTP_STATUS from "../constants/httpStatus.js";       // HTTP status codes
import createBaseResponse from "../utils/createBaseResponse.js"; // Database connection module

// Middleware function to validate the structure and content of a book object
const validateBook = async (req, res, next) => {
    // Check if the request body is valid and contains the necessary fields
    if (!req.body || typeof req.body !== "object" || Array.isArray(req.body)) {
        return res.status(HTTP_STATUS.BAD_REQUEST)
            .json(createBaseResponse(req, res, "Invalid book data"));
    }

    try {
        // Use the Mongoose model's validation method to validate the book data
        await Book.validate(req.body);
        // If validation passes, proceed to the next middleware or route handler
        next();
    } catch {
        return res.status(HTTP_STATUS.UNPROCESSABLE_CONTENT)
            .json(createBaseResponse(req, res, "Invalid book data"));
    }
};

// Export the validateBook middleware function for use in other parts of the application
export default validateBook;
