const express = require('express');
const { Train, Booking } = require('../models');
const authenticateUser = require('../middleware/auth');

const router = express.Router();

// Book a seat
router.post('/:trainId/bookings', authenticateUser, async (req, res) => {
  const { trainId } = req.params;
  const { userId } = req.body;
  try {
    const train = await Train.findByPk(trainId);
    if (!train) return res.status(404).json({ error: 'Train not found' });

    const bookingsCount = await Booking.count({ where: { trainId } });
    if (bookingsCount >= train.totalSeats) {
      return res.status(400).json({ error: 'No seats available' });
    }

    const booking = await Booking.create({ userId, trainId });
    res.status(201).json(booking);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Get booking details
router.get('/:bookingId', authenticateUser, async (req, res) => {
  const { bookingId } = req.params;
  try {
    const booking = await Booking.findByPk(bookingId, { include: [Train, User] });
    if (!booking) return res.status(404).json({ error: 'Booking not found' });
    res.json(booking);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;