const { poolPromise, sql } = require('../db/db.js');
const crypto = require('crypto');

const signUpUser = async (email, password, firstname, lastname) => {
  try {
    const pool = await poolPromise;

    const checkQuery = `
      SELECT COUNT(*) AS userCount
      FROM Player
      WHERE email = @email
    `;
    const checkResult = await pool.request()
      .input('email', sql.VarChar(100), email)
      .query(checkQuery);

    if (checkResult.recordset[0].userCount > 0) {
      return 'Email already exists';
    }

    const hash = crypto.createHash('sha256');
    hash.update(password);
    const hashedPassword = hash.digest('hex');

    const insertQuery = `
      INSERT INTO Player (email, firstname, lastname, password)
      VALUES (@email, @firstname, @lastname, @hashedPassword)
    `;
    
    await pool.request()
      .input('email', sql.VarChar(100), email)
      .input('firstname', sql.VarChar(100), firstname)
      .input('lastname', sql.VarChar(100), lastname)
      .input('hashedPassword', sql.VarChar(255), hashedPassword)
      .query(insertQuery);


    const addPlayerScore = `
    INSERT INTO Score (player_email)
    VALUES (@email)
  `;
   await pool.request()
  .input('email', sql.VarChar(100), email)
  .query(addPlayerScore);
 
    return 'User created successfully';
  } catch (error) {
    console.error('Error signing up:', error);
    return 'An error occurred while signing up.';
  }
};

module.exports = { signUpUser };