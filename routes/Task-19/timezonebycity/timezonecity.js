const express = require('express');
const connection = require('../../../connection.js');
const { resolve } = require('path');
const router = express.Router();

const authenticateToken = require('../../../services/Authentication.js');

var cityarray = [];

function getcity(){
    return new Promise((resolve,reject)=>{
        const city = `SELECT zone_name as cityname from timezones`;

        connection.query(city,(err,result)=>{
            if(err){
                reject(err);
            }else{
                resolve(result);
            }
        });    
    });
}

var getcitytemp = getcity().then((data)=>{
    cityarray.push(data);
});

router.get('/task19_timezone',authenticateToken.authenticateToken,(req,res)=>{
    const city = `SELECT zone_name as cityname from timezones`;
        connection.query(city,(err,result)=>{
            try{
                if(err) throw err
                res.render('Task-19/timezonebycity/timezonecity',{
                    currenttime:"",
                    selectcitytime:"",
                    selectcity:"",
                    cityarray:result
                });
            }catch(err){
                console.log("Error In Get City: "+err);
            }
        });    
});


router.post('/citytimezone',async (req,res)=>{
    const city = req.body.cityname;

    await getcitytemp;

    console.log(cityarray);
    let date = new Date(); //current date
    let selectcitytime = date.toLocaleString("en-US", {timeZone: city});

    console.log(date);
    console.log(selectcitytime);

    return res.json({currenttime:`${date}`,selectcitytime:`${selectcitytime}`});

    // return res.render('timezonebycity/timezonecity',{
    //     currenttime:date,
    //     selectcitytime:selectcitytime,
    //     selectcity:city,
    //     cityarray:cityarray
    // });
});

module.exports = router;