require('dotenv').config();
const express = require('express');
const router = express.Router();

const authenticateToken = require('../../services/Authentication.js');

const studentdetails = require('../../controller/Task-9_studentdetails/studentdetails.js');
const studentdetailswithpaggination = require('../../controller/Task-10_studentdetailswithpaggination/studentdetailswithpaggination.js');
const studentattandancereport = require('../../controller/Task-11_studentattadancereport/studentattandancereport.js');
const studentresultreport = require('../../controller/Task-12_studentresultreport/studentresultreport.js');

const { dynamicgridform,dynamicgridget,dynamicgridpost } = require('../../controller/Task-13_dynamicgrid/dynamicgrid.js');

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



module.exports = router;