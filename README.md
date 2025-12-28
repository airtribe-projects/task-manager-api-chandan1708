# Task Manager API

A production-ready RESTful API for managing tasks with comprehensive filtering, sorting, and priority management capabilities. Built with Express.js and designed to demonstrate best practices in Node.js API development.

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Prerequisites](#prerequisites)
- [Installation &amp; Setup](#installation--setup)
- [Running the Application](#running-the-application)
- [API Documentation](#api-documentation)
- [Testing](#testing)
- [Project Structure](#project-structure)
- [Error Handling](#error-handling)

---

## Overview

The Task Manager API is a lightweight yet robust service for creating, reading, updating, and deleting tasks. It provides advanced filtering and sorting capabilities, allowing users to organize their work by completion status, priority level, and creation date.

**Key Highlights:**

- Full CRUD operations for task management
- Advanced filtering and sorting capabilities
- Priority-based task organization (Low, Medium, High)
- Comprehensive error handling and validation

---

## Features

### Core Functionality

- Create Tasks: Add new tasks with title, description, priority, and completion status
- Retrieve Tasks: Get all tasks with optional filtering and sorting
- Retrieve by ID: Fetch a specific task by its unique identifier
- Update Tasks: Modify task details including priority and completion status
- Delete Tasks: Remove tasks from the system

### Advanced Features

- Filter by Completion Status: Retrieve only completed or incomplete tasks
- Sort by Priority: Order tasks by priority levels (Low → High)
- Sort by Creation Date: Organize tasks chronologically
- Filter by Priority Level: Get tasks of a specific priority
- Validation: Comprehensive input validation with meaningful error messages
- Timestamps: Automatic tracking of creation and update times

---

## Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** v18.0.0 or higher
- **npm** (comes with Node.js)
- **Github**(for cloning the repository)

**Verify your installation:**

```bash
node --version  # Should be v18.0.0 or higher
npm --version   # Should be v9.0.0 or higher
```

---

## Installation & Setup

### 1. Clone or Download the Project

```bash
cd /path/to/project
```

### 2. Install Dependencies

```bash
npm install
```

This will install all required packages listed in `package.json`:

- **express**: Web framework for building the API
- **nodemon**: Auto-restart server during development (optional)
- **supertest**: Testing HTTP requests
- **tap**: Test framework for running tests

### 3. Project Structure

```
task-manager-api/
├── app.js                 # Express application setup
├── package.json          # Project dependencies
├── controllers/
│   └── TaskController.js # Business logic for tasks
├── models/
│   ├── TaskModel.js      # MongoDB schema definition
│   └── data.js           # Sample data and in-memory storage
├── routes/
│   └── TaskRouter.js     # API route definitions
├── test/
│   └── server.test.js    # Comprehensive test suite
└── README.md             # This file
```

---

## Running the Application

### Development Mode

Start the server with automatic reload on file changes:

```bash
npm start
```

Or start the server directly:

```bash
node app.js
```

**Expected output:**

```
Server is listening on 3000
```

The API will be accessible at `http://localhost:3000`

### Verify the Server is Running

```bash
curl http://localhost:3000/tasks
```

You should receive a JSON response with all tasks.

---

## API Documentation

### Base URL

```
http://localhost:3000
```

### Response Format

All responses follow a consistent JSON format with appropriate HTTP status codes.

---

### 1. Create a New Task

**Endpoint:** `POST /tasks`

**Description:** Create a new task with the provided details.

**Request Body:**

```json
{
  "title": "Complete project proposal",
  "description": "Finish and submit the Q4 project proposal",
  "completed": false,
  "priority": "High"
}
```

**Parameters:**

| Field       | Type    | Required | Values                  | Example                                             |
| ----------- | ------- | -------- | ----------------------- | --------------------------------------------------- |
| title       | string  | Yes      | Max 100 chars           | "New Task"                                          |
| description | string  | Yes      | Any text                | "Task description"                                  |
| completed   | boolean | No       | true/false              | false                                               |
| priority    | string  | No       | "Low", "Medium", "High" | "Medium" (if no input declared as default = Medium) |

**Response (201 Created):**

```json
{
  "id": 6,
  "title": "Complete project proposal",
  "description": "Finish and submit the Q4 project proposal",
  "completed": false,
  "priority": "High",
  "createdAt": "2024-12-28T10:30:00.000Z",
  "updatedAt": "2024-12-28T10:30:00.000Z"
}
```

**Error Response (400 Bad Request):**

```json
{
  "message": "Title and Description are required"
}
```

**Example with cURL:**

```bash
curl -X POST http://localhost:3000/tasks \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Buy groceries",
    "description": "Milk, eggs, and bread",
    "priority": "Low"
  }'
```

---

### 2. Get All Tasks (with Filtering & Sorting)

**Endpoint:** `GET /tasks`

**Description:** Retrieve all tasks with optional filtering and sorting.

**Query Parameters:**

| Parameter | Type   | Values          | Description                 | Example             |
| --------- | ------ | --------------- | --------------------------- | ------------------- |
| completed | string | "true", "false" | Filter by completion status | `?completed=true` |
| sortBy    | string | "asc", "desc"   | Sort by priority            | `?sortBy=asc`     |
| sortDate  | string | "asc", "desc"   | Sort by creation date       | `?sortDate=desc`  |

**Response (200 OK):**

```json
[
  {
    "id": 1,
    "title": "Set up environment",
    "description": "Install Node.js, npm, and git",
    "completed": true,
    "priority": "High",
    "createdAt": "2024-11-15T00:00:00.000Z",
    "updatedAt": "2024-11-20T00:00:00.000Z"
  },
  {
    "id": 2,
    "title": "Review code changes",
    "description": "Review pull requests from the team",
    "completed": false,
    "priority": "Medium",
    "createdAt": "2024-11-18T00:00:00.000Z",
    "updatedAt": "2024-11-22T00:00:00.000Z"
  }
]
```

**Example Requests:**

Get only completed tasks:

```bash
curl http://localhost:3000/tasks?completed=true
```

Get incomplete tasks sorted by priority (ascending):

```bash
curl http://localhost:3000/tasks?completed=false&sortBy=asc
```

Get all tasks sorted by creation date (newest first):

```bash
curl http://localhost:3000/tasks?sortDate=desc
```

---

### 3. Get a Specific Task

**Endpoint:** `GET /tasks/:id`

**Description:** Retrieve a single task by its unique identifier.

**Path Parameters:**

| Parameter | Type   | Description            | Example |
| --------- | ------ | ---------------------- | ------- |
| id        | number | Task unique identifier | 1       |

**Response (200 OK):**

```json
{
  "id": 1,
  "title": "Set up environment",
  "description": "Install Node.js, npm, and git",
  "completed": true,
  "priority": "High",
  "createdAt": "2024-11-15T00:00:00.000Z",
  "updatedAt": "2024-11-20T00:00:00.000Z"
}
```

**Error Response (404 Not Found):**

```json
{
  "message": "Task not found"
}
```

**Example with cURL:**

```bash
curl http://localhost:3000/tasks/1
```

---

### 4. Get Tasks by Priority Level

**Endpoint:** `GET /tasks/priority/:level`

**Description:** Retrieve all tasks with a specific priority level.

**Path Parameters:**

| Parameter | Type   | Values                  | Description                       | Example |
| --------- | ------ | ----------------------- | --------------------------------- | ------- |
| level     | string | "low", "medium", "high" | Priority level (case-insensitive) | high    |

**Response (200 OK):**

```json
[
  {
    "id": 1,
    "title": "Set up environment",
    "description": "Install Node.js, npm, and git",
    "completed": true,
    "priority": "High",
    "createdAt": "2024-11-15T00:00:00.000Z",
    "updatedAt": "2024-11-20T00:00:00.000Z"
  },
  {
    "id": 4,
    "title": "Fix bug in authentication",
    "description": "Fix JWT token expiration issue",
    "completed": false,
    "priority": "High",
    "createdAt": "2024-11-22T00:00:00.000Z",
    "updatedAt": "2024-11-22T00:00:00.000Z"
  }
]
```

**Example with cURL:**

```bash
curl http://localhost:3000/tasks/priority/high
```

---

### 5. Update a Task

**Endpoint:** `PUT /tasks/:id`

**Description:** Update an existing task's details.

**Path Parameters:**

| Parameter | Type   | Description            | Example |
| --------- | ------ | ---------------------- | ------- |
| id        | number | Task unique identifier | 1       |

**Request Body:**

```json
{
  "title": "Updated Task Title",
  "description": "Updated task description",
  "completed": true,
  "priority": "High"
}
```

**Parameters:**

| Field       | Type    | Required | Values                  |
| ----------- | ------- | -------- | ----------------------- |
| title       | string  | Yes      | Max 100 chars           |
| description | string  | Yes      | Any text                |
| completed   | boolean | No       | true/false              |
| priority    | string  | No       | "Low", "Medium", "High" |

**Response (200 OK):**

```json
{
  "id": 1,
  "title": "Updated Task Title",
  "description": "Updated task description",
  "completed": true,
  "priority": "High",
  "createdAt": "2024-11-15T00:00:00.000Z",
  "updatedAt": "2024-12-28T11:30:00.000Z"
}
```

**Error Response (404 Not Found):**

```json
{
  "message": "Task not found"
}
```

**Error Response (400 Bad Request):**

```json
{
  "message": "Completed must be a boolean"
}
```

**Example with cURL:**

```bash
curl -X PUT http://localhost:3000/tasks/1 \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Updated task",
    "description": "This has been updated",
    "completed": true,
    "priority": "Medium"
  }'
```

---

### 6. Delete a Task

**Endpoint:** `DELETE /tasks/:id`

**Description:** Permanently remove a task from the system.

**Path Parameters:**

| Parameter | Type   | Description            | Example |
| --------- | ------ | ---------------------- | ------- |
| id        | number | Task unique identifier | 1       |

**Response (200 OK):**

```json
{
  "id": 1,
  "title": "Set up environment",
  "description": "Install Node.js, npm, and git",
  "completed": true,
  "priority": "High",
  "createdAt": "2024-11-15T00:00:00.000Z",
  "updatedAt": "2024-11-20T00:00:00.000Z"
}
```

**Error Response (404 Not Found):**

```json
{
  "message": "Task not found"
}
```

**Example with cURL:**

```bash
curl -X DELETE http://localhost:3000/tasks/1
```

---

## Testing

The project includes a comprehensive test suite using the TAP framework and Supertest for HTTP testing.

### Run All Tests

```bash
npm test
```

### Run Tests with Coverage

```bash
npm test -- --coverage
```

### Expected Test Output

```
TAP version 14
# Subtest: POST /tasks
    ok 1 - should be equal
    1..1
ok 1 - POST /tasks # time=18.125ms

# Subtest: GET /tasks
    ok 1 - should be equal
    ok 2 - specified property should be defined own property
    ...
    1..9
ok 3 - GET /tasks # time=1.897ms

... (more tests)

1..10
```

### Test Coverage

The test suite validates:

- Task creation with valid and invalid data
- Retrieving all tasks with filtering and sorting
- Fetching a specific task by ID
- Handling non-existent task IDs
- Updating tasks with valid and invalid data
- Deleting tasks
- Error handling and response codes

### Running Individual Tests

Tests are located in the `test/` directory. You can run individual test files:

```bash
node test/server.test.js
```

---

## Error Handling

The API uses standard HTTP status codes and provides meaningful error messages:

| Status Code | Description  | Example Scenario                         |
| ----------- | ------------ | ---------------------------------------- |
| 200         | OK           | Successful GET, PUT, DELETE              |
| 201         | Created      | Task successfully created                |
| 400         | Bad Request  | Invalid input or missing required fields |
| 404         | Not Found    | Task ID doesn't exist                    |
| 500         | Server Error | Unexpected server error                  |

### Common Error Messages

**Missing required fields:**

```json
{
  "message": "Title and Description are required"
}
```

**Invalid priority:**

```json
{
  "message": "Invalid priority. Use Low, Medium, or High."
}
```

**Invalid completion status:**

```json
{
  "message": "Completed must be a boolean"
}
```

**Task not found:**

```json
{
  "message": "Task not found"
}
```

---

## Usage Examples

### Complete Workflow

**1. Create a task:**

```bash
curl -X POST http://localhost:3000/tasks \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Design API",
    "description": "Create REST API for task management",
    "priority": "High"
  }'
```

**2. Retrieve all high-priority tasks:**

```bash
curl http://localhost:3000/tasks/priority/high
```

**3. Mark task as completed:**

```bash
curl -X PUT http://localhost:3000/tasks/1 \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Design API",
    "description": "Create REST API for task management",
    "completed": true,
    "priority": "High"
  }'
```

**4. Get all completed tasks sorted by date:**

```bash
curl http://localhost:3000/tasks?completed=true&sortDate=desc
```

---

## Development Notes

### Code Architecture

The project follows a layered architecture pattern:

- **Controllers** (`controllers/TaskController.js`): Business logic and request handling
- **Models** (`models/TaskModel.js`, `models/data.js`): Data schema and storage
- **Routes** (`routes/TaskRouter.js`): API endpoint definitions
- **App** (`app.js`): Express application configuration

### Key Implementation Details

- **In-Memory Storage**: Uses a JavaScript array for data persistence (suitable for development)
- **Async/Sync Operations**: Synchronous operations for simplicity; can be extended to async with databases
- **Validation**: Input validation at the controller level
- **Error Handling**: Comprehensive try-catch and status code handling

### Future Enhancements

- Database integration (MongoDB, PostgreSQL)
- Authentication & Authorization (JWT)
- Request logging & monitoring
- Caching layer (Redis)
- Advanced search and filtering
- Analytics and task statistics
- Notifications system

---

## Troubleshooting

### Port Already in Use

If you see `Error: listen EADDRINUSE: address already in use :::3000`:

```bash
# Kill the process using port 3000
lsof -ti:3000 | xargs kill -9
```

### Tests Timing Out

Ensure the app is properly exporting the Express instance:

```javascript
// app.js should have this check:
if (require.main === module) {
  app.listen(port);
}
```

### Dependencies Not Installing

```bash
# Clear npm cache and reinstall
npm cache clean --force
rm -rf node_modules package-lock.json
npm install
```

---

## Support & Contribution

For issues, questions, or contributions, please refer to the project documentation or contact the development team.

---

**Last Updated:** December 28, 2024
**Version:** 1.0.0
**Status:** Production Ready
