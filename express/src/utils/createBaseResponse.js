// Create a base response structure for API responses
const createBaseResponse = (req, res, message, details) => ({
    timestamp: new Date().toISOString(),
    endpoint: req.method + ' ' + req.originalUrl,
    status: res.statusCode,
    message,
    ...(details !== undefined && { details })
});

// Export the createBaseResponse function for use in other parts of the application
export default createBaseResponse;
