const jwt = require('jsonwebtoken');

const generateToken = (payload) => {
  return jwt.sign(payload, 'your_secret_key', { expiresIn: '1h' });
}

const verifyToken = (token) => {
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

const authToken = async (req, res, next) => {
  const authHeader = req.headers['authorization'];

  if (!authHeader) {
    return res.sendStatus(401);
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = await verifyToken(token);
    console.log('Decoded', decoded);
    req.user = decoded;
    next();
  } catch (error) {
    console.error('Error verifying token:', error);
    return res.sendStatus(403);
  }
}

module.exports = {
  generateToken,
  authToken
};
