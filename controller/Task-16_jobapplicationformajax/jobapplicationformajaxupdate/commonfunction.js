const connection = require('../../../connection.js');

//----------
//return promise
function getstates() {
    return new Promise((resolve, reject) => {
        const getstates = `SELECT state_id as state_id,state_name as state FROM statemaster;`;
        connection.query(getstates, (err, result) => {
            try {
                if (err) throw err
                resolve(result);
            } catch (err) {
                reject(err);
            }
        });
    });
}

function getcity(){
    return new Promise((resolve,reject)=>{
        const city = "SELECT * from citymaster;";
        connection.query(city,(err,result)=>{
            if(err){
                reject(err);
            }else{
                resolve(result);
            }
        });
    });
}


//-------option name get from optionmaster table using selectmaster id
function optionmaster(select_id, column2, column3) {
    return new Promise((resolve, reject) => {
        const optionmaster = `SELECT s.select_name as selectname,o.option_id as ${column2},o.option_name as ${column3}
        FROM selectmaster as s
        LEFT JOIN optionmaster as o ON s.select_id=o.select_id
        WHERE o.select_id = ${select_id}`;

        connection.query(optionmaster, (err, result) => {
            if (err) {
                reject(err);
            } else {
                resolve(result);
            }
        });
    });
}


//in this padd optionname as array
function getoptionidwithname() {
    return new Promise((resolve, reject) => {

        const getoptionidwithname = `SELECT option_id as optionid,select_id as selectid,option_name as optionname 
        FROM optionmaster`;

        connection.query(getoptionidwithname, (err, result) => {
            if (err) {
                reject(err);
            } else {
                resolve(result);
            }
        });
    });
}

module.exports = { getstates,getcity,optionmaster,getoptionidwithname }