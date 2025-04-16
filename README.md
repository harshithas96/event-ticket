Event Ticket Reservation System

Overview

This project is a Event Ticket Reservation System built using Node.js, Express, and MongoDB. It allows users to reserve tickets based on availability, cancel reservation, and retrieve reservation details. Admins can manage reservation with authentication.

Features

User Authentication: JWT-based authentication for secure access.
Ticket Reservation: users can reserve tickets based on availability.
View Reservation: Users can view their Reservation.
Cancel Reservation: Users can cancel their Reservation.
Admin Access: Only admins can view all Reservation.


Technologies Used

Backend: Node.js, Express.js
Database: MongoDB with Mongoose
Authentication: JWT (JSON Web Token)
Validation: Joi
Testing: Jest & Supertest


Installation

Prerequisites
Install Node.js
Install MongoDB

Steps

Clone the repository:
git clone https://github.com/your-repo/event-ticket.git
cd event-ticket

Install dependencies:

npm install

Create a .env file in the root directory and add:
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key

Start the server:

npm start


API Endpoints

Authentication

POST /api/auth/register - Register a new user
POST /api/auth/login - Login to get a token

Reservation

POST /api/reserve- Reserve a ticket
GET /api/reservationDetails/:email - Get user reservation
DELETE /api/cancelReservation - Cancel a reservation
PUT /api/updateReservation - Update reservation details

Admin

GET /api/getAllReservations - Get all reservations (Admin only)

Testing
Run unit tests using Jest:

npm test
