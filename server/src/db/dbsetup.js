const fs = require("fs");
const mysql = require("mysql2");

// Create a connection to the database
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "password",
  database: "stock_analysis_react_router",
});

// Read SQL commands from db.sql file
const sqlFilePath = "db.sql";
fs.readFile(sqlFilePath, "utf8", (err, sqlCommands) => {
  if (err) {
    console.error("Error reading SQL file:", err);
    return;
  }

  // Connect to the database
  connection.connect((err) => {
    if (err) {
      console.error("Error connecting to database:", err);
      return;
    }

    console.log("Connected to the database.");

    // Execute SQL commands from db.sql
    connection.query(sqlCommands, (err, results) => {
      if (err) {
        console.error("Error executing SQL commands:", err);
      } else {
        console.log("SQL commands executed successfully.");
      }

      // Close the connection
      connection.end((err) => {
        if (err) {
          console.error("Error closing the connection:", err);
        } else {
          console.log("Database connection closed.");
        }
      });
    });
  });
});
