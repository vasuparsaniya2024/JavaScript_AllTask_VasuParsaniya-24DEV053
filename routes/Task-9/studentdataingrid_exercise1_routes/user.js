require('dotenv').config();
const express = require('express');
const router = express.Router();
const path = require('path');
const connection = require('../../../connection.js');


router.get('/task9_studentDetails',(req,res)=>{

    // let totalRow = "SELECT count(*) FROM StudentMaster";

    let query = "SELECT * FROM StudentMaster LIMIT 50000;";
    
    let arrayofHeader = ["Student ID","StudentName","Email","PhoneNumber","Gender","Address1","Address2","City","State","ZipCode"];
    connection.query(query,(err,result)=>{
        try{
            if(err) throw err
            res.render('Task-9/studentdataingrid_exercise1/userlist', { arrayUser : result,
                                       arrayofHeader: arrayofHeader });
        }catch(err){
            console.log("Error In Get Student Details: "+err);
        }
    });
});

module.exports = router;