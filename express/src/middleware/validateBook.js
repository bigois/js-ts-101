// Import necessary modules
import Book from "../model/Book.js";                             // Mongoose model for the Book schema
import * as HTTP_STATUS from "../constants/httpStatus.js";       // HTTP status codes
import createBaseResponse from "../utils/createBaseResponse.js"; // Database connection module
import mongoose from "mongoose";                                 // Mongoose module for MongoDB interactions

// Middleware function to validate the structure and content of a book object
const validateObject = async (req, res, next) => {
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

// Middleware function to validate the book ID in the request parameters
const validateBookId = (req, res, next) => {
    // Check if the book ID is a valid ObjectId or hex string
    if (!mongoose.isObjectIdOrHexString(req.params.id)) {
        return res.status(HTTP_STATUS.BAD_REQUEST)
            .json(createBaseResponse(req, res, "Invalid book ID"));
    }

    // If the book ID is valid, proceed to the next middleware or route handler
    next();
};

// Export the middleware functions for use in other parts of the application
export { validateObject, validateBookId };
