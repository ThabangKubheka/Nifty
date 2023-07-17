const { poolPromise, sql } = require('../config.js');

const signUpUser = async (email, password, firstname, lastname) => {
  try {

    if (!email || !password || !firstname || !lastname) {
      return 'Missing required fields';
    }
    const pool = await poolPromise;

    const checkQuery = `
      SELECT COUNT(*) AS userCount
      FROM users
      WHERE email = @Email
    `;
    const checkResult = await pool.request()
      .input('Email', sql.VarChar(100), email)
      .query(checkQuery);

    if (checkResult.recordset[0].userCount > 0) {
      return 'Email already exists';
    }

    const insertQuery = `
      INSERT INTO users (email, firstname, lastname, password)
      VALUES (@email, @FirstName, @LastName, @Password)
    `;
    
    await pool.request()
      .input('email', sql.VarChar(100), email)
      .input('firstname', sql.VarChar(100), firstname)
      .input('lastname', sql.VarChar(100), lastname)
      .input('password', sql.VarChar(255), password)
      .query(insertQuery);
 
    return 'User created successfully';
  } catch (error) {
    console.error('Error signing up:', error);
    return 'An error occurred while signing up.';
  }
};

module.exports = { signUpUser };