require('dotenv').config();
const express = require('express');
const router = express.Router();
const connection = require('../../../connection.js');

const authenticateToken = require('../../../services/Authentication.js');


router.get('/task11_studentAttandance',authenticateToken.authenticateToken,async (req,res)=>{ 
    const month = Number(req.query.month) || 1;
    var currentPage = req.query.page || 1;
    const offset = process.env.RECORS_IN_SINGLEPAGE * (currentPage - 1);
    const orderyColumn = req.query.orderby;
    const orderbytype = req.query.orderbytype || "ASC";
    let year = "2023";
    let monthnumber = "12";

    var totalRecords = 0;
    const querycountrecord = "SELECT COUNT(*) as numberofstudent FROM StudentDetails;"

    await new Promise((resolve,reject)=>{
        connection.query(querycountrecord,(err,resultcount)=>{
            try{
                if(err) throw err
                totalRecords = resultcount[0].numberofstudent;
                resolve();
            }catch(err){
                reject();
            }
        });
    });

    let nextorderbytype = "ASC";
    if(orderbytype === "ASC"){
        nextorderbytype = "DESC"
    }else{
        nextorderbytype = "ASC"
    }

    //calculate number of dayes in particular month and year
    var monthdays=0;
    function getDate(month,year){
        let date = new Date(year,month,1);
        var days = [];

        while(date.getMonth() === month){
            monthdays++;
            days.push(new Date(date));
            date.setDate(date.getDate() + 1);
        }
        return monthdays;
    }

    if(month === 1){
        year = "2023";
        monthnumber = "12";
        monthdays = getDate(11,2023);
        // console.log("Dec"+monthdays);
    }else if(month === 2){
        year = "2024";
        monthnumber = "01";
        monthdays = getDate(0,2024);
        // console.log("jan"+monthdays);
    }else if(month === 3){
        year = "2024";
        monthnumber = "02";
        monthdays = getDate(1,2024);
        // console.log("feb"+monthdays);
    }


    if(orderyColumn !== undefined && orderyColumn !== ""){
        var query = "SELECT StudentAttandanceRecord.student_id as student_id,StudentDetails.studentname as studentname,"+
    "count(*) as numberofattandance, CONCAT(ROUND(((count(*)*100)/"+monthdays+"),2),'%') as percentage"+" "+
    "FROM StudentAttandanceRecord"+" "+
    "INNER JOIN StudentDetails"+" "+
    "WHERE EXTRACT(YEAR from attandancedate)="+year+" "+"and EXTRACT(MONTH from attandancedate)="+monthnumber+" "+"and presentorabsent = 'P' and StudentDetails.student_id = StudentAttandanceRecord.student_id"+" "+
    "GROUP BY student_id"+" "+
    "ORDER BY "+orderyColumn+" "+orderbytype+" "+
    "LIMIT"+" "+offset+","+process.env.RECORS_IN_SINGLEPAGE;
    }else{
        var query = "SELECT StudentAttandanceRecord.student_id as student_id,StudentDetails.studentname as studentname,"+
        "count(*) as numberofattandance, CONCAT(ROUND(((count(*)*100)/"+monthdays+"),2),'%') as percentage"+" "+
        "FROM StudentAttandanceRecord"+" "+
        "INNER JOIN StudentDetails"+" "+
        "WHERE EXTRACT(YEAR from attandancedate)="+year+" "+"and EXTRACT(MONTH from attandancedate)="+monthnumber+" "+"and presentorabsent = 'P' and StudentDetails.student_id = StudentAttandanceRecord.student_id"+" "+
        "GROUP BY student_id"+" "+"LIMIT"+" "+offset+","+process.env.RECORS_IN_SINGLEPAGE;
    }

    connection.query(query,(err,result)=>{
        try{
            if(err) throw err
            res.render('Task-11/studentattendance_exercise3/studentAttandance',{
                studentAttandance : result,
                month:month,
                pageCount: + totalRecords / process.env.RECORS_IN_SINGLEPAGE,
                pageSize: + process.env.RECORS_IN_SINGLEPAGE,
                currentPage: +currentPage,
                orderby: orderyColumn,
                orderbytype:orderbytype,
                nextorderbytype:nextorderbytype
            });
            monthdays = 0;
        }catch(err){
            console.log("Error In student attandace: "+err);
        }
    });
});

router.get('/insertStudentAttandance', (req, res) => {

    // function date(){
    //     const year = ["2023","2024"];
    //     const month = ["12","01","02"];
    //     const monthDays = { "12" : 29,"01":31,"02":29};
    //     const dates = [];
    //     const date = {
    //         "2023":[{"12":"29"}],
    //         "2024":[{"01":"31"},{"02":"29"}]
    //     }
    //     // const date = new Date();
    // }
    // var count=0;
    // function getDate(month,year){
    //     let date = new Date(year,month,1);
    //     let yearmonthString = year.toString()+"-"+month;
    //     // var monthString = month.toString();
    //     var days = [];

    //     while(date.getMonth() === month){
    //         count++;
    //         days.push(new Date(date));
    //         date.setDate(date.getDate() + 1);
    //     }
    //     return count;
    // }
    // console.log(getDate(2023,12));

    function presentabsent(){
        const presentabsent = ["P","A"];
        let randomIndexForPresentAbsent = Math.floor(Math.random()*presentabsent.length);
        return presentabsent[randomIndexForPresentAbsent];
    }
    // let totalDates = 89;
    // let query = "SELECT count(*) as total FROM StudentDetails;";
    // connection.query(query, (err, result1) => {
    //     try {
    //         if (err) throw err
    //         console.log(result1);
    //         for (let i = 0; i < result1; i++) {
    //             for(let j=0;j<totalDates;j++){
    //                 let queryStudentId = "SELECT student_id FROM StudentDetails;";
    //                 connection.query(queryStudentId, (err, result2) => {  //result2 give student id
    //                     let queryStudentAttandanceInsert = "INSERT INTO StudentAttandanceRecord(student_id,presentorabsent) " +
    //                         "VALUES(?,?,?);";
    //                     connection.query(queryStudentAttandanceInsert, [result2,presentabsent()],(err, result3) => {
    //                         console.log("Insert");
    //                     });
    //                 });
    //             }
    //         }
            
    //     } catch (err) {
    //         console.log("Error In Student Count: " + err);
    //     }
    // });

    //---------------------------------------------
    // for (let i = 0; i < 200; i++) {
    //                 for(let j=0;j<89;j++){
    //                     let queryStudentAttandanceInsert = "INSERT INTO StudentAttandanceRecord(student_id,presentorabsent) " +
    //                             "VALUES(?,?);";
    //                     connection.query(queryStudentAttandanceInsert,[i+1,presentabsent()],(err,result)=>{
    //                         try{
    //                             if(err) throw err
                                
    //                         }catch(err){
    //                             console.log("Insert "+err);
    //                         }
    //                     });
    //                 }
    //             }

                for (let i = 0; i < 200; i++) {
                    for(let j=0;j<89;j++){
                        let queryStudentAttandanceInsert = "INSERT INTO StudentAttandanceRecord(student_id,presentorabsent) " +
                                "VALUES(?,?);";
                        connection.query(queryStudentAttandanceInsert,[i+1,presentabsent()],(err,result)=>{
                            try{
                                if(err) throw err
                                
                            }catch(err){
                                console.log("Insert "+err);
                            }
                        });
                    }
                }
    res.send();
});


module.exports = router;