require('dotenv').config();
const express = require('express');
const router = express.Router();
const path = require('path');
const connection = require('../../../connection.js');

var totalRecords = 0;

router.get('/task10_studentDetailswithpaggination',(req,res,next)=>{

    // let totalRow = "SELECT count(*) FROM StudentMaster";

    const currentPage = req.query.page || 1;
    const sortingColumn = req.query.orderby;
    const orderbytype = req.query.orderbytype;
    // console.log(typeof sortingColumn);
    let arrayofHeader = ["Student ID","StudentName","Email","PhoneNumber","Gender","Address1","Address2",
                            "City","State","ZipCode"];

    let queryForRecordsCount = "SELECT COUNT(*) FROM StudentMaster";

    connection.query(queryForRecordsCount,(err,result)=>{
        try{
            if(err) throw err
            totalRecords = result;
           
            // console.log(totalRecords);
        }catch(err){
            console.log("Error In Records Count: "+err);
        }
    });

    const offset = process.env.RECORS_IN_SINGLEPAGE * (currentPage - 1);
    
    if(typeof sortingColumn !== "undefined"){
        const queryOrderBy = "SELECT * FROM StudentMaster ORDER BY"+" "+sortingColumn+" "+orderbytype+" LIMIT"+" "+offset+","
                     +process.env.RECORS_IN_SINGLEPAGE;
        connection.query(queryOrderBy,(err,result)=>{
        try{
            if(err) throw err
            res.render('Task-10/studentdataingridwithpaggination_exercise2/pagginationwithcomponent', { arrayUser : result,
                arrayofHeader: arrayofHeader,
                pageCount: +process.env.TOTAL_PAGE,
                pageSize: +process.env.RECORS_IN_SINGLEPAGE,
                currentPage: +currentPage,       //currentPage convert into number using + 
                sortingColumn: sortingColumn,
                orderbytype : orderbytype
             });
        }catch(err){
            console.log("Error In Sorting: "+err);
        }
    });
    }else{
        let query = "SELECT * FROM StudentMaster LIMIT"+" "+offset+","+process.env.RECORS_IN_SINGLEPAGE;
    
    
    connection.query(query,(err,result)=>{
        try{
            if(err) throw err
            res.render('Task-10/studentdataingridwithpaggination_exercise2/pagginationwithcomponent', { arrayUser : result,
                                       arrayofHeader: arrayofHeader,
                                       pageCount: +process.env.TOTAL_PAGE,
                                       pageSize: +process.env.RECORS_IN_SINGLEPAGE,
                                       currentPage: +currentPage,      //currentPage convert into number using +
                                       sortingColumn: sortingColumn
                                    });
        }catch(err){
            console.log("Error In Get Student Detail: "+err);
        }
    });

    }
    
});




// router.get('/pagginationcomponent',(req,res)=>{
//     let queryForRecordsCount = "SELECT COUNT(*) FROM StudentMaster LIMIT 50000";

//     connection.query(queryForRecordsCount,(err,result)=>{
//         try{
//             if(err) throw err
//             totalRecords = result;
//             const currentPage = req.query.page || 1;
//             // console.log(totalRecords);
//             res.render('pagginationcomponent',{
//                 pageCount: +process.env.TOTAL_PAGE,
//                 pageSize: +process.env.RECORS_IN_SINGLEPAGE,
//                 currentPage: +currentPage       //currentPage convert into number using +
//             });
//         }catch(err){
//             console.log("Error In Records Count: "+err);
//         }
//     });
// });

module.exports = router;