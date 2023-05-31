const { poolPromise, sql } = require('../config.js');
const crypto = require('crypto');

const loginUser = async (email, password) => {
  try {
    const pool = await poolPromise;
    const hash = crypto.createHash('sha256');
    hash.update(password);
    const hashedPassword = hash.digest('hex');

    const query = `
      SELECT COUNT(*) AS userCount
      FROM Player
      WHERE email = @email
        AND password = @hashedPassword
    `;
    const result = await pool.request()
      .input('email', sql.VarChar(100), email)
      .input('hashedPassword', sql.VarChar(255), hashedPassword)
      .query(query);

    if (result.recordset[0].userCount > 0) {
      return 'Login successful';
    } else {
      return 'Invalid email or password';
    }
  } catch (error) {
    console.error('Error logging in:', error);
    return 'An error occurred while logging in.';
  }
};

module.exports = { loginUser };