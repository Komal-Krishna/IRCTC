const { User } = require('../models');
const config = require('../config/config');

const createAdminUser = async () => {
  const admin = await User.findOne({ where: { role: 'admin' } });
  if (!admin) {
    await User.create({
      name: 'Admin',
      email: 'admin@example.com',
      password: 'admin123',
      role: 'admin',
      apiKey: config.admin.apiKey,
    });
    console.log('Admin user created');
  }
};

module.exports = { createAdminUser };