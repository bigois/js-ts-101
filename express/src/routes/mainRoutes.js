// Import necessary modules
import express from "express";                                // Express module
import MainController from "../controller/MainController.js"; // Controller for handling main application routes

// Create an instance of an Express router to define main application routes
const router = express.Router();

// Define routes for the main application
router.get("/query", MainController.getQueryParameters);
router.use(MainController.getNotFound);

// Export the router instance for use in other modules
export default router;