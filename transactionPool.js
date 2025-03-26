const mysql = require('mysql2');
const config = require('./config');
const connObj = {
    host : config.connectionURI,
    user : config.user,
    password : config.password,
    database : config.dbName,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
  }
exports.db = ()=>{
    return mysql.createPool(connObj).promise();
}