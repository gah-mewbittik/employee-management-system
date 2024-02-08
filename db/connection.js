const mysql = require("mysql2");

const connection = mysql.create.connection({
    host: 'localhost',
    user: DB_USER,
    password: DB_PASSWORD,
    database: DB_NAME
});

connection.connect(function(err){
    if(err) throw err;
});

module.exports = connection;