# express-101

This repository contains practical study examples from Alura and Mimo Express courses. It covers HTTP servers, routes, middleware, and a book API built with Node.js.

## Stack

- Node.js
- JavaScript with ES Modules
- Express 5
- MongoDB
- Mongoose
- Nodemon for development

## Structure

```text
.
├── config/dbConnect.js  # MongoDB connection
├── data/books.json      # sample data for manual MongoDB import
├── model/Book.js        # Mongoose schema and model
├── src/app.js           # Express application, routes, and middleware
├── server.js            # server startup on port 3000
└── package.json
```

## Running locally

Install dependencies:

```bash
npm install
```

Set the MongoDB user password in the current PowerShell session:

```powershell
$env:DB_PASSWORD = "your-password"
```

The application connects to `localhost:27017`, database `library`, using user `bigois` and `authSource=admin`. MongoDB and that user must exist locally before starting the API.

`data/books.json` provides sample book data that can be imported into MongoDB manually. Before importing it into the `books` collection, adapt its records to the `Book` schema, which requires `title`, `author`, `publishedDate`, and `pages`.

Start in development mode:

```bash
npm run dev
```

Or run normally:

```bash
npm start
```

The server is available at `http://localhost:3000`.

## API

Responses are JSON and follow this structure:

```json
{
  "timestamp": "2026-09-15T00:00:00.000Z",
  "path": "/books",
  "status": 200,
  "message": "Books retrieved successfully",
  "details": []
}
```

| Method | Route | Current behavior |
| --- | --- | --- |
| `GET` | `/` | Returns a welcome message. |
| `GET` | `/books` | Lists books from MongoDB. |
| `GET` | `/books/:id` | Retrieves a book from the JSON data loaded in memory. |
| `POST` | `/books` | Creates a book in the JSON data loaded in memory. |
| `PUT` | `/books/:id` | Updates a book in the JSON data loaded in memory. |
| `DELETE` | `/books/:id` | Deletes a book from the JSON data loaded in memory. |

Unknown routes return `404` in the same response format.

## Purpose

Serve as a personal learning reference that evolves as the courses progress, with room for new routes, middleware, and API examples.
