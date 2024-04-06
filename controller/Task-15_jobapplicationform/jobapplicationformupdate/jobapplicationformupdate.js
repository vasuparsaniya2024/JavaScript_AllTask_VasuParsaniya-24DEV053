const connection = require('../../../connection.js');
const logger = require('../../../logs.js');

const { getstates, optionmaster } = require('../commonfunction.js');

const { geteducationdetails, getexperiencedetails, getlanguageknown, gettechnologyknown, getreferencecontact, getpreferencedetails } = require('./selectqueryfunction.js');


async function jobapplicationformupdategetpost(req, res) {


    let jobapplicationformaction = {
        formsubmit: "",
        formupdate: ""
    };

    let errorobject = {};  //define for firsttime when form load with get request
    let datafrompostrquest = {};
    //studentid store in global variable  that is used in student details update
    let student_id = req.query.student_id;
    let statearray = [];
    let preferedlocationarray = [];
    let departmentarray = [];
    let languagearray = [];
    let technologyarray = [];

    //--------update 
    let studentdata = {
        studentbasicdetails: {},
        educationdetails: [],
        experiencedetails: [],
        languageknown: [],
        technologyknown: [],
        referencecontact: [],
        preferencedetails: {}
    };

    const path = req.originalUrl;
    const query = path.split('?')[1];

    jobapplicationformaction.formupdate = `/jobapplicationformupdatesuccessfully?student_id=${student_id}`;
    jobapplicationformaction.formsubmit = "";

    // console.log(student_id);

    var statetemp = getstates().then((state) => {
        state.forEach((element) => {
            statearray.push(element);
        });
    });


    // i give preferedlocation id in optionmaster table is 3
    //also pass parameter those name we want to require

    var preferedlocationtemp = optionmaster(3, "preferedlocationid", "preferedlocation").then((data) => {
        data.forEach((element) => {
            preferedlocationarray.push(element);
        });
    });


    var departmenttemp = optionmaster(2, "departmentid", "department").then((data) => {
        data.forEach((element) => {
            departmentarray.push(element);
        });
    });


    await statetemp;

    await preferedlocationtemp;

    // console.log(preferedlocationarray.length);
    await departmenttemp;

    try {
        await new Promise((resolve, reject) => {

            const studentbasicdetails = `SELECT b.firstname as fname,b.lastname as lname,designation as designation,b.email as email,b.address1 as address1, b.address2 as address2,b.phonenumber as phonenumber,b.city as city,o1.option_name as gender,s.state_name as state,b.state as state_id,o2.option_name as relationship, b.zipcode as zipcode,DATE_FORMAT(b.dob,'%Y-%m-%d') as dob
        FROM basicdetails as b 
        LEFT JOIN optionmaster as o1 ON b.gender = o1.option_id
        LEFT JOIN optionmaster as o2 ON b.relationshipstatus = o2.option_id
        LEFT JOIN statemaster as s ON b.state=s.state_id
        WHERE b.candidate_id=${student_id}`;

            connection.query(studentbasicdetails, (err, result) => {
                try {
                    if (err) throw err

                    studentdata.studentbasicdetails = result[0];
                    resolve();
                } catch (err) {
                    logger.info("Error In Retrive Student Data:" + err);
                    reject(err);
                }
            });
        });
        //------education details get
        var education = geteducationdetails(student_id).then((data) => {
            studentdata.educationdetails = data;
        });

        await education; //wait before then execute

        //---------experience details get
        var experience = getexperiencedetails(student_id).then((data) => {
            studentdata.experiencedetails = data;
        })

        await experience;

        //-------language known
        var language = getlanguageknown(student_id).then((data) => {
            studentdata.languageknown = data;    //as array
        });
        await language;

        //--------technology known
        var technology = gettechnologyknown(student_id).then((data) => {
            studentdata.technologyknown = data;
        });
        await technology;

        //---------------referencecontact
        var reference = getreferencecontact(student_id).then((data) => {
            studentdata.referencecontact = data;
        });

        await reference;

        //-----------preference details
        var preference = getpreferencedetails(student_id).then((data) => {
            studentdata.preferencedetails = data[0];
        });

        await preference;
        // console.log(preferedlocationarray);

        // console.log(statearray);
        // errorobject.formupdatemessage = "Update Successfuly..";
        return res.render('Task-15/JobApplicationForm_exercise8_view/jobapplicationformexercise8', {
            errorobject: errorobject,
            statearray: statearray,
            preferedlocationarray: preferedlocationarray,
            departmentarray: departmentarray,
            datafrompostrquest: {},
            studentdata: studentdata,
            jobapplicationformaction: jobapplicationformaction
        });
    } catch (err) {
        logger.info("Unhandle Error: " + err);
        return res.render('Task-15/JobApplicationForm_exercise8_view/jobapplicationformexercise8', {
            errorobject: errorobject,
            statearray: statearray,
            datafrompostrquest: datafrompostrquest,
            studentdata: studentdata,
            jobapplicationformaction: jobapplicationformaction
        });
    }
}

module.exports = jobapplicationformupdategetpost;