const connection = require('../../connection.js');

function timezone(req,res){
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
}


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


async function citytimezone(req,res){
    const city = req.body.cityname;
    let cityarray = [];

    let getcitytemp = getcity().then((data)=>{
        cityarray.push(data);
    });
    
    await getcitytemp;

    console.log(cityarray);
    let date = new Date(); //current date
    let selectcitytime = date.toLocaleString("en-US", {timeZone: city});

    // console.log(date);
    // console.log(selectcitytime);

    return res.json({currenttime:`${date}`,selectcitytime:`${selectcitytime}`});
}

module.exports = { timezone,citytimezone }