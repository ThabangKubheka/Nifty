const sql = require('mssql');
//fix connection
const config = {
    user: '',
    password: '',
    server: '',
    database: '',
    options: {
      encrypt: false
    }
  };

const poolPromise = new sql.ConnectionPool(config)
  .connect()
  .then(pool => {
    console.log('Connected to MSSQL')
    return pool
  })
  .catch(err => console.log('Database Connection Failed! Bad Config: ', err))

module.exports = {
  sql, poolPromise
}