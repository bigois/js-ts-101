// Import necessary modules
import "dotenv/config"; // Load environment variables from a .env file
import app from "./src/app.js"; // Express application instance from the app module

// Define the port number for the server to listen on
const PORT = process.env.PORT;

// Check if the PORT environment variable is defined, and throw an error if it is not
if (!PORT) {
    throw new Error("PORT environment variable is not defined");
}

// Start the server and listen for incoming requests on the specified port
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}/`);
});
