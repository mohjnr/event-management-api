const mongoose = require('mongoose');

const participantSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
});

const eventSchema = new mongoose.Schema({
  eventName: { type: String, required: true },
  description: { type: String, required: true },
  date: { type: Date, required: true },
  location: { type: String, required: true },
  maxParticipants: { type: Number, required: true },
  participants: [participantSchema],
});

eventSchema.virtual('availableSpots').get(function () {
  return this.maxParticipants - this.participants.length;
});

module.exports = mongoose.model('Event', eventSchema);

