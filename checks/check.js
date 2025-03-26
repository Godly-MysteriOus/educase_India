const {check,query} = require('express-validator'); 

exports.addSchoolChecks = ()=>{
    return check('schoolName').custom(val=>{
        if(/[0-9]/.test(val)){
            throw new Error('Name cannot contain numbers');
        }else if(String(val).length <=10){
            throw new Error('School Name should be atleast 10 characters long');
        }
        return true;
    });
};
exports.schoolAddress = ()=>{
    return  check('schoolAddress').custom(val=>{
        if(!/[a-zA-Z]/.test(val)){
            throw new Error('Address should contain letters');
        }else if(String(val).length <=10){
            throw new Error('School Address should be atleast 10 characters long');
        }
        return true;
    });
}
exports.location = (coord)=>{
    return check(coord).custom(val=>{
        if(val==''){
            throw new Error(`${coord} field cannot be empty`);
        }else if(/[a-zA-Z]/.test(val)){
            throw new Error('Coordinates shall only be numeric');
        }else if(!/./.test(val)){
            throw new Error('Coordinates shall contain decimal pointer');
        }
        return true;
    })
}