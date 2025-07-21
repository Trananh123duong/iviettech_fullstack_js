
// file: config/db.js
const mysql = require('mysql2');

// Tạo một connection pool
const pool = mysql.createPool({
  host: 'localhost',               
  user: 'user',               
  password: 'user123',        
  database: 'test_db',        
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Sử dụng promise-based API
const promisePool = pool.promise();

// Xuất ra promisePool để sử dụng ở các file khác
module.exports = promisePool;
