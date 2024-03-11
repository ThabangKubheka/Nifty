const express = require("express");
const app = express();
const pool = require("./config/database"); // Assuming your database connection pool is exported from database.js

app.get("/test-db-connection", (req, res) => {
  pool.getConnection((err, connection) => {
    if (err) {
      console.error("Error connecting to database:", err);
      return res.status(500).json({ success: false, message: "Database connection error" });
    }
    
    connection.query("SELECT 1", (error, results) => {
      connection.release(); // Release the connection back to the pool
      if (error) {
        console.error("Error executing test query:", error);
        return res.status(500).json({ success: false, message: "Error executing test query" });
      }
      
      console.log("Database connection is good");
      return res.status(200).json({ success: true, message: "Database connection is good" });
    });
  });
});

const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log("Server is running on PORT:", port);
});
