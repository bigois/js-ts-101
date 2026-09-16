// Import necessary modules
import * as HTTP_STATUS from "../constants/httpStatus.js";       // HTTP status codes
import createBaseResponse from "../utils/createBaseResponse.js"; // Utility function to create a standardized response object

// Define the MainController class to handle main application routes
class MainController {
    // Handle the root URL ("/") and return a welcome message
    static async getHome(req, res) {
        res.status(HTTP_STATUS.OK)
            .json(createBaseResponse(req, res, "Welcome!"));
    }

    // Handle undefined routes and return a 404 Not Found response
    static async getNotFound(req, res) {
        res.status(HTTP_STATUS.NOT_FOUND)
            .json(createBaseResponse(req, res, "Not Found"));
    }
}

// Export the MainController class for use in other modules
export default MainController;