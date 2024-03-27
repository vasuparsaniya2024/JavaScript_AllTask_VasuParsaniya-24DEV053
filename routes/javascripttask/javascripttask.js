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

module.exports = router;