# Event Management API

This is a Node.js based RESTful API for managing events and participants.

## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Project Structure](#project-structure)
- [Setup and Installation](#setup-and-installation)
- [Environment Variables](#environment-variables)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Future Enhancements](#future-enhancements)

## Features

- CRUD operations for managing events
- Participant registration and cancellation
- Real-time tracking of event capacity
- Error handling and input validation

## Technologies Used

- Node.js
- Express.js
- MongoDB with Mongoose
- dotenv for environment management

## Project Structure

event-management-api/
├── src/
│ ├── config/ # MongoDB connection configuration
│ ├── controllers/ # Controller functions for events
│ ├── models/ # Mongoose schema for events
│ ├── routes/ # Route definitions for events
│ └── index.js # Main server file
├── .env # Environment variables
├── package.json # Project dependencies
└── README.md # Project documentation

## Setup and Installation

### Prerequisites

- Node.js and npm installed
- MongoDB installed and running, or a MongoDB Atlas account

### Installation Steps

1. Clone the repository:

   ```bash
   git clone https://github.com/mohjnr/event-management-api.git
   cd event-management-api

   ```

2. Install dependency
   -npm install

3. Configure environment variables

- Create a .env file in the project root and add:
  MONGODB_URI=mongodb://localhost:27017/event_management
  PORT=5000

4. Start the server using npm start

## Environment Variables

The application requires the following environment variables to be set in a `.env` file:

- `MONGODB_URI`: MongoDB connection URI (e.g., `mongodb://localhost:27017/event_management`)
- `PORT`: The port for the server to run on (e.g., `5000`)

## Usage

Use a tool like [Postman](https://www.postman.com/) to interact with the API. Below are the available endpoints and their functions.

## API Endpoints

### Events

- **Create Event**
  - **POST** `/api/events`
  - **Body**:
    ```json
    {
      "eventName": "Sample Event",
      "description": "Event description",
      "date": "2024-12-31T12:00:00",
      "location": "New York",
      "maxParticipants": 5
    }
    ```
- **Retrieve All Events**
  - **GET** `/api/events`
- **Retrieve Event by ID**
  - **GET** `/api/events/:id`
- **Update Event**
  - **PUT** `/api/events/:id`
- **Delete Event**
  - **DELETE** `/api/events/:id`

### Participant Management

- **Register Participant for Event**
  - **POST** `/api/events/:id/register`
- **Get Available Spots for Event**
  - **GET** `/api/events/:id/spots`
- **Cancel Participant Registration**

  - **POST** `/api/events/:id/cancel`

  ## Future Enhancements

- Add authentication and authorization to restrict access to certain endpoints.
- Implement pagination for large lists of events.
- Add email notifications for participants when they register or cancel.
- Enhance error handling and validation logic.
