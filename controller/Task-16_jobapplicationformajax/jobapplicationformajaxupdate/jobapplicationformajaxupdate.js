
const connection = require('../../../connection.js');

const { getstates, getcity, optionmaster } = require('../commonfunction.js');

const { geteducationdetails, getexperiencedetails, getlanguageknown, gettechnologyknown, getreferencecontact, getpreferencedetails } = require('./selectqueryfunction.js');


async function jobapplicationformajaxupdate(req, res) {


    let jobapplicationformaction = {
        formsubmit: "",
        formupdate: ""
    };

    let errorobject = {};  //define for firsttime when form load with get request
    let datafrompostrquest = {};
    //studentid store in global variable  that is used in student details update
    let student_id = 0;
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

    student_id = req.query.student_id;

    // console.log("route update");
    // console.log(student_id);
    // const path = req.originalUrl;
    // const query = path.split('?')[1];

    jobapplicationformaction.formupdate = "/jobapplicationformupdatesuccessfullyajax";
    jobapplicationformaction.formsubmit = "";

    // console.log(student_id);
    let statetemp = getstates().then((state) => {
        state.forEach((element) => {
            statearray.push(element);
        });
    });

    let citytemp = getcity().then((city) => {
        city.forEach((element) => {
            cityarray.push(element);
        })
    });


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

    await statetemp;

    await citytemp;

    await preferedlocationtemp;

    // console.log(preferedlocationarray);

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
                    // console.log(result[0]);
                    resolve();
                } catch (err) {
                    console.log("Error In Retrive Student Data:", err);
                    reject(err);
                }
            });
        });
        //------education details get
        let education = geteducationdetails(student_id).then((data) => {
            studentdata.educationdetails = data;
        });

        await education; //wait before then execute

        //---------experience details get
        let experience = getexperiencedetails(student_id).then((data) => {
            studentdata.experiencedetails = data;
        })

        await experience;

        //-------language known
        let language = getlanguageknown(student_id).then((data) => {
            studentdata.languageknown = data;    //as array
        });
        await language;

        //--------technology known
        let technology = gettechnologyknown(student_id).then((data) => {
            studentdata.technologyknown = data;
        });

        await technology;

        //---------------referencecontact
        let reference = getreferencecontact(student_id).then((data) => {
            studentdata.referencecontact = data;
        });

        await reference;

        //-----------preference details
        let preference = getpreferencedetails(student_id).then((data) => {
            studentdata.preferencedetails = data[0];
        });

        await preference;
        // console.log(preferedlocationarray);

        // console.log(statearray);
        // console.log(studentdata);

        //here we send city array to ejs according to state_id
        let cityarraytosend = [];

        for (let city of cityarray) {
            if (city.state_id === studentdata.studentbasicdetails.state_id) {
                cityarraytosend.push(city);
            }
        }
        // console.log(cityarraytosend);

        // errorobject.formupdatemessage = "Update Successfuly..";
        return res.render('Task-16/JobApplicationForm_exercise1_view/jobapplicationformexercise1', {
            errorobject: errorobject,
            statearray: statearray,
            cityarraytosend: cityarraytosend,
            preferedlocationarray: preferedlocationarray,
            departmentarray: departmentarray,
            datafrompostrquest: {},
            studentdata: studentdata,
            jobapplicationformaction: jobapplicationformaction
        });
    } catch (err) {
        console.log("Unhandle Error: " + err);
        return res.render('Task-16/JobApplicationForm_exercise1_view/jobapplicationformexercise1', {
            errorobject: errorobject,
            statearray: statearray,
            datafrompostrquest: datafrompostrquest,
            studentdata: studentdata,
            jobapplicationformaction: jobapplicationformaction
        });
    }
}

module.exports = jobapplicationformajaxupdate;