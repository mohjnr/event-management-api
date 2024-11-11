const Event = require('../models/Event');

//Retrieve an ID for an Event
exports.getEventById = async (req, res) => {
  try{
    const event = await Event.findById(req.params.id);
    if(!event){
      return res.status(404).json({message: "Event does not exist"});
    }
    res.json(event);
  }catch(error)
  {
    res.status(500).json({message: error.message});
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

// Register Participant
exports.registerParticipant = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) return res.status(404).json({ message: "Event not found" });

    if (event.participants.length >= event.maxParticipants) {
      return res.status(400).json({ message: "Event is full" });
    }
    event.participants.push(req.body);
    await event.save();
    res.json(event);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get Available Spots
exports.getAvailableSpots = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) return res.status(404).json({ message: "Event not found" });
    res.json({ availableSpots: event.availableSpots });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Cancel Registration
exports.cancelRegistration = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) return res.status(404).json({ message: "Event not found" });
    
    const index = event.participants.findIndex(p => p.email === req.body.email);
    if (index === -1) return res.status(404).json({ message: "Participant not found" });
    
    event.participants.splice(index, 1);
    await event.save();
    res.json(event);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
