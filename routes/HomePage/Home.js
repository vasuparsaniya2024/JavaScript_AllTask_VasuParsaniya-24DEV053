const express = require('express');
const router = express.Router();
const connection = require('../../connection.js');

router.get('/listtask',(req,res)=>{
    let exerciseJsonObject = {
        "exerciseno":[0,1,2,3,4],
        "date":["25-02-2024","26-02-2024","27-02-2024","28-02-2024","29-02-2024"],
        "exercisename":["Dynamic Grid","Student Data In Grid","Student Data Grid With Paggination",
                       "Student Attadence","Student Result"],
        "viewexerciseroute":["","/studentDetails","/studentDetailswithpaggination","/studentAttandance","/studentResult"]
    }
    res.render('HomePage/Home',{
        exerciseJsonObject:exerciseJsonObject
    });
});

module.exports = router;