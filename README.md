# Task Manager

## Overview
TaskManager is a RESTful API for task management, user authentication, and real-time interactions. Built with Node.js, Express, and MongoDB, it provides secure and scalable endpoints for managing users and tasks.

## Features
- User authentication (register, login)
- JWT-based authorization
- CRUD operations for tasks
- Middleware for input validation and security
- Rate limiting to prevent abuse

## Tech Stack
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Authentication**: JWT
- **Middleware**: Express Validator, Rate Limiting

## Setup Instructions
### Prerequisites
- Node.js 
- MongoDB (Local or Atlas instance)

### Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/kunal697/TaskManagerAssignment.git
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Configure environment variables:
   - Create a `.env` file in the root directory and add:
     ```ini
     PORT=5000
     MONGO_URI=your_mongodb_uri
     JWT_SECRET=your_jwt_secret
     ```
4. Start the server:
   ```bash
   npm start
   ```

## API Documentation
### Authentication Routes
#### Register User
- **Endpoint**: `POST /api/auth/register`
- **Description**: Registers a new user
- **Request Body**:
  ```json
  {
    "username": "kunal_bodke",
    "email": "kunal@example.com",
    "password": "SecurePass123",
    "fullName": "Kunal Bodke",
    "gender": "Male"
  }
  ```

#### Login User
- **Endpoint**: `POST /api/auth/login`
- **Description**: Authenticates a user and returns a JWT token
- **Request Body**:
  ```json
  {
    "email": "kunal@example.com",
    "password": "SecurePass123"
  }
  ```

### Task Routes (Protected)
#### Create Task
- **Endpoint**: `POST /api/task/create`
- **Headers**:
  ```json
  {
    "Authorization": "Bearer your_jwt_token"
  }
  ```
- **Request Body**:
  ```json
  {
    "title": "Write API Docs",
    "description": "Document all API endpoints",
    "status": "pending"
  }
  ```

#### Get All Tasks
- **Endpoint**: `GET /api/task`
- **Query Parameters**: `?page=1&limit=10&search=documentation`

### User Routes
#### Search User
- **Endpoint**: `GET /api/user/search?username=kunal_bodke&email=kunal@example.com`

## Project Structure
```
📦 quizo-api
├── config
│   └── db.js
├── controllers
│   ├── authController.js
│   ├── taskController.js
│   ├── userController.js
├── middleware
│   ├── ValidateUser.js
│   ├── authMiddleware.js
│   ├── rateLimiter.js
│   ├── validateRequest.js
├── models
│   ├── TaskModel.js
│   ├── UserModel.js
├── routes
│   ├── authRoutes.js
│   ├── taskRoutes.js
│   ├── userRoutes.js
├── utils
│   ├── validateMongoDbId.js
├── .env
├── .gitignore
├── package.json
├── server.js
```

---

