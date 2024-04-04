require('dotenv').config();
const express = require('express');
const router = express.Router();

const authenticateToken = require('../../services/Authentication.js');
const connection = require('../../connection.js');
const studentdetails = require('../../controller/Task-9_studentdetails/studentdetails.js');
const studentdetailswithpaggination = require('../../controller/Task-10_studentdetailswithpaggination/studentdetailswithpaggination.js');
const studentattandancereport = require('../../controller/Task-11_studentattadancereport/studentattandancereport.js');
const studentresultreport = require('../../controller/Task-12_studentresultreport/studentresultreport.js');

const { dynamicgridform,dynamicgridget,dynamicgridpost } = require('../../controller/Task-13_dynamicgrid/dynamicgrid.js');

const { delimetersearchget,delimetersearchpost } = require('../../controller/Task-14_delimetersearch/delimetersearch.js');


const jobapplicationformget = require('../../controller/Task-15_jobapplicationform/jobapplicationforminsert/jobapplicationform.js');
const jobapplicationsubmit = require('../../controller/Task-15_jobapplicationform/jobapplicationforminsert/jobapplicationformsubmit.js');

const jobapplicationformupdategetpost = require('../../controller/Task-15_jobapplicationform/jobapplicationformupdate/jobapplicationformupdate.js');

const jobapplicationformupdatesubmitpost = require('../../controller/Task-15_jobapplicationform/jobapplicationformupdate/jobapplicationformsubmitupdate.js');


const jobapplicationformdatabackend = require('../../controller/Task-15_jobapplicationform/joapplicationformbackend/jobapplicationformdatabackend.js');


//------Task 16 ajax jobapplicationform
const { jobapplicationformajax,jobapplicationformajaxstate } = require('../../controller/Task-16_jobapplicationformajax/jobapplicationformajaxinsert/jobapplicationformajax.js')

const jobapplicationformajaxsubmit = require('../../controller/Task-16_jobapplicationformajax/jobapplicationformajaxinsert/jobapplicationformajaxsubmit.js');

const jobapplicationformajaxupdate = require('../../controller/Task-16_jobapplicationformajax/jobapplicationformajaxupdate/jobapplicationformajaxupdate.js');

const jobapplicationformajaxsubmitupdate = require('../../controller/Task-16_jobapplicationformajax/jobapplicationformajaxupdate/jobapplicationformajaxsubmitupdate.js');


//----Task 18 Timezone Converter
const { timezone,citytimezone} = require('../../controller/Task-18_timezoneconverter/timezoneconverter.js');


//----------Task-1 Javascript Events List
router.get('/task1_javascriptevents',authenticateToken.authenticateToken,(req,res)=>{
    return res.render('Task-1/JavaScriptEvents');
});


//---------Task-2 Dynamic table create
router.get('/task2_dynamictable',authenticateToken.authenticateToken,(req,res)=>{
    return res.render('Task-2/Query Selector/TableQuerySelector');
});


//--------Task-3 Kuku Cude
router.get('/task3_kukucube',authenticateToken.authenticateToken,(req,res)=>{
    return res.render('Task-3/Practice_Task-3');
});

//---------Task-4 Tic Tac Toe
router.get('/task4_tictactoe',authenticateToken.authenticateToken,(req,res)=>{
    return res.render('Task-4/Practice_Task-4');
});

//--------Task-5 Sorting
router.get('/task5_sorting',authenticateToken.authenticateToken,(req,res)=>{
    return res.render('Task-5/Practice_Task-5');
});


//--------Task-6 ehya(HTML,CSS,JavaScript)
router.get('/task6_ehya',authenticateToken.authenticateToken,(req,res)=>{
    return res.render('Task-6/ehya');
});

//-------Task-7 Awan Hoster(HTML,CSS,JavaScript)
router.get('/task7_awanhoster',authenticateToken.authenticateToken,(req,res)=>{
    return res.render('Task-7/Awan_Hoster');
}); 

//-------Task-8 Hire.X (HTML,CSS,JavaScript)
router.get('/task8_hirex',authenticateToken.authenticateToken,(req,res)=>{
    return res.render('Task-8/HireX');
});

