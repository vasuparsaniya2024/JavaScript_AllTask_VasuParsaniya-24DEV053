require('dotenv').config();

const express = require('express');
const router = express.Router();
const connection = require('../../../connection');

const authenticateToken = require('../../../services/Authentication.js');


// router.get('/studentResult',(req,res)=>{
//     function generateRandom(min,max){
//         return Math.floor(Math.random()*(max-min))+min;
//     }

//     const examDates = ["2024-01-01", "2024-01-02", "2024-01-03", "2024-02-01", "2024-02-02", "2024-02-03", "2024-03-01", "2024-03-02", "2024-03-03", "2024-04-01", "2024-04-02", "2024-04-03", "2024-05-01", "2024-05-02", "2024-05-03", "2024-06-01", "2024-06-02", "2024-06-03"];

//     const examIds = ["201","202","203","204","205","206"];

//     var theorytotalmark = 0;
//     var practicaltotalmark = 0;
//     var practicalobtainmark = 0;
//     var theoryobtainmark = 0;
//     var queryNumber = 1;
//     var dateIndex = 0;
//     var examid = "";
//     for(let i=0;i<200;i++){
//         for(let j=0;j<6;j++){  //number of subject
//             examid = examIds[j];
//             while(queryNumber < 4){
//                 switch(queryNumber){
//                     case 1:
//                         theorytotalmark = 30;
//                         theoryobtainmark = generateRandom(0,30);
//                         practicaltotalmark = 20;
//                         practicalobtainmark = generateRandom(0,20);
//                         break;            
//                     case 2:
//                         theorytotalmark = 40;
//                         theoryobtainmark = generateRandom(0,40);
//                         practicaltotalmark = 10;
//                         practicalobtainmark = generateRandom(0,10);
//                         break;
    
//                     case 3:
//                         theorytotalmark = 70;
//                         theoryobtainmark = generateRandom(0,70);
//                         practicaltotalmark = 30;
//                         practicalobtainmark = generateRandom(0,30);
//                         break;
//                     }
//                     let query = "INSERT INTO ExamResultTemp(theorytoalmark,theoryobtainmark,practicaltotalmark,practicalobtainmark,examdate,exam_id) "+"VALUES(?,?,?,?,?,?)";
    
//                     connection.query(query,[theorytotalmark,theoryobtainmark,practicaltotalmark,practicalobtainmark,examDates[dateIndex],examid],(err,result)=>{
//                         try{
//                             if(err) throw err
//                             queryNumber++;
//                             dateIndex++;
//                             // res.send();
//                         }catch(err){
//                             console.log("Error In Insert Mark: "+err);
//                         }
//                     });
//             }
//             if(queryNumber>3){
//                 queryNumber = 1;
//             }
//         }

//         if(dateIndex > 18){  //per student total records 
//             dateIndex = 0;
//         }
//     }
//     res.send();
// });


//API for insert studentresult
router.get('/studentResultInsert', async (req, res) => {
    function generateRandom(min,max){
        return Math.floor(Math.random()*(max-min))+min;
    }

    const examDates = ["2024-01-01", "2024-02-01", "2024-03-01","2024-01-02", "2024-02-02", "2024-03-02",
    "2024-01-03", "2024-02-03", "2024-03-03","2024-01-04", "2024-02-04", "2024-03-04","2024-01-05", "2024-02-05", "2024-03-05","2024-01-06", "2024-02-06", "2024-03-06"
    ];

    const subjectIds = ["201","202","203","204","205","206"];

    var theorytotalmark = 0;
    var practicaltotalmark = 0;
    var practicalobtainmark = 0;
    var theoryobtainmark = 0;
    // var queryNumber = 1;
    var dateIndex = 0;
    var subjectid = "";

    for (let i = 0; i < 200; i++) {
        for (let j = 0; j < 6; j++) {
            subjectid = subjectIds[j];
            for (let queryNumber = 1; queryNumber < 4; queryNumber++) {
                switch (queryNumber) {
                    case 1:
                        theorytotalmark = 30;
                        theoryobtainmark = generateRandom(0,30);
                        practicaltotalmark = 20;
                        practicalobtainmark = generateRandom(0,20);
                        break;            
                    case 2:
                        theorytotalmark = 40;
                        theoryobtainmark = generateRandom(0,40);
                        practicaltotalmark = 10;
                        practicalobtainmark = generateRandom(0,10);
                        break;
    
                    case 3:
                        theorytotalmark = 70;
                        theoryobtainmark = generateRandom(0,70);
                        practicaltotalmark = 30;
                        practicalobtainmark = generateRandom(0,30);
                        break;
                }
                try {
                    await new Promise((resolve, reject) => {
                        let query = "INSERT INTO ExamResult(student_id,theoryTotalMark,theoryObtainMark,practicalTotalMark,practicalObtainMark,examdate,subject_id) " + "VALUES(?,?,?,?,?,?,?)";
                        connection.query(query, [i+1,theorytotalmark, theoryobtainmark, practicaltotalmark, practicalobtainmark, examDates[dateIndex], subjectid], (err, result) => {
                            if (err) reject(err);
                            else {
                                resolve();
                                dateIndex++;
                            }
                        });
                    });
                } catch (err) {
                    console.log("Error In Insert Mark: " + err);
                }
                if (dateIndex >= examDates.length) dateIndex = 0;
            }
        }
    }
    res.send();
});


