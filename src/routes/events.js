const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const eventController = require('../controllers/eventController');

// Search and Filter Events
router.get('/search', eventController.searchEvents);

// Create an Event
router.post('/', authMiddleware, eventController.createEvent);

// Retrieve All Events
router.get('/', eventController.getAllEvents);

// Retrieve a Single Event by ID
router.get('/:id', eventController.getEventById);

// Update an Event by ID
router.put('/:id', authMiddleware, eventController.updateEvent);

// Delete an Event by ID
router.delete('/:id', authMiddleware, eventController.deleteEvent);

// Register a Participant for an Event
router.post('/:id/register', eventController.registerParticipant);

// Get Available Spots for an Event
router.get('/:id/spots', eventController.getAvailableSpots);

// Cancel a Participant's Registration
router.post('/:id/cancel', eventController.cancelRegistration);

// Search and Filter Events
router.get('/search', eventController.searchEvents);

module.exports = router;

