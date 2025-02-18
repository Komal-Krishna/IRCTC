const express = require('express');
const { Train, Booking } = require('../models');
const authenticateAdmin = require('../middleware/adminAuth');

const router = express.Router();

// Add a new train (Admin only)
router.post('/', authenticateAdmin, async (req, res) => {
  const { name, source, destination, totalSeats } = req.body;
  try {
    const train = await Train.create({ name, source, destination, totalSeats, createdBy: req.user.id });
    res.status(201).json(train);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Get seat availability
router.get('/availability', async (req, res) => {
  const { source, destination } = req.query;
  try {
    const trains = await Train.findAll({
      where: { source, destination },
      include: [{ model: Booking, attributes: [] }],
      attributes: {
        include: [
          [sequelize.literal('(SELECT COUNT(*) FROM Bookings WHERE Bookings.trainId = Train.id)'), 'bookingsCount'],
          [sequelize.literal('"totalSeats" - (SELECT COUNT(*) FROM Bookings WHERE Bookings.trainId = Train.id)'), 'availableSeats'],
        ],
      },
    });
    res.json(trains);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;