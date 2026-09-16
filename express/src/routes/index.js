// Import necessary modules
import express from "express";                                // Express module
import mainRoutes from "./mainRoutes.js"; // Handle main application routes
import bookRoutes from "./bookRoutes.js";                     // Handle book-related routes

// Create a new router instance to define application routes
const router = express.Router();

// Use the imported route modules to handle specific routes
router.use(bookRoutes);
router.use(mainRoutes);

// Export the router instance for use in other modules
export default router;