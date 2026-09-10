// Simple HTTP server using Node.js http module
import http from "http";

// Define the port number for the server to listen on
const PORT = 3000;

// Create an HTTP server instance
const server = http.createServer((req, res) => {
    // res.statusCode = 200;
    // res.setHeader("Content-Type", "text/plain");
    res.writeHead(200, { "Content-Type": "text/plain" });

    res.end("Hello, World!\n");
});

// Start the server and listen on port 3000
server.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}/`);
});
