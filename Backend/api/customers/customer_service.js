const mysql = require('mysql');

const config = {
  host: 'localhost',
  port: 3306,
  database: 'NIFTY',
  user: 'Thabang',
  password: 'Swazi'
};

function getConnection() {
  return mysql.createConnection(config);
}

async function register(username, password) {
  return new Promise((resolve, reject) => {
    const connection = getConnection();
    connection.connect();
    const sql = 'INSERT INTO users (username, password) VALUES (?, ?)';
    connection.query(sql, [username, password], (error, results, fields) => {
      if (error) {
        reject(error);
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
    const sql = 'SELECT * FROM users WHERE username = ? AND password = ?';
    connection.query(sql, [username, password], (error, results, fields) => {
      if (error) {
        reject(error);
      } else {
        if (results.length > 0) {
          resolve({ id: results[0].id, username });
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
