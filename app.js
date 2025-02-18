const express = require('express');
const bodyParser = require('body-parser');
const { sequelize } = require('./models');
const authRoutes = require('./routes/auth');
const trainRoutes = require('./routes/trains');
const bookingRoutes = require('./routes/bookings');
const { createAdminUser } = require('./scripts/seed');

const app = express();

app.use(bodyParser.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/trains', trainRoutes);
app.use('/api/bookings', bookingRoutes);

// Database sync and server start
sequelize.sync().then(() => {
  createAdminUser();
  app.listen(3000, () => {
    console.log('Server running on port 3000');
  });
});