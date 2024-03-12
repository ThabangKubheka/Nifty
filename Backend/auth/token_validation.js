const jwt = require('jsonwebtoken');

function generateToken(payload) {
  return jwt.sign(payload, 'your_secret_key', { expiresIn: '1h' });
}

function verifyToken(token) {
  return new Promise((resolve, reject) => {
    jwt.verify(token, 'your_secret_key', (err, decoded) => {
      if (err) {
        reject(err);
      } else {
        resolve(decoded);
      }
    });
  });
}



module.exports = {
  generateToken,
  verifyToken
};
