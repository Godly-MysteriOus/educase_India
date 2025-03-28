
const fetchRecordLimit = 10;
const transactionPool = require('../transactionPool');
const {validationResult} = require('express-validator');
exports.addSchool = async(req,res,next)=>{
    //check pass
    const error = validationResult(req);
    if(!error.isEmpty()){
        return res.status(400).json({
            success:false,
            message : error.array()[0].msg,
        })
    }
    try{
        const {schoolName, schoolAddress, schoolLocationLatitude,schoolLocationLongitude} = req.query;
        const [results] = await transactionPool.db().query(`
            INSERT INTO schools (name, address, latitude, longitude) VALUES (?, ?, ?, ?)`,
            [schoolName,schoolAddress,schoolLocationLatitude,schoolLocationLongitude]
        );
        res.status(200).json({
            success : true,
            message : 'School Added Successfully!',
        });
    }catch(err){
        let message;
        if(String(err.message).startsWith('Duplicate entry ')){
            message = 'School location already in use'; 
        }else{
            message = 'Error adding school';
        }
        res.status(400).json({
            success:false,
            message : message,
        });
    }
};

exports.listSchool = async(req,res,next)=>{
    const error = validationResult(req);
    if(!error.isEmpty()){
        res.status(400).json({
            success:false,
            message : error.array()[0].msg,
        });
    }
    // api Logic
    const {userLatitude,userLongitude} = req.query;
    try{
        const [result] = await transactionPool.db().query(`SELECT 
        id, name, address, latitude, longitude, 
        ( 6371 * ACOS( COS(RADIANS(?)) * COS(RADIANS(latitude)) * 
        COS(RADIANS(longitude) - RADIANS(?)) + SIN(RADIANS(?)) * 
        SIN(RADIANS(latitude)) ) ) AS distance 
        FROM schools 
        ORDER BY distance 
        LIMIT ${fetchRecordLimit};`,
        [parseFloat(userLatitude), parseFloat(userLongitude), parseFloat(userLatitude)]);
        return res.status(200).json({
            success:true,
            message : 'Successfully fetched data',
            data : result,
        })
    }catch(err){
        if(err){
            return res.status(400).json({
                success:false,
                message: 'Error loading school information',
            });
        }
    }
}