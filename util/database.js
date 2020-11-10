const mysql = require('mysql2');

const pool = mysql.createPool({
  host: 'localhost',
  user: 'wnortier',
  database: 'phonebook',
  password: 'wnortier',
});

module.exports = pool.promise();
