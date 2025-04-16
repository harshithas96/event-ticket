const express = require("express");
const router = express.Router();
const {
  reserveTicket,
  getReservationDetails,
  getAllReservations,
  cancelReservation,
  updateReservation,
} = require("../controllers/reservationController");
const {validateReservation, validateUpdateReservation} = require("../middlewares/validateReservation");
const authMiddleware = require("../middlewares/authMiddleware");
const adminMiddleware = require("../middlewares/adminMiddleware");

console.log("In Router");
router.post("/reserve", authMiddleware, validateReservation,reserveTicket);
router.get("/reservationDetails/:email", authMiddleware, getReservationDetails);
router.get("/getAllReservations", authMiddleware, adminMiddleware, getAllReservations);
router.delete("/cancelReservation", authMiddleware, cancelReservation);
router.put("/updateReservation", authMiddleware, validateUpdateReservation, updateReservation);

module.exports = router;