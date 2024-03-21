const bcrypt = require('bcrypt');
const mysql = require('mysql');
const config = require('../../config/database');
const { generateToken } = require('../../auth/token_validation');
const winston = require('winston');

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
  transports: [
    new winston.transports.File({ filename: 'error.log', level: 'error' }),
    new winston.transports.File({ filename: 'combined.log' })
  ]
});

const pool = mysql.createPool(config);

async function createUser(req, res) {
  try {
    const username = req.body.username;
    const password = req.body.password;
    const hashedPassword = await bcrypt.hash(password, 10);

    pool.getConnection(async (err, connection) => {
      if (err) {
        handleDatabaseError(err, res);
        return;
      }

      const sqlSearch = "SELECT * FROM user WHERE username = ?";
      const search_query = mysql.format(sqlSearch, [username]);
      const sqlInsert = "INSERT INTO user VALUES (0,?,?)";
      const insert_query = mysql.format(sqlInsert, [username, hashedPassword]);

      await connection.query(search_query, async (err, result) => {
        if (err) {
          handleDatabaseError(err, res);
          return;
        }

        if (result.length != 0) {
          connection.release();
          logger.error("User already exists");
          res.sendStatus(409);
        } else {
          await connection.query(insert_query, (err, result) => {
            connection.release();
            if (err) {
              handleDatabaseError(err, res);
              return;
            }

            logger.info("Created new User");

            const token = generateToken({ username: username });
            res.json({ accessToken: token });
          });
        }
      });
    });
  } catch (error) {
    logger.error("Error creating user:", error);
    res.sendStatus(500);
  }
}

async function registerUser(req, res) {
  try {
    const { username, name, surname, email, cellphone, address } = req.body;

    pool.getConnection(async (err, connection) => {
      if (err) {
        handleDatabaseError(err, res);
        return;
      }

      const checkUserSql = 'SELECT * FROM userInfo WHERE username = ?';
      connection.query(checkUserSql, [username], async (err, results) => {
        if (err) {
          handleDatabaseError(err, res);
          return;
        }

        if (results.length === 0) {
          const insertUserSql = `INSERT INTO userInfo (username, name, surname, email, cellphone, address, status) VALUES (?, ?, ?, ?, ?, ?, true)`;
          connection.query(insertUserSql, [username, name, surname, email, cellphone, address], (err, result) => {
            connection.release();
            if (err) {
              handleDatabaseError(err, res);
              return;
            }
            logger.info('User registered successfully');
            res.sendStatus(201);
          });
        } else {
          const updateUserSql = `UPDATE userInfo SET name = ?, surname = ?, email = ?, cellphone = ?, address = ?, status = true WHERE username = ?`;
          connection.query(updateUserSql, [name, surname, email, cellphone, address, username], (err, result) => {
            connection.release();
            if (err) {
              handleDatabaseError(err, res);
              return;
            }
            logger.info('User information updated successfully');
            res.send('User information updated successfully');
          });
        }
      });
    });
  } catch (error) {
    logger.error('Error registering user:', error);
    res.sendStatus(500);
  }
}

async function checkEligibility(req, res) {
  try {
    const username = req.params.username;

    pool.getConnection(async (err, connection) => {
      if (err) {
        handleDatabaseError(err, res);
        return;
      }

      const sql = `SELECT status FROM userinfo WHERE username = ?`;

      await connection.query(sql, [username], async (err, result) => {
        connection.release();

        if (err) {
          handleDatabaseError(err, res);
          return;
        }

        if (result.length === 0) {
          logger.error("User does not exist", result);
          res.sendStatus(404);
        } else {
          const status = result[0].status;
          res.json({ status });
        }
      });
    });
  } catch (error) {
    logger.error("Error checking eligibility:", error);
    res.sendStatus(500);
  }
}

async function getUserInfo(req, res) {
  try {
    const username = req.params.username;

    pool.getConnection(async (err, connection) => {
      if (err) {
        handleDatabaseError(err,
          res.status(500).send('Internal Server Error'));
        return;
      }

      const sql = `CALL GetUserInformation(?)`;

      await connection.query(sql, [username], async (err, results) => {
        connection.release();

        if (err) {
          handleDatabaseError(err, res);
          return;
        }

        if (results.length > 0 && results[0][0]) {
          const userInfo = results[0][0];
          res.json(userInfo);
        } else {
          res.status(404).json({ error: 'User not found' });
        }
      });
    });
  } catch (error) {
    logger.error("Error getting user info:", error);
    res.sendStatus(500);
  }
}