var StudentMarkObject = {};

router.get('/task12_studentResult',authenticateToken.authenticateToken,async (req,res)=>{
    const studentId = req.query.student_id;
    const currentPage = req.query.page || 1;
    const offset = process.env.RECORS_IN_SINGLEPAGE * (currentPage - 1);

    //if student id is not available then show the list of of the student with result
    //if student id available then show the particular student id student detail subject wise result

    // console.log(studentId);
    if(studentId === undefined){

        var totalRecords = 0;
    const querycountrecord = "SELECT COUNT(*) as numberofstudent FROM StudentDetails;"

    await new Promise((resolve,reject)=>{
        connection.query(querycountrecord,(err,resultcount)=>{
            try{
                if(err) throw err
                totalRecords = resultcount[0].numberofstudent;
                resolve();
            }catch(err){
                reject();
            }
        });
    });

        await new Promise((resolve,reject)=>{
            let queryTerminalExam = "SELECT ExamResult.student_id,StudentDetails.studentname,"+
        "SUM(ExamResult.theoryObtainMark) as theoryObtainMarkTerminal,SUM(ExamResult.practicalObtainMark) as practicalObtainMarkTerminal FROM ExamResult"+" "+
        "LEFT JOIN StudentDetails ON ExamResult.student_id = StudentDetails.student_id"+" "+
        "WHERE exam_id = 1"+" "+
        "GROUP BY student_id,studentname"+" "+"LIMIT"+" "+offset+","+process.env.RECORS_IN_SINGLEPAGE;

        connection.query(queryTerminalExam,(err,result)=>{
            try{
                if(err) throw err
                // console.log(result);
                StudentMarkObject.Terminal = result;
                // console.log(StudentMarkObject.Terminal);
                resolve();
            }catch(err){
                console.log("Error In Student Result Terminal: "+err);
                reject();
            }
        });
        });

        await new Promise((resolve,reject)=>{

    

        let queryPrelimExam = "SELECT StudentDetails.student_id,SUM(ExamResult.theoryObtainMark) as theoryObtainMarkPrelim,SUM(ExamResult.practicalObtainMark) as practicalObtainMarkPrelim FROM ExamResult"+" "+
        "LEFT JOIN StudentDetails ON ExamResult.student_id = StudentDetails.student_id"+" "+
        "WHERE exam_id = 2"+" "+
        "GROUP BY student_id"+" "+"LIMIT"+" "+offset+","+process.env.RECORS_IN_SINGLEPAGE;

        connection.query(queryPrelimExam,(err,result)=>{
            try{
                if(err) throw err
                // console.log(result);
                StudentMarkObject.Prelim = result;
                // console.log(StudentMarkObject.Prelim);
                resolve();
            }catch(err){
                console.log("Error In Student Result Prelim: "+err);
                reject();
            }
        });
        });
        
        await new Promise((resolve,reject)=>{

    
            let queryFinalExam = "SELECT ExamResult.student_id,SUM(ExamResult.theoryObtainMark) as theoryObtainMarkFinal,SUM(ExamResult.practicalObtainMark) as practicalObtainMarkFinal FROM ExamResult"+" "+
            "LEFT JOIN StudentDetails ON ExamResult.student_id = StudentDetails.student_id"+" "+
            "WHERE exam_id = 3"+" "+
            "GROUP BY student_id"+" "+"LIMIT"+" "+offset+","+process.env.RECORS_IN_SINGLEPAGE;

            connection.query(queryFinalExam,(err,result)=>{
                try{
                    if(err) throw err
                    // console.log(result);
                    StudentMarkObject.Final = result;
                    // console.log(StudentMarkObject.Final);
                    resolve();
                }catch(err){
                    console.log("Error In Student Result Final: "+err);
                    reject();
                }
            });
    
            
            });

            // console.log("StudentMarkObject: "+JSON.stringify(StudentMarkObject));
        res.render('Task-12/studentresult_exercise4/studentResult',{
            StudentMarkObject : JSON.stringify(StudentMarkObject),
            pageCount: totalRecords / process.env.RECORS_IN_SINGLEPAGE,
            pageSize: +process.env.RECORS_IN_SINGLEPAGE,
            currentPage: +currentPage    // + is used for convert string to number
        });
        StudentMarkObject = {};
    }else{
        // ======================================================================================
        await new Promise((resolve,reject)=>{
            let queryForDetailStudentMarkTerminal = "SELECT StudentDetails.student_id AS student_id,StudentDetails.studentname AS studentname,SubjectMaster.subjectname AS subjectname, ExamResult.theoryObtainMark AS theoryObtainMarkTerminal, ExamResult.practicalObtainMark AS practicalObtainMarkTerminal"+" "+
            "FROM ExamResult"+" "+
            "LEFT JOIN SubjectMaster ON ExamResult.subject_id = SubjectMaster.subject_id"+" "+
            "LEFT JOIN StudentDetails ON ExamResult.student_id = StudentDetails.student_id"+" "+
            "WHERE ExamResult.student_id ="+studentId+" "+"AND ExamResult.exam_id = 1;";
                        
        connection.query(queryForDetailStudentMarkTerminal,(err,result)=>{
            try{
                if(err) throw err
                // console.log(result);
                StudentMarkObject.Terminal = result;
                // console.log(StudentMarkObject.Terminal);
                resolve();
            }catch(err){
                console.log("Error In Student Result Terminal: "+err);
                reject();
            }
        });
        });

        await new Promise((resolve,reject)=>{

            let queryForDetailStudentMarkFinal = "SELECT SubjectMaster.subjectname, ExamResult.theoryObtainMark AS theoryObtainMarkPrelim, ExamResult.practicalObtainMark AS practicalObtainMarkPrelim"+" "+
            "FROM ExamResult"+" "+
            "LEFT JOIN SubjectMaster ON ExamResult.subject_id = SubjectMaster.subject_id"+" "+
            "WHERE ExamResult.student_id ="+studentId+" "+"AND ExamResult.exam_id = 2;";
            

        connection.query(queryForDetailStudentMarkFinal,(err,result)=>{
            try{
                if(err) throw err
                // console.log(result);
                StudentMarkObject.Prelim = result;
                // console.log(StudentMarkObject.Prelim);
                resolve();
            }catch(err){
                console.log("Error In Student Result Prelim: "+err);
                reject();
            }
        });

        
        });
        
        await new Promise((resolve,reject)=>{

            let queryForDetailStudentMarkFinal = "SELECT SubjectMaster.subjectname, ExamResult.theoryObtainMark AS theoryObtainMarkFinal, ExamResult.practicalObtainMark AS practicalObtainMarkFinal"+" "+
            "FROM ExamResult"+" "+
            "LEFT JOIN SubjectMaster ON ExamResult.subject_id = SubjectMaster.subject_id"+" "+
            "WHERE ExamResult.student_id ="+studentId+" "+"AND ExamResult.exam_id = 3;";
            
            connection.query(queryForDetailStudentMarkFinal,(err,result)=>{
                try{
                    if(err) throw err
                    // console.log(result);
                    StudentMarkObject.Final = result;
                    // console.log(StudentMarkObject.Final);
                    resolve();
                }catch(err){
                    console.log("Error In Student Result Final: "+err);
                    reject();
                }
            });
            });

            // console.log("StudentMarkObject: "+JSON.stringify(StudentMarkObject));
        res.render('Task-12/studentresult_exercise4/studentDetailResult',{
            StudentMarkObject : JSON.stringify(StudentMarkObject)
        });
        StudentMarkObject = {};
    }
});

module.exports = router;