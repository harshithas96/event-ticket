const mongoose = require('mongoose');

const reservationSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  eventDate: { type: Date, required: true },
  seatNumber: { type: String, required: true },
  status: { type: String, enum: ["Booked", "Cancelled"], default: "Booked" },
});

module.exports = mongoose.model('Reservation', reservationSchema);