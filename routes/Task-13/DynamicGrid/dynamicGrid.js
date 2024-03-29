require('dotenv').config();
const express = require('express');
const router = express.Router();
const connection = require('../../../connection.js');

const authenticateToken = require('../../../services/Authentication.js');

var ObjectData = {
    errorInEnterInput : "",
    erroInDataFound: "",
    data: []
}

router.get('/task13_form',authenticateToken.authenticateToken,(req,res)=>{
    ObjectData.errorInEnterInput = "";
    ObjectData.erroInDataFound = ""; 
    ObjectData.query = "";
    ObjectData.querybeforelimit = "";
    ObjectData.data = []; 
    res.render('Task-13/dynamicGrid',{
        ObjectData:ObjectData
    });
});


router.post('/task13_dynamicgrid',(req,res)=>{
    let queryInput = req.body.inputquery;
    const urlPath = req.path;
    const currentPage = req.query.page || 1;
    
    ObjectData.querybeforelimit = queryInput;


    let totalPage = 0;
        connection.query(queryInput,(err,result)=>{
            if(result !== undefined){
                totalPage = result.length / process.env.RECORS_IN_SINGLEPAGE;
            }
        });    
    
    const queryInputSplit = queryInput.split(";");

    const offset = process.env.RECORS_IN_SINGLEPAGE * (currentPage - 1);

    const limit = " "+"LIMIT"+" "+offset+","+process.env.RECORS_IN_SINGLEPAGE+";";
    
    queryInput = queryInputSplit[0].trim() + limit;
    // console.log(queryInput);
    ObjectData.query = queryInput;
    ObjectData.urlPath = urlPath;


    if(queryInputSplit[0].length === 0){
        ObjectData.errorInEnterInput = "Please Enter Query.."
        ObjectData.erroInDataFound = "";  
        res.render('dynamicGrid',{
            ObjectData : ObjectData,
            pageCount: totalPage,
                pageSize: +process.env.RECORS_IN_SINGLEPAGE,
                currentPage: +currentPage 
        });
    }else{
            connection.query(queryInput,(err,result)=>{
                try{
                    if(err) throw err
                    ObjectData.data = result;
                    ObjectData.errorInEnterInput = "";
                    ObjectData.erroInDataFound = ""; 
                    if(result.length === 0){
                        ObjectData.erroInDataFound = "Data Not Found...";  
                    } 
                    res.render('Task-13/dynamicGrid',{
                        ObjectData:ObjectData,
                        pageCount: totalPage,
                        pageSize: +process.env.RECORS_IN_SINGLEPAGE,
                        currentPage: +currentPage 
                    });
                }catch(err){
                    console.log("Data Not Found"); 
                    ObjectData.erroInDataFound = "Data Not Found..";  
                    ObjectData.errorInEnterInput = "";
                    ObjectData.data = result;     
                    res.render('dynamicGrid',{
                        ObjectData:ObjectData
                    });     
                }
            });
    }
});

// --------------------get request--------------------
router.get('/task13_dynamicgrid',(req,res)=>{
    let queryInput = req.query.querystring;
    // console.log(queryInput);

    const urlPath = req.path;
    const currentPage = req.query.page || 1;

    const queryInputSplit = queryInput.split("LIMIT");
    ObjectData.querybeforelimit = queryInputSplit[0];
    let totalPage = 0;
        connection.query(queryInputSplit[0].trim()+";",(err,result)=>{
            if(result !== undefined){
                totalPage = result.length/process.env.RECORS_IN_SINGLEPAGE;
            }
        });


    const offset = process.env.RECORS_IN_SINGLEPAGE * (currentPage - 1);
    const limit = " "+"LIMIT"+" "+offset+","+process.env.RECORS_IN_SINGLEPAGE+";";
    queryInput = queryInputSplit[0].trim() + limit;
    // console.log(queryInput);
    // console.log("get"+queryInput);
    // console.log(urlPath);
    ObjectData.query = queryInput;
    ObjectData.urlPath = urlPath;

    if(queryInput.length === 0){
        ObjectData.errorInEnterInput = "Please Enter Query.."
        ObjectData.erroInDataFound = "";  
        res.render('Task-13/dynamicGrid',{
            ObjectData : ObjectData,
            pageCount: totalPage,
            pageSize: +process.env.RECORS_IN_SINGLEPAGE,
            currentPage: +currentPage 
        });
        // console.log("yes");
    }else{
            connection.query(queryInput,(err,result)=>{
                try{
                    if(err) throw err
                    ObjectData.data = result;
                    ObjectData.errorInEnterInput = "";
                    ObjectData.erroInDataFound = ""; 
                    if(result.length === 0){
                        ObjectData.erroInDataFound = "Data Not Found...";  
                    } 
                    res.render('Task-13/dynamicGrid',{
                        ObjectData:ObjectData,
                        pageCount: totalPage,
                        pageSize: +process.env.RECORS_IN_SINGLEPAGE,
                        currentPage: +currentPage 
                    });
                }catch(err){
                    console.log("Data Not Found"); 
                    ObjectData.erroInDataFound = "Data Not Found..";  
                    ObjectData.errorInEnterInput = "";
                    ObjectData.data = result;     
                    res.render('Task-13/dynamicGrid',{
                        ObjectData:ObjectData
                    });     
                }
            });
    }
});

//not in use
router.get('/task13_paggination',(req,res)=>{
    const currentPage = req.query.page || 1;
    const urlPath = req.path;
    ObjectData.urlPath = urlPath;
    // console.log(ObjectData.urlPath);
    res.render('Task-13/pagginationComponent',{
        ObjectData:ObjectData,
        pageCount: +process.env.TOTAL_PAGE,
                pageSize: +process.env.RECORS_IN_SINGLEPAGE,
                currentPage: +currentPage  
    });
});

//---------------------------------------
// SELECT ExamResult.student_id,StudentDetails.studentname,SUM(ExamResult.theoryObtainMark) as theoryObtainMarkTerminal,SUM(ExamResult.practicalObtainMark) as practicalObtainMarkTerminal FROM ExamResult LEFT JOIN StudentDetails ON ExamResult.student_id = StudentDetails.student_id WHERE exam_id = 2 GROUP BY student_id,studentname;

module.exports = router;

