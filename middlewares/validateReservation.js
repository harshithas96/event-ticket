const Joi = require('joi');

const reservationSchema = Joi.object({
  name: Joi.string().min(1).required().messages({
    'string.empty': 'Name is required'
  }),
  email: Joi.string().email().required().messages({
    'string.email': 'Email must be valid',
    'string.empty': 'Email is required'
  }),
  eventDate: Joi.date().greater("now").required().messages({
    'number.base': 'Date must be a number'
  }),
});

const updateReservationSchema = Joi.object({
    name: Joi.string().optional(),
    email: Joi.string().email().optional(),
    eventDate: Joi.date().optional(),
    seatNumber: Joi.number().integer().optional()
});

const validateReservation = (req, res, next) => {
  const { error } = reservationSchema.validate(req.body);
  if (error) return res.status(400).json({ message: error.details[0].message });


  next();
}

const validateUpdateReservation = (req, res, next) => {
    const { error } = updateReservationSchema.validate(req.body);
    if (error) return res.status(400).json({ message: error.details[0].message });
  
    next();
  };

module.exports = { validateReservation,validateUpdateReservation};