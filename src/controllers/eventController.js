const mongoose = require('mongoose');
const Event = require('../models/Event');


//Retrieve an ID for an Event
exports.getEventById = async (req, res) => {  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
  return res.status(400).json({ message: "Invalid ID format" });
}

  try{
    const event = await Event.findById(req.params.id);
    if(!event){
      console.error("Event not found with ID:", req.params.id);
      return res.status(404).json({message: "Event does not exist"});
    }
    res.json(event);
  }catch(error)
  {
    console.error("Error in getEventById:", error);
    res.status(500).json({message: "Server error"});
  }
};

// Create Event
exports.createEvent = async (req, res) => {
  try {
    const event = new Event(req.body);
    await event.save();
    res.status(201).json(event);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Retrieve Events
exports.getAllEvents = async (req, res) => {
  try {
    const events = await Event.find();
    res.json(events);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update Event
exports.updateEvent = async (req, res) => {
  try {
    const event = await Event.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!event) return res.status(404).json({ message: "Event not found" });
    res.json(event);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete Event
exports.deleteEvent = async (req, res) => {
  try {
    const event = await Event.findByIdAndDelete(req.params.id);
    if (!event) return res.status(404).json({ message: "Event not found" });
    res.json({ message: "Event deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Register a Participant for an Event
exports.registerParticipant = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) return res.status(404).json({ message: "Event not found" });

    const { name, email, phone } = req.body;

    // Check if the participant is already in participants or waitlist
    const isRegistered = event.participants.some(p => p.email === email) || 
                         event.waitlist.some(w => w.email === email);
    if (isRegistered) return res.status(400).json({ message: "Participant already registered or on waitlist" });

    // Add to participants if space is available, otherwise add to waitlist
    if (event.participants.length < event.maxParticipants) {
      event.participants.push({ name, email, phone });
      await event.save();
      res.status(200).json({ message: "Participant registered successfully", event });
    } else {
      event.waitlist.push({ name, email, phone });
      await event.save();
      res.status(200).json({ message: "Event is full. Added to waitlist.", event });
    }
  } catch (error) {
    console.error("Error in registerParticipant:", error);
    res.status(500).json({ message: "Server error" });
  }
};


// Get Available Spots
exports.getAvailableSpots = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) return res.status(404).json({ message: "Event not found" });

    const availableSpots = event.maxParticipants - event.participants.length;
    res.json({ availableSpots, waitlistCount: event.waitlist.length });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Cancel a Participant's Registration
exports.cancelRegistration = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) return res.status(404).json({ message: "Event not found" });

    const { email } = req.body;

    // Find and remove the participant from the participants list
    const participantIndex = event.participants.findIndex(p => p.email === email);
    if (participantIndex === -1) return res.status(404).json({ message: "Participant not found" });
    
    event.participants.splice(participantIndex, 1); // Remove participant

    // Check the waitlist and add the first person to participants if available
    if (event.waitlist.length > 0) {
      const [nextInLine] = event.waitlist.splice(0, 1); // Remove from waitlist
      event.participants.push(nextInLine); // Add to participants
    }

    await event.save();
    res.json({ message: "Registration canceled. Waitlist updated.", event });
  } catch (error) {
    console.error("Error in cancelRegistration:", error);
    res.status(500).json({ message: error.message });
  }
};

// Search and Filter Events
exports.searchEvents = async (req, res) => {
  try {
    const filter = {};
    if (req.query.date) filter.date = req.query.date;
    if (req.query.location) filter.location = new RegExp(req.query.location, 'i');
    if (req.query.category) filter.category = new RegExp(req.query.category, 'i');

    const events = await Event.find(filter);
    res.json(events);
  } catch (error) {
    console.error("Error in searchEvents:", error);
    res.status(500).json({ message: "Server error" });
  }
};