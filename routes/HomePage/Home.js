const express = require('express');
const router = express.Router();
const connection = require('../../connection.js');

router.get('/listtask',(req,res)=>{
    let exerciseJsonObject = {
        "exerciseno":[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17],
        "date":["25-02-2024","26-02-2024","27-02-2024","28-02-2024","29-02-2024"],
        "exercisename":["JavaScriptEvents","Dynamic Grid","Student Data In Grid","Student Data Grid With Paggination",
                       "Student Attadence","Student Result"],
        "viewexerciseroute":["/task1_javascriptevents","","/studentDetails","/studentDetailswithpaggination","/studentAttandance","/studentResult"]
    }
    res.render('HomePage/Home',{
        exerciseJsonObject:exerciseJsonObject
    });
});

module.exports = router;