async function login(req, res) {
  try {
    const username = req.body.username;
    const password = req.body.password;

    pool.getConnection(async (err, connection) => {
      if (err) {
        handleDatabaseError(err, res);
        return;
      }

      const sqlSearch = "SELECT * FROM user WHERE username = ?";
      const search_query = mysql.format(sqlSearch, [username]);

      await connection.query(search_query, async (err, result) => {
        connection.release();

        if (err) {
          handleDatabaseError(err, res);
          return;
        }

        if (result.length == 0) {
          logger.error("User does not exist");
          res.sendStatus(404);
        } else {
          const hashedPassword = result[0].password;

          if (await bcrypt.compare(password, hashedPassword)) {
            logger.info("Login Successful");
            logger.info("Generating accessToken");
            const token = generateToken({ username: username });
            res.json({ accessToken: token });
          } else {
            logger.error("Password Incorrect");
            res.send("Password incorrect!");
          }
        }
      });
    });
  } catch (error) {
    logger.error("Error logging user:", error);
    res.sendStatus(500);
  }
}

async function updateUser(req, res) {
  try {
    const { username } = req.params;
    const { name, surname, email, cellphone, address } = req.body;

    pool.getConnection(async (err, connection) => {
      if (err) {
        handleDatabaseError(err, res);
        return;
      }

      const updateUserSql = `
          UPDATE userInfo
          SET name = ?, surname = ?, email = ?, cellphone = ?, address = ?
          WHERE username = ?
        `;
      connection.query(updateUserSql, [name, surname, email, cellphone, address, username], (err, result) => {
        connection.release();
        if (err) {
          handleDatabaseError(err, res);
          return;
        }
        logger.info('User information updated successfully');
        res.sendStatus(204);
      });
    });
  } catch (error) {
    logger.error('Error updating user:', error);
    res.sendStatus(500);
  }
}

async function deleteUser(req, res) {
  try {
    const username = req.params.username;
    const password = req.body.password;

    pool.getConnection(async (err, connection) => {
      if (err) {
        handleDatabaseError(err, res);
        return;
      }

      const selectUserSql = 'SELECT * FROM user WHERE username = ?';
      await connection.query(selectUserSql, [username], async (err, result) => {
        if (err) {
          handleDatabaseError(err, res);
          return;
        }

        if (result.length === 0) {
          connection.release();
          logger.error('User not found');
          res.sendStatus(404);
          return;
        }

        const hashedPassword = result[0].password;
        const passwordMatch = await bcrypt.compare(password, hashedPassword);

        if (!passwordMatch) {
          connection.release();
          logger.error('Incorrect password');
          res.sendStatus(401);
          return;
        }

        const deleteUserInfoSql = 'DELETE FROM userInfo WHERE username = ?';
        const deleteUserSql = 'DELETE FROM user WHERE username = ?';

        await connection.query(deleteUserInfoSql, [username], (err, result) => {
          if (err) {
            handleDatabaseError(err, res);
            return;
          }

          connection.query(deleteUserSql, [username], (err, result) => {
            connection.release();
            if (err) {
              handleDatabaseError(err, res);
              return;
            }
            logger.info('User deleted successfully');
            res.sendStatus(204);
          });
        });
      });
    });
  } catch (error) {
    logger.error('Error deleting user:', error);
    res.sendStatus(500);
  }
}

async function updatePassword(req, res) {
  try {
    const username = req.params.username;
    const currentPassword = req.body.password;
    const newPassword = req.body.newPassword;

    pool.getConnection(async (err, connection) => {
      if (err) {
        handleDatabaseError(err, res);
        return;
      }

      const selectUserSql = 'SELECT * FROM user WHERE username = ?';
      connection.query(selectUserSql, [username], async (err, result) => {
        if (err) {
          handleDatabaseError(err, res);
          return;
        }

        if (result.length === 0) {
          connection.release();
          logger.error('User not found');
          res.sendStatus(404);
          return;
        }

        const hashedPassword = result[0].password;
        const passwordMatch = await bcrypt.compare(currentPassword, hashedPassword);

        if (!passwordMatch) {
          connection.release();
          logger.error('Incorrect current password');
          res.sendStatus(401);
          return;
        }

        const newHashedPassword = await bcrypt.hash(newPassword, 10);
        const updatePasswordSql = 'UPDATE user SET password = ? WHERE username = ?';

        connection.query(updatePasswordSql, [newHashedPassword, username], (err, result) => {
          connection.release();
          if (err) {
            handleDatabaseError(err, res);
            return;
          }
          logger.info('Password updated successfully');
          res.sendStatus(204);
        });
      });
    });
  } catch (error) {
    logger.error('Error updating password:', error);
    res.sendStatus(500);
  }
}

function handleDatabaseError(err, res) {
  logger.error('Error getting database connection:', err);
  res.status(500).send('Internal Server Error');
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
