// Import necessary modules
import mongoose from "mongoose"; // Mongoose module

// Book schema definition for MongoDB using Mongoose
const bookSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    publishedDate: {
        type: Date,
        required: true
    },
    pages: {
        type: Number,
        required: true
    }
});

// Create a Mongoose model for the Book schema and export it
const Book = mongoose.model("Book", bookSchema);
export default Book;
