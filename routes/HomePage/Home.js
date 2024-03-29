const express = require('express');
const router = express.Router();
const connection = require('../../connection.js');

const authenticateToken = require('../../services/Authentication.js');

router.get('/listtask',authenticateToken.authenticateToken,(req,res)=>{
    let exerciseJsonObject = {
        "exerciseno":[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18],
        "date":["31-01-2024","01-02-2024","02-02-2024","05-02-2024","05-02-2024","09-02-2024","12-02-2024","13-02-2024","25-02-2024","26-02-2024","27-02-2024","28-02-2024","29-02-2024","01-03-2024"],
        
        "exercisename":["JavaScriptEvents","Dynamic Table Create","Kuku Cube","Tic Tac Toe","Sorting Algorithm","ehya (HTML,CSS,JavaScript)","Awan Hoster(HTML,CSS,JavaScript)","Hire.X(HTML,CSS,JavaScript)",
        "Student List","Student List With Paggination","Student Attandance Report","Student Result Report","Dynamic Grid Generate When select query insert","Delimeter Search","Job Application Form CURD Operation","Job Application Form CURD Operation Using AJAX","Fetch API From JSON PLACE HOLDER ","Timezone Converter"],

        "viewexerciseroute":["/task1_javascriptevents","/task2_dynamictable","/task3_kukucube","/task4_tictactoe","/task5_sorting","/task6_ehya","/task7_awanhoster","/task8_hirex",
        "/task9_studentDetails","/task10_studentDetailswithpaggination","/task11_studentAttandance","/task12_studentResult","/task13_form","/task14_delimetersearch","/task16_jobform","/task17_jobformajax","/task18_jsonplaceholdertable","/task19_timezone"]
    }
    res.render('HomePage/Home',{
        exerciseJsonObject:exerciseJsonObject
    });
});

module.exports = router;