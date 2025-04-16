const Reservation = require("../models/reservationModel");

const reserveTicket = async (req, res) => {
  try {
    console.log("Inside reserveTicket API");
    const { name, email, eventDate} = req.body;

    if (!name || !email || !eventDate ) {
      return res.status(400).json({ message: "All fields are required" });
    }
    
    // Count reservations for this eventDate
    const existingCount = await Reservation.countDocuments({ eventDate });

    // Auto-assign seat number like A-1, A-2, etc.
    const seatNumber = `A-${existingCount + 1}`;
   
    const newReservation = new Reservation({
      name,
      email,
      eventDate,
      seatNumber,
      status: "Booked"
    });

    await newReservation.save();
    return res.status(201).json({
      message: "Ticket reserved successfully",
      booking: newReservation,
    });
  } catch (error) {
    console.error("Reservation error:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};


const getReservationDetails = async (req, res) => {
  try {
    const { email } = req.params;
    console.log("Email received:", email);
    // Validate email
    if (!email) {
      return res.status(400).json({ message: "Email is required" });
    }

    // Convert email to lowercase for case-insensitive matching
    const reserve = await Reservation.find({ email: email.toLowerCase() });

    if (reserve.length === 0) {
      return res
        .status(404)
        .json({ message: "No bookings found for this email" });
    }

    return res.status(200).json(reserve);
  } catch (error) {
    console.error("Error fetching reservation:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
const getAllReservations = async (req, res) =>{
  try {
  const reserve = await Reservation.find();
  if (!reserve)
    return res.status(404).json({ message: "No reservation found" });
  return res.status(200).json(reserve);
} catch (error) {
  console.error("Error fetching reservation:", error);
  return res.status(500).json({ message: "Internal Server Error" });
}
};
const cancelReservation = async (req, res) => {
  try {
    const { email, eventDate } = req.body;
    if (!email || !eventDate) {
      return res
        .status(400)
        .json({ message: "Email and eventdate are required" });
    }

    const CancelledReservation = await Reservation.findOneAndDelete({
      email: email,
      eventDate: eventDate,
    });
    if (!CancelledReservation) {
      return res
        .status(404)
        .json({ message: "No reservation found with this email and eventdate" });
    }
    await Reservation.updateOne({ eventDate }, { status: "Booked" });
    return res
      .status(200)
      .json({ message: "Reservation cancelled successfully", CancelledReservation });
  } catch (error) {
    console.error("Error cancelling reservation:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
const updateReservation = async (req, res) => {
  try {
    const { email, eventDate,seatNumber } = req.body;
    if (!email || !seatNumber || !eventDate ) {
      return res
        .status(400)
        .json({
          message:
            "Email, seat number, event date are required",
        });
    }
    const updatedReservation = await Reservation.findOneAndUpdate(
      { email: email, eventDate: eventDate },
      { seatNumber},
      { new: true }
    );
    
    if (!updatedReservation) {
      return res
        .status(404)
        .json({ message: "No booking found with this email and event date" });
    }
    return res
      .status(200)
      .json({ message: "Reservation updated successfully", updatedReservation });
  } catch (error) {
    console.error("Error updating reservation:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = {
  reserveTicket,
  getReservationDetails,
  getAllReservations,
  cancelReservation,
  updateReservation,
};