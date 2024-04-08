require('dotenv').config();
const express = require('express');
const router = express.Router();

const authenticateToken = require('../../services/Authentication.js');
const connection = require('../../connection.js');

//-------registration, login, forgotpassword
const logindetailsbackend = require('../../controller/login/loginbackend.js');
const userlogin = require('../../controller/login/login.js');

const backendvalidation = require('../../controller/registration/registrationbackend.js');
const passwordbackendvalidation = require('../../controller/registration/passwordbackend.js');

//---registration
const { userregistration, checkactivationlink, regenerateactivationcode, passwordinsert } = require('../../controller/registration/registration.js');


//----forgotpassword
const forgotpasswordbackendvalidation = require('../../controller/forgotpassword/forgotpasswordbackend.js');

const { forgotpassword, updatepassword } = require('../../controller/forgotpassword/forgotpassword.js');
//----listtask
const listtask = require('../../controller/HomePage/Home.js');

const javascriptevents = require('../../controller/Task-1_javascriptevents/javascriptEvents.js');
const dynamictable = require('../../controller/Task-2_dynamictable/dynamicTable.js');
const kukucube = require('../../controller/Task-3_kukucube/kukuCube.js');
const tictactoe = require('../../controller/Task-4_tictactoe/ticTacToe.js');
const sortingalgorithm = require('../../controller/Task-5_sortingalgorithm/sortingAlgorithm.js');
const ehya = require('../../controller/Task-6_ehya/ehya.js');
const awanhoster = require('../../controller/Task-7_awanhoster/awanHoster.js');
const hirex = require('../../controller/Task-8_hirex/hirex.js');


const studentdetails = require('../../controller/Task-9_studentdetails/studentdetails.js');
const studentdetailswithpaggination = require('../../controller/Task-10_studentdetailswithpaggination/studentdetailswithpaggination.js');

const studentattandancereport = require('../../controller/Task-11_studentattadancereport/studentattandancereport.js');
const studentresultreport = require('../../controller/Task-12_studentresultreport/studentresultreport.js');

const { dynamicgridform, dynamicgridget, dynamicgridpost } = require('../../controller/Task-13_dynamicgrid/dynamicgrid.js');

const { delimetersearchget, delimetersearchpost } = require('../../controller/Task-14_delimetersearch/delimetersearch.js');


//----Task-15 jobapplication form
const { jobapplicationformhomepage, allstudentlist } = require('../../controller/Task-15_jobapplicationform/commonfunction.js');
const jobapplicationformget = require('../../controller/Task-15_jobapplicationform/jobapplicationforminsert/jobapplicationform.js');
const jobapplicationsubmit = require('../../controller/Task-15_jobapplicationform/jobapplicationforminsert/jobapplicationformsubmit.js');

const jobapplicationformupdategetpost = require('../../controller/Task-15_jobapplicationform/jobapplicationformupdate/jobapplicationformupdate.js');

const jobapplicationformupdatesubmitpost = require('../../controller/Task-15_jobapplicationform/jobapplicationformupdate/jobapplicationformsubmitupdate.js');


const jobapplicationformdatabackend = require('../../controller/Task-15_jobapplicationform/joapplicationformbackend/jobapplicationformdatabackend.js');


//------Task 16 ajax jobapplicationform
const { jobapplicationformajax, jobapplicationformajaxstate } = require('../../controller/Task-16_jobapplicationformajax/jobapplicationformajaxinsert/jobapplicationformajax.js')

const { studentlistajax, allstudentlistajax } = require('../../controller/Task-16_jobapplicationformajax/commonfunction.js');

const jobapplicationformajaxsubmit = require('../../controller/Task-16_jobapplicationformajax/jobapplicationformajaxinsert/jobapplicationformajaxsubmit.js');

const jobapplicationformajaxupdate = require('../../controller/Task-16_jobapplicationformajax/jobapplicationformajaxupdate/jobapplicationformajaxupdate.js');

const jobapplicationformajaxsubmitupdate = require('../../controller/Task-16_jobapplicationformajax/jobapplicationformajaxupdate/jobapplicationformajaxsubmitupdate.js');


//----Task-17 Json PlaceHolder
const { jsonplaceholder, posts } = require('../../controller/Task-17_jsonplaceholder/jsonplaceholder.js');

//----Task 18 Timezone Converter
const { timezone, citytimezone } = require('../../controller/Task-18_timezoneconverter/timezoneconverter.js');


//-----Home Page
router.get('/', (req, res) => {
    res.render('homepage');
});

//-------Registration ,Login, Forgotpassword

//------registration
router.get('/userregistration', (req, res) => {
    res.render('registration/registration');
});

router.post('/userregistration', backendvalidation.useregistrationbackendvalidation, userregistration);

router.get('/checkactivationlink', (req, res) => {
    res.render('registration/linkactivation');
});

router.post('/checkactivationlink', checkactivationlink);

router.post('/regenerateactivationcode', regenerateactivationcode);

