require('dotenv').config();
const express = require('express');
const router = express.Router();


//----------Task-1 Javascript Events List
router.get('/task1_javascriptevents',(req,res)=>{
    return res.render('Task-1/JavaScriptEvents');
});


//---------Task-2 Dynamic table create
router.get('/task2_dynamictable',(req,res)=>{
    return res.render('Task-2/Query Selector/TableQuerySelector');
});


//--------Task-3 Kuku Cude
router.get('/task3_kukucube',(req,res)=>{
    return res.render('Task-3/Practice_Task-3');
});

//---------Task-4 Tic Tac Toe
router.get('/task4_tictactoe',(req,res)=>{
    return res.render('Task-4/Practice_Task-4');
});

//--------Task-5 Sorting
router.get('/task5_sorting',(req,res)=>{
    return res.render('Task-5/Practice_Task-5');
});


//--------Task-6 ehya(HTML,CSS,JavaScript)
router.get('/task6_ehya',(req,res)=>{
    return res.render('Task-6/ehya');
});

//-------Task-7 Awan Hoster(HTML,CSS,JavaScript)
router.get('/task7_awanhoster',(req,res)=>{
    return res.render('Task-7/Awan_Hoster');
});

//-------Task-8 Hire.X (HTML,CSS,JavaScript)
router.get('/task8_hirex',(req,res)=>{
    return res.render('Task-8/HireX');
});

module.exports = router;