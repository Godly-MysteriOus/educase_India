const connection = require('./connection');
const apiController = require('./controller/apiLogic');
const express = require('express');
const app = express();
const checks = require("./checks/check");

app.get('/addSchool',[
    checks.addSchoolChecks(),
    checks.schoolAddress(),
    checks.location('schoolLocationLatitude'),
    checks.location('schoolLocationLongitude'),
],apiController.addSchool);


app.get('/listSchools',[
    checks.location('userLatitude'),
    checks.location('userLongitude'),
],apiController.listSchool);


app.get('/',(req,res,next)=>{
    return res.status(200).json({
        success:false,
        message : 'Invalid URL Requested',
    });
});
connection.devDB(app,3100);