router.post('/passwordinsert', passwordbackendvalidation.passwordbackendvalidation, passwordinsert);


//---------login
router.get('/userlogin', (req, res) => {
    return res.render("login/login");
});

router.post('/userlogin', logindetailsbackend.logindetailsbackend, userlogin);


//-------forgotpassword
router.get('/forgotpassword', (req, res) => {
    res.render('forgotpassword/forgotpassword');
});

router.post('/forgotpassword', forgotpasswordbackendvalidation.forgotpasswordbackendvalidation, forgotpassword);


//this is for render page of forgotpassword
router.get('/forgotpasswordlink', (req, res) => {
    res.render('forgotpassword/linkactivationforgotpassword');
});


router.post('/updatepassword', updatepassword);

//-----list all task
router.get('/listtask', authenticateToken.authenticateToken, listtask);


//----------Task-1 Javascript Events List
router.get('/task1_javascriptevents', authenticateToken.authenticateToken, javascriptevents);


//---------Task-2 Dynamic table create
router.get('/task2_dynamictable', authenticateToken.authenticateToken, dynamictable);


//--------Task-3 Kuku Cude
router.get('/task3_kukucube', authenticateToken.authenticateToken, kukucube);

//---------Task-4 Tic Tac Toe
router.get('/task4_tictactoe', authenticateToken.authenticateToken, tictactoe);

//--------Task-5 Sorting
router.get('/task5_sorting', authenticateToken.authenticateToken, sortingalgorithm);


//--------Task-6 ehya(HTML,CSS,JavaScript)
router.get('/task6_ehya', authenticateToken.authenticateToken, ehya);

//-------Task-7 Awan Hoster(HTML,CSS,JavaScript)
router.get('/task7_awanhoster', authenticateToken.authenticateToken, awanhoster);

//-------Task-8 Hire.X (HTML,CSS,JavaScript)
router.get('/task8_hirex', authenticateToken.authenticateToken, hirex);

//-------Task-9 student list
router.get('/task9_studentDetails', authenticateToken.authenticateToken, studentdetails);

//-------Task-10 studentlist with paggination

router.get('/task10_studentDetailswithpaggination', authenticateToken.authenticateToken, studentdetailswithpaggination);


//-------Task-11 student attandance report
router.get('/task11_studentAttandance', authenticateToken.authenticateToken, studentattandancereport);

//-------Task-12 student result report
router.get('/task12_studentResult', authenticateToken.authenticateToken, studentresultreport);

//-------Task-13 dynamic grid

router.get('/task13_form', authenticateToken.authenticateToken, dynamicgridform);

router.get('/task13_dynamicgrid', dynamicgridget);

router.post('/task13_dynamicgrid', dynamicgridpost);

//-------Task-14 Delimeter Search

router.get('/task14_delimetersearch', authenticateToken.authenticateToken, delimetersearchget);

router.post('/task14_delimetersearch', authenticateToken.authenticateToken, delimetersearchpost);


//------Task-15 jobapplication form

router.get('/task16_jobform', authenticateToken.authenticateToken, jobapplicationformhomepage);

//get all student data
router.get('/allstudentlist', authenticateToken.authenticateToken, allstudentlist);


//----insert
router.get('/jobapplicationform', authenticateToken.authenticateToken, jobapplicationformget);

router.post('/jobapplicationformsubmit', jobapplicationformdatabackend.jobapplicationformdatabackend, jobapplicationsubmit);

//----update
router.get('/jobapplicationformupdate', authenticateToken.authenticateToken, jobapplicationformupdategetpost);

router.post('/jobapplicationformupdatesuccessfully', jobapplicationformdatabackend.jobapplicationformdatabackend, jobapplicationformupdatesubmitpost);


//-----Task-16 Job Application Form With AJAX

router.get('/task17_jobformajax', authenticateToken.authenticateToken, studentlistajax);

//get all student data
router.get('/studentlistajax', authenticateToken.authenticateToken, allstudentlistajax);


//----insert
router.get('/jobapplicationformajax', authenticateToken.authenticateToken, jobapplicationformajax);

router.post('/jobapplicationformajax', jobapplicationformajaxstate);

router.post('/jobapplicationformsubmitajax', jobapplicationformdatabackend.jobapplicationformdatabackend, jobapplicationformajaxsubmit);

//----update
router.get('/jobapplicationformupdateajax', authenticateToken.authenticateToken, jobapplicationformajaxupdate);

router.post('/jobapplicationformupdatesuccessfullyajax', jobapplicationformdatabackend.jobapplicationformdatabackend, jobapplicationformajaxsubmitupdate);


//----Task-17 JSON PLACE HOLDER 
router.get('/task18_jsonplaceholdertable', authenticateToken.authenticateToken, jsonplaceholder);

router.get('/post', posts);

router.get('/comments', posts);

//----Task-18 Timezone Converter

router.get('/task19_timezone', authenticateToken.authenticateToken, timezone);

router.post('/citytimezone', citytimezone);
module.exports = router;