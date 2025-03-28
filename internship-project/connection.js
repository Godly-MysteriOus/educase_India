const config = require('./config');
const mysql = require('mysql2');
const connObj = {
    host : config.connectionURI,
    port : config.port,
    user : config.user,
    password : config.password,
    database : config.dbName,
};
const dbConnection = mysql.createConnection(connObj);

exports.devDB = (app,port)=>{
    dbConnection.connect((err)=>{
        if(err){
            console.log(err.stack);
        }else{
            console.log('connection successful');
            app.listen(port);
        }
    });
}
    

