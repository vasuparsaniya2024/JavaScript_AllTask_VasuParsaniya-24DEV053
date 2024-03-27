require('dotenv').config();
const express = require('express');
const router = express.Router();


//----------Task-1 Javascript Events List
router.get('/task1_javascriptevents',(req,res)=>{
    return res.render('Task-1/JavaScriptEvents');
});


module.exports = router;