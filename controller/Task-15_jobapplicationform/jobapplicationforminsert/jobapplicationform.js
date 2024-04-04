const connection = require('../../../connection.js');

const { optionmaster, getstates } = require('./commonfunction.js');


async function jobapplicationformget(req, res) {


    let jobapplicationformaction = {
        formsubmit: "",
        formupdate: ""
    };

    let errorobject = {};  //define for firsttime when form load with get request
    let datafrompostrquest = {};
    let lastRecordInsertid = 0;
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
    const pathname = path.split('?')[0];
    jobapplicationformaction.formsubmit = "/jobapplicationformsubmit";
    jobapplicationformaction.formupdate = "";

    let statetemp = getstates().then((state) => {
        state.forEach((element) => {
            statearray.push(element);
        });
    });


    // i give preferedlocation id in optionmaster table is 3
    //also pass parameter those name we want to require

    let preferedlocationtemp = optionmaster(3, "preferedlocationid", "preferedlocation").then((data) => {
        data.forEach((element) => {
            preferedlocationarray.push(element);
        });
    });


    let departmenttemp = optionmaster(2, "departmentid", "department").then((data) => {
        data.forEach((element) => {
            departmentarray.push(element);
        });
    });


    await statetemp;   //wait before the promise generate by then is resolve

    await preferedlocationtemp;

    await departmenttemp;


    datafrompostrquest = {};

    return res.render('Task-15/JobApplicationForm_exercise8_view/jobapplicationformexercise8', {
        errorobject: errorobject,
        statearray: statearray,
        preferedlocationarray: preferedlocationarray,
        departmentarray: departmentarray,
        datafrompostrquest: datafrompostrquest,
        studentdata: studentdata,
        jobapplicationformaction: jobapplicationformaction
    });
}


module.exports = jobapplicationformget;