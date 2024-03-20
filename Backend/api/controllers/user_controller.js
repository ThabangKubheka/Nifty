const bcrypt = require('bcrypt');
const mysql = require('mysql');
const config = require('../../config/database');
const { generateToken } = require('../../auth/token_validation');

const pool = mysql.createPool(config);

async function createUser(req, res) {

  try {

    const username = req.body.username;
    const password = req.body.password;

    const hashedPassword = await bcrypt.hash(password, 10);

    pool.getConnection(async (err, connection) => {
      if (err) throw err;
      const sqlSearch = "SELECT * FROM user WHERE username = ?";
      const search_query = mysql.format(sqlSearch, [username]);
      const sqlInsert = "INSERT INTO user VALUES (0,?,?)";
      const insert_query = mysql.format(sqlInsert, [username, hashedPassword]);

      await connection.query(search_query, async (err, result) => {
        if (err) throw err;
        console.log("------> Search Results");
        console.log(result.length);
        if (result.length != 0) {
          connection.release();
          console.log("------> User already exists");
          res.sendStatus(409);
        } else {
          await connection.query(insert_query, (err, result) => {
            connection.release();
            if (err) throw err;
            console.log("--------> Created new User");
            const token = generateToken({ username: username });
            console.log(result.insertId);
            res.json({ accessToken: token });
          });
        }
      });
    });


  } catch (error) {
    console.error("Error creating user:", error);
    res.sendStatus(500);
  }
}

async function registerUser(req, res) {
  try {
    const { username, name, surname, email, cellphone, address } = req.body;

    pool.getConnection(async (err, connection) => {
      if (err) {
        console.error('Error getting database connection:', err);
        res.status(500).send('Internal Server Error');
        return;
      }

      const checkUserSql = 'SELECT * FROM userInfo WHERE username = ?';
      connection.query(checkUserSql, [username], async (err, results) => {
        if (err) {
          console.error('Error querying database:', err);
          res.status(500).send('Internal Server Error');
          return;
        }

        if (results.length === 0) {
          const insertUserSql = `INSERT INTO userInfo (username, name, surname, email, cellphone, address, status) VALUES (?, ?, ?, ?, ?, ?, true)`;
          connection.query(insertUserSql, [username, name, surname, email, cellphone, address], (err, result) => {
            connection.release();
            if (err) {
              console.error('Error inserting user into userInfo table:', err);
              res.status(500).send('Internal Server Error');
              return;
            }
            console.log('User registered successfully');
            res.sendStatus(201);
          });
        } else {
          const updateUserSql = `UPDATE userInfo SET name = ?, surname = ?, email = ?, cellphone = ?, address = ?, status = true WHERE username = ?`;
          connection.query(updateUserSql, [name, surname, email, cellphone, address, username], (err, result) => {
            connection.release();
            if (err) {
              console.error('Error updating user in userInfo table:', err);
              res.status(500).send('Internal Server Error');
              return;
            }
            console.log('User information updated successfully');
            res.send('User information updated successfully');
          });
        }
      });
    });
  } catch (error) {
    console.error('Error registering user:', error);
    res.sendStatus(500);
  }
}

async function checkEligibility(req, res) {

  try {
    const username = req.params.username;

    pool.getConnection(async (err, connection) => {
      if (err) throw err;

      const sql = `SELECT status FROM userinfo WHERE username = ?`;

      await connection.query(sql, [username], async (err, result) => {
        connection.release();

        if (err) throw err;

        if (result.length === 0) {
          console.log("User does not exist", result);
          res.sendStatus(404);
        } else {
          const status = result[0].status;
          res.json({ status });
        }
      });
    });
  } catch (error) {
    console.error("Error checking eligibility:", error);
    res.sendStatus(500);
  }
}

async function getUserInfo(req, res) {
  try {
    const username = req.params.username;

    pool.getConnection(async (err, connection) => {
      if (err) throw err;

      const sql = `CALL GetUserInformation(?)`;

      await connection.query(sql, [username], async (err, results) => {
        connection.release();

        if (err) throw err;

        if (results.length > 0 && results[0][0]) {
          const userInfo = results[0][0];
          res.json(userInfo);
        } else {
          res.status(404).json({ error: 'User not found' });
        }
      });
    });
  } catch (error) {
    console.error("Error getting user info:", error);
    res.sendStatus(500);
  }

}

