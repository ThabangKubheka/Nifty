const mysql = require('mysql');

const config = {
  host: 'localhost',
  port: 3306,
  database: 'NIFTY',
  user: 'Thabang',
  password: 'Swazi'
};

async function testDatabaseConnection() {
  try {
    const connection = mysql.createConnection(config);

    connection.connect((err) => {
      if (err) {
        console.error('Error connecting to MySQL database:', err.stack);
        return;
      }
      console.log('Connected to MySQL database');
      connection.end((err) => {
        if (err) {
          console.error('Error closing MySQL connection:', err.stack);
          return;
        }
        console.log('Connection closed');
      });
    });
  } catch (err) {
    console.error('Error:', err.message);
  }
}

testDatabaseConnection();
