require('dotenv').config({path:'./credentials.env'});


module.exports = {
    connectionURI : process.env.connection_url,
    port : process.env.port,
    user: process.env.user,
    password : process.env.password,
    dbName : process.env.name,


};
