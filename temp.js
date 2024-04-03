//-----------Task-12--------------

//-------API

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



//-------Task-13   dynamic table using insert query
//not in use
router.get('/task13_paggination',(req,res)=>{
    const currentPage = req.query.page || 1;
    const urlPath = req.path;
    ObjectData.urlPath = urlPath;
    // console.log(ObjectData.urlPath);
    res.render('Task-13/pagginationComponent',{
        ObjectData:ObjectData,
        pageCount: +process.env.TOTAL_PAGE,
                pageSize: +process.env.RECORS_IN_SINGLEPAGE,
                currentPage: +currentPage  
    });
});
