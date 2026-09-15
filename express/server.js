// Import the Express application instance from the app module
import app from "./src/app.js";

// Define the port number for the server to listen on
const PORT = 3000;

// Start the server and listen on port 3000
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}/`);
});
