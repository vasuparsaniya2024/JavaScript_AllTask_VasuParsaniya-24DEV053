const connection = require('../../../connection.js');
const logger = require('../../../logs.js');

const { getstates, optionmaster } = require('../commonfunction.js');


async function jobapplicationformajax(req, res) {

    let jobapplicationformaction = {
        formsubmit: "",
        formupdate: ""
    };

    let errorobject = {};  //define for firsttime when form load with get request
    let datafrompostrquest = {};
    let statearray = [];
    let cityarray = [];
    let preferedlocationarray = [];
    let departmentarray = [];

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


    // const path = req.originalUrl;
    // const pathname = path.split('?')[0];
    jobapplicationformaction.formsubmit = "/jobapplicationformsubmitajax";
    jobapplicationformaction.formupdate = "";

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

    await statetemp;   //wait before the promise generate by then is resolve

    await preferedlocationtemp;

    await departmenttemp;


    return res.render('Task-16/JobApplicationForm_exercise1_view/jobapplicationformexercise1', {
        errorobject: errorobject,
        statearray: statearray,
        cityarray: cityarray,
        preferedlocationarray: preferedlocationarray,
        departmentarray: departmentarray,
        datafrompostrquest: datafrompostrquest,
        studentdata: studentdata,
        jobapplicationformaction: jobapplicationformaction
    });
}


function jobapplicationformajaxstate(req, res) {
    const state = req.body;

    //method-1
    // const statename = req.body.statename; //variable name is property of object
    //method -2 
    const statename = state.statename;
    // console.log(state.statename);
    const city = `SELECT c.city_name as cityname 
    FROM citymaster as c
    LEFT JOIN statemaster as s ON c.state_id = s.state_id
    WHERE s.state_name = '${statename}';`;

    connection.query(city, (err, result) => {
        try {
            if (err) throw err
            // console.log(result);
            return res.json(result);
        } catch (err) {
            logger.logError("Error In Get City: " + err);
        }
    });
}

module.exports = { jobapplicationformajax, jobapplicationformajaxstate };