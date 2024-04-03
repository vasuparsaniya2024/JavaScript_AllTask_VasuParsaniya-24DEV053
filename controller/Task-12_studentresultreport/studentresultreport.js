const connection = require('../../connection.js');

async function studentresultreport(req,res){
    const studentId = req.query.student_id;
    const currentPage = req.query.page || 1;
    const offset = process.env.RECORS_IN_SINGLEPAGE * (currentPage - 1);
    
    let StudentMarkObject = {};

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
}

module.exports = studentresultreport;