async function login(req, res) {

  try {

    const username = req.body.username;
    const password = req.body.password;

    pool.getConnection(async (err, connection) => {
      if (err) throw err;

      const sqlSearch = "SELECT * FROM user WHERE username = ?";
      const search_query = mysql.format(sqlSearch, [username]);

      await connection.query(search_query, async (err, result) => {
        connection.release();

        if (err) throw err;

        if (result.length == 0) {
          console.log("--------> User does not exist");
          res.sendStatus(404);
        } else {
          const hashedPassword = result[0].password;

          if (await bcrypt.compare(password, hashedPassword)) {
            console.log("---------> Login Successful");
            console.log("---------> Generating accessToken");
            const token = generateToken({ username: username });
            console.log(token);
            res.json({ accessToken: token });
          } else {
            console.log("---------> Password Incorrect");
            res.send("Password incorrect!");
          }
        }
      });
    });

  } catch (error) {
    console.error("Error logging user:", error);
    res.sendStatus(500);
  }
}

async function updateUser(req, res) {
  try {
    const { username } = req.params;
    const { name, surname, email, cellphone, address } = req.body;

    pool.getConnection(async (err, connection) => {

      if (err) throw err;

      const updateUserSql = `
        UPDATE userInfo
        SET name = ?, surname = ?, email = ?, cellphone = ?, address = ?
        WHERE username = ?
      `;
      connection.query(updateUserSql, [name, surname, email, cellphone, address, username], (err, result) => {
        connection.release();
        if (err) {
          console.error('Error updating user in userInfo table:', err);
          res.status(500).send('Internal Server Error');
          return;
        }
        console.log('User information updated successfully');
        res.sendStatus(204);
      });
    });
  } catch (error) {
    console.error('Error updating user:', error);
    res.sendStatus(500);
  }
}

async function deleteUser(req, res) {
  try {
    const username = req.params.username;
    const password = req.body.password;

    pool.getConnection(async (err, connection) => {
      if (err) throw err;

      const selectUserSql = 'SELECT * FROM user WHERE username = ?';
      await connection.query(selectUserSql, [username], async (err, result) => {
        if (err) {
          connection.release();
          console.error('Error selecting user:', err);
          res.status(500).send('Internal Server Error');
          return;
        }

        if (result.length === 0) {
          connection.release();
          console.log('User not found');
          res.sendStatus(404);
          return;
        }

        const hashedPassword = result[0].password;
        const passwordMatch = await bcrypt.compare(password, hashedPassword);

        if (!passwordMatch) {
          connection.release();
          console.log('Incorrect password');
          res.sendStatus(401);
          return;
        }

        const deleteUserInfoSql = 'DELETE FROM userInfo WHERE username = ?';
        const deleteUserSql = 'DELETE FROM user WHERE username = ?';

        await connection.query(deleteUserInfoSql, [username], (err, result) => {
          if (err) {
            connection.release();
            console.error('Error deleting user from userInfo table:', err);
            res.status(500).send('Internal Server Error');
            return;
          }

          connection.query(deleteUserSql, [username], (err, result) => {
            connection.release();
            if (err) {
              console.error('Error deleting user from user table:', err);
              res.status(500).send('Internal Server Error');
              return;
            }
            console.log('User deleted successfully');
            res.sendStatus(204);
          });
        });
      });
    });
  } catch (error) {
    console.error('Error deleting user:', error);
    res.sendStatus(500);
  }
}

async function updatePassword(req, res) {
  try {
    const username = req.params.username;
    const currentPassword = req.body.password;
    const newPassword = req.body.newPassword


    pool.getConnection(async (err, connection) => {
      if (err) throw err;

      const selectUserSql = 'SELECT * FROM user WHERE username = ?';
      connection.query(selectUserSql, [username], async (err, result) => {
        if (err) {
          connection.release();
          console.error('Error selecting user:', err);
          res.status(500).send('Internal Server Error');
          return;
        }

        if (result.length === 0) {
          connection.release();
          console.log('User not found');
          res.sendStatus(404);
          return;
        }

        const hashedPassword = result[0].password;
        const passwordMatch = await bcrypt.compare(currentPassword, hashedPassword);

        if (!passwordMatch) {
          connection.release();
          console.log('Incorrect current password');
          res.sendStatus(401);
          return;
        }

        const newHashedPassword = await bcrypt.hash(newPassword, 10);
        const updatePasswordSql = 'UPDATE user SET password = ? WHERE username = ?';

        connection.query(updatePasswordSql, [newHashedPassword, username], (err, result) => {
          connection.release();
          if (err) {
            console.error('Error updating user password:', err);
            res.status(500).send('Internal Server Error');
            return;
          }
          console.log('Password updated successfully');
          res.sendStatus(204);
        });
      });
    });
  } catch (error) {
    console.error('Error updating password:', error);
    res.sendStatus(500);
  }
}

module.exports = {
  createUser,
  login,
  registerUser,
  checkEligibility,
  getUserInfo,
  updatePassword,
  updateUser,
  deleteUser
};
