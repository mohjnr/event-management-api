const express = require('express');
const router = express.Router();
const eventController = require('../controllers/eventController');

// Create an Event
router.post('/events', eventController.createEvent);

// Retrieve All Events
router.get('/events', eventController.getAllEvents);

// Retrieve a Single Event by ID
router.get('/events/:id', eventController.getEventById);

// Update an Event by ID
router.put('/events/:id', eventController.updateEvent);

// Delete an Event by ID
router.delete('/events/:id', eventController.deleteEvent);

// Register a Participant for an Event
router.post('/events/:id/register', eventController.registerParticipant);

// Get Available Spots for an Event
router.get('/events/:id/spots', eventController.getAvailableSpots);

// Cancel a Participant's Registration
router.post('/events/:id/cancel', eventController.cancelRegistration);

module.exports = router;

