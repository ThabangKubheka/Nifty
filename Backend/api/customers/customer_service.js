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

async function updateDetails(userId, newDetails) {
  const { email, password } = newDetails;

  return new Promise((resolve, reject) => {
    const connection = getConnection();
    connection.connect();
    
    let updateQuery = 'UPDATE userTable SET ';
    const updateParams = [];

    if (newDetails.userType !== undefined || newDetails.username !== undefined) {
      reject(new Error("User type and username cannot be updated"));
      connection.end();
      return;
    }

    if (email !== undefined) {
      updateQuery += 'Email = ?';
      updateParams.push(email);
    }

    if (password !== undefined) {
      const hashedPassword = bcrypt.hashSync(password, 10);
      if (email !== undefined) {
        updateQuery += ', ';
      }
      updateQuery += 'Password = ?';
      updateParams.push(hashedPassword);
    }

    if (updateParams.length === 0) {
      reject(new Error("No fields to update"));
      connection.end();
      return;
    }

    updateParams.push(userId);

    updateQuery += ' WHERE Email = ?';
    
    connection.query(updateQuery, updateParams, (error, results, fields) => {
      if (error) {
        reject(new Error('Failed to update user details'));
      } else {
        resolve({ message: 'User details updated successfully' });
      }
      connection.end();
    });
  });
}

async function deleteUser(email) {
  return new Promise((resolve, reject) => {
    const connection = getConnection();
    connection.connect();
    const sql = 'DELETE FROM userTable WHERE Email = ?';
    connection.query(sql, [email], (error, results, fields) => {
      if (error) {
        reject(new Error('Failed to delete user'));
      } else {
        resolve({ message: 'User deleted successfully' });
      }
      connection.end();
    });
  });
}

module.exports = {
  register,
  login,
  updateDetails,
  deleteUser
};

