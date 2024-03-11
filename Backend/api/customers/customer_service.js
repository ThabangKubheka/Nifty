const bcrypt = require('bcrypt');
const mysql = require('mysql');
const config = require('../../config/database');
const {generateToken} = require('../../auth/token_validation')

function getConnection() {
  return mysql.createConnection(config);
}

async function register(username, password, userType, email) {
  if (userType !== 1 && userType !== 4) {
    throw new Error('Invalid userType');
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  return new Promise((resolve, reject) => {
    const connection = getConnection();
    connection.connect();
    const sql = 'INSERT INTO userTable (Username, Password, UserType, Email) VALUES (?, ?, ?, ?)';
    connection.query(sql, [username, hashedPassword, userType, email], (error, results, fields) => {
      if (error) {
        reject(new Error('Failed to register user'));
      } else {
        resolve({ id: results.insertId, username });
      }
      connection.end();
    });
  });
}

async function login(username, password) {
  return new Promise((resolve, reject) => {
    const connection = getConnection();
    connection.connect();
    const sql = 'SELECT * FROM userTable WHERE username = ?';
    connection.query(sql, [username], async (error, results, fields) => {
      if (error) {
        reject(new Error('Failed to login'));
      } else {
        if (results.length > 0) {
          const match = await bcrypt.compare(password, results[0].Password); 
          if (match) {
            const token = generateToken({ id: results[0].id, username: results[0].Username });
            resolve({ token}); 
          } else {
            reject(new Error('Invalid username or password'));
          }
        } else {
          reject(new Error('Invalid username or password'));
        }
      }
      connection.end();
    });
  });
}

module.exports = {
  register,
  login,
};
