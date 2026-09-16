// Import necessary modules
import mongoose from "mongoose"; // Mongoose module

// Book schema definition for MongoDB using Mongoose
/**
 * @typedef {Object} BookData
 * @property {string} title
 * @property {string} author
 * @property {number} publicationYear
 * @property {number} pages
 * @property {boolean} available
 */
const bookSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    publicationYear: {
        type: Number,
        required: true
    },
    pages: {
        type: Number,
        required: true
    },
    available: {
        type: Boolean,
        required: true
    }
}, {
    versionKey: false
});

// Create a Mongoose model for the Book schema and export it
/** @type {mongoose.Model<BookData>} */
const Book = mongoose.model("Book", bookSchema);
export default Book;
