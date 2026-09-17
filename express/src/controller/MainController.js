// Import necessary modules
import * as HTTP_STATUS from "../constants/httpStatus.js";       // HTTP status codes
import createBaseResponse from "../utils/createBaseResponse.js"; // Utility function to create a standardized response object

// Define the MainController class to handle main application routes
class MainController {
    // Handle the root URL ("/") and return a welcome message
    static async getHome(req, res) {
        try {
            res.status(HTTP_STATUS.OK)
                .json(createBaseResponse(req, res, "Welcome!"));
        } catch (error) {
            res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR)
                .json(createBaseResponse(req, res, "Internal server error"));
        }
    }

    // Handle undefined routes and return a 404 Not Found response
    static async getNotFound(req, res) {
        try {
            res.status(HTTP_STATUS.NOT_FOUND)
                .json(createBaseResponse(req, res, "Not Found"));
        } catch (error) {
            res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR)
                .json(createBaseResponse(req, res, "Internal server error"));
        }
    }

    // Handle a GET request to retrieve query parameters from the request
    static async getQueryParameters(req, res) {
        try {
            const queryParameters = req.query; // Access the query parameter named 'param'
            res.status(HTTP_STATUS.OK)
                .json(createBaseResponse(req, res, "Query parameter retrieved successfully", {param: queryParameters}));
        } catch (error) {
            res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR)
                .json(createBaseResponse(req, res, "Internal server error"));
        }
    }
}

// Export the MainController class for use in other modules
export default MainController;
