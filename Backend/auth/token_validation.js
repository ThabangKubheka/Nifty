const jwt = require('jsonwebtoken');

function generateToken(payload) {
  return jwt.sign(payload, 'your_secret_key', { expiresIn: '1h' });
}

module.exports = {
  generateToken,
};
