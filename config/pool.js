var mysql = require("mysql");

var pool = mysql.createPool({
	host: 'localhost',
	port: 3306,
	database: 'database-name',
	user: 'username',
	password: 'password'
});
module.exports = pool;