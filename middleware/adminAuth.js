const config = require('../config/config');

const authenticateAdmin = (req, res, next) => {
  const apiKey = req.headers['x-api-key'];
  if (apiKey !== config.admin.apiKey) {
    return res.status(403).json({ error: 'Unauthorized' });
  }
  next();
};

module.exports = authenticateAdmin;