//-------Task-9 student list
router.get('/task9_studentDetails',authenticateToken.authenticateToken,studentdetails);

//-------Task-10 studentlist with paggination

router.get('/task10_studentDetailswithpaggination',authenticateToken.authenticateToken,studentdetailswithpaggination);


//-------Task-11 student attandance report
router.get('/task11_studentAttandance',authenticateToken.authenticateToken,studentattandancereport);

//-------Task-12 student result report
router.get('/task12_studentResult',authenticateToken.authenticateToken,studentresultreport);

//-------Task-13 dynamic grid

router.get('/task13_form',authenticateToken.authenticateToken,dynamicgridform);

router.get('/task13_dynamicgrid',dynamicgridget);

router.post('/task13_dynamicgrid',dynamicgridpost);

//-------Task-14 Delimeter Search

router.get('/task14_delimetersearch',authenticateToken.authenticateToken,delimetersearchget);

router.post('/task14_delimetersearch',authenticateToken.authenticateToken,delimetersearchpost);


//------Task-15 jobapplication form

router.get('/task16_jobform',authenticateToken.authenticateToken,(req, res) => {
    res.render('Task-16/JobApplicationForm_exercise8_view/jobapplicationformhomepage');
});

//get all student data
router.get('/allstudentlist', authenticateToken.authenticateToken,(req, res) => {
    const studentdataretrive = `SELECT candidate_id as StudentId,firstname as FirstName,lastname as LastName,email as Email
    FROM basicdetails WHERE candidate_id > 159`;
    connection.query(studentdataretrive,(err,result)=>{
        // console.log(result);
        return res.json(result);
    });
});


//----insert
router.get('/jobapplicationform',authenticateToken.authenticateToken,jobapplicationformget);

router.post('/jobapplicationformsubmit',jobapplicationformdatabackend.jobapplicationformdatabackend,jobapplicationsubmit);

//----update
router.get('/jobapplicationformupdate',authenticateToken.authenticateToken,jobapplicationformupdategetpost);

router.post('/jobapplicationformupdatesuccessfully', jobapplicationformdatabackend.jobapplicationformdatabackend,jobapplicationformupdatesubmitpost);


//-----Task-16 Job Application Form With AJAX

router.get('/task17_jobformajax',authenticateToken.authenticateToken,(req,res)=>{
    return res.render('Task-17/JobApplicationForm_exercise1_view/studentlist');
});

//get all student data
router.get('/studentlistajax', authenticateToken.authenticateToken,(req, res) => {
    const studentdataretrive = `SELECT candidate_id as StudentId,firstname as FirstName,lastname as LastName,email as Email
    FROM basicdetails where candidate_id > 159`;
    connection.query(studentdataretrive,(err,result)=>{
        // console.log(result);
        return res.json(result);
    });
});


//----insert
router.get('/jobapplicationformajax',authenticateToken.authenticateToken,jobapplicationformajax);

router.post('/jobapplicationformajax',jobapplicationformajaxstate);

router.post('/jobapplicationformsubmitajax',jobapplicationformdatabackend.jobapplicationformdatabackend,jobapplicationformajaxsubmit);

//----update
router.get('/jobapplicationformupdateajax', authenticateToken.authenticateToken,jobapplicationformajaxupdate);

router.post('/jobapplicationformupdatesuccessfullyajax', jobapplicationformdatabackend.jobapplicationformdatabackend,jobapplicationformajaxsubmitupdate);


//----Task-17 JSON PLACE HOLDER 
router.get('/task18_jsonplaceholdertable',authenticateToken.authenticateToken,(req,res)=>{
    res.render('Task-18/Exercise1/jsonplaceholdertable');
});

router.get('/post',(req,res)=>{
    res.render('Task-18/Exercise1/post');
});

router.get('/comments',(req,res)=>{
    res.render('Task-18/Exercise1/post');
});

//----Task-18 Timezone Converter

router.get('/task19_timezone',authenticateToken.authenticateToken,timezone);

router.post('/citytimezone',citytimezone);
module.exports = router;