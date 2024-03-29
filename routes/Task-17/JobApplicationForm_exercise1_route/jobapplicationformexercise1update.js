require('dotenv').config();
const express = require('express');
const router = express.Router();

const connection = require('../../../connection.js');
const jobapplicationformdatabackend = require('../../../controller/Task-17/JobApplicationForm_exercise1_controller/jobapplicationformdatabackend.js');
const { resolve } = require('path');
const authenticateToken = require('../../../services/Authentication.js');

var jobapplicationformaction = {
    formsubmit: "",
    formupdate: ""
}; 

var errorobject = {};  //define for firsttime when form load with get request
var datafrompostrquest = {};
//studentid store in global variable  that is used in student details update
var student_id = 0;
var statearray = [];
var cityarray = [];

var preferedlocationarray = [];
var departmentarray = [];
var languagearray = [];
var technologyarray = [];

//--------update 
var studentdata = {
    studentbasicdetails: {},
    educationdetails: [],
    experiencedetails: [],
    languageknown: [],
    technologyknown: [],
    referencecontact: [],
    preferencedetails: {}
};
// var studentbasicdetails = {};  //render in ejs
//----------
//return promise
function getstates() {
    return new Promise((resolve, reject) => {
        const getstates = `SELECT state_id as state_id,state_name as state FROM statemaster;`;
        connection.query(getstates, (err, result) => {
            try {
                if (err) throw err
                resolve(result);
            } catch (err) {
                reject(err);
            }
        });
    });
}

var statetemp = getstates().then((state) => {
    state.forEach((element) => {
        statearray.push(element);
    });
});

function getcity(){
    return new Promise((resolve,reject)=>{
        const city = "SELECT * from citymaster;";
        connection.query(city,(err,result)=>{
            if(err){
                reject(err);
            }else{
                resolve(result);
            }
        });
    });
}
var citytemp = getcity().then((city)=>{
    city.forEach((element)=>{
        cityarray.push(element);
    })
});


//-------option name get from optionmaster table using selectmaster id
function optionmaster(select_id, column2, column3) {
    return new Promise((resolve, reject) => {
        const optionmaster = `SELECT s.select_name as selectname,o.option_id as ${column2},o.option_name as ${column3}
        FROM selectmaster as s
        LEFT JOIN optionmaster as o ON s.select_id=o.select_id
        WHERE o.select_id = ${select_id}`;

        connection.query(optionmaster, (err, result) => {
            if (err) {
                reject(err);
            } else {
                resolve(result);
            }
        });
    });
}

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

var languagetemp = optionmaster(1, "languageid", "language").then((data) => {
    data.forEach((element) => {
        languagearray.push(element);
    });
});

var technologytemp = optionmaster(4, "technologyid", "technology").then((data) => {
    data.forEach((element) => {
        technologyarray.push(element);
    });
});

router.get('/task17_jobformajax',authenticateToken.authenticateToken,(req,res)=>{
    return res.render('Task-17/JobApplicationForm_exercise1_view/studentlist');
});

//get all student data
router.get('/studentlistajax', authenticateToken.authenticateToken,(req, res) => {
    const studentdataretrive = `SELECT candidate_id as StudentId,firstname as FirstName,lastname as LastName,email as Email
    FROM basicdetails where candidate_id > 159`;
    connection.query(studentdataretrive,(err,result)=>{
        // console.log(result);
        return res.json(result);
    });
});

//----------------------------------------------------update-------------------------------

router.get('/jobapplicationformupdateajax', authenticateToken.authenticateToken,async (req, res) => {
    datafrompostrquest = {};
    errorobject = {};
    student_id = req.query.student_id;

    // console.log("route update");
    // console.log(student_id);
    // const path = req.originalUrl;
    // const query = path.split('?')[1];

    jobapplicationformaction.formupdate = "/jobapplicationformupdatesuccessfullyajax";
    jobapplicationformaction.formsubmit = "";

    // console.log(student_id);
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
        console.log(studentdata);

        //here we send city array to ejs according to state_id
        let cityarraytosend = [];

        for(let city of cityarray){
            if(city.state_id === studentdata.studentbasicdetails.state_id){
                cityarraytosend.push(city);
            }
        }
        // console.log(cityarraytosend);

        // errorobject.formupdatemessage = "Update Successfuly..";
        return res.render('Task-17/JobApplicationForm_exercise1_view/jobapplicationformexercise1', {
            errorobject: errorobject,
            statearray: statearray,
            cityarraytosend:cityarraytosend,
            preferedlocationarray: preferedlocationarray,
            departmentarray: departmentarray,
            datafrompostrquest: {},
            studentdata: studentdata,
            jobapplicationformaction: jobapplicationformaction
        });
    } catch (err) {
        console.log("Unhandle Error: " + err);
        return res.render('Task-17/JobApplicationForm_exercise1_view/jobapplicationformexercise1', {
            errorobject: errorobject,
            statearray: statearray,
            datafrompostrquest: datafrompostrquest,
            studentdata: studentdata,
            jobapplicationformaction: jobapplicationformaction
        });
    }
});



//--------------get education details of students
function geteducationdetails(student_id) {
    return new Promise((resolve, reject) => {
        const educationdetails = `SELECT o.option_name as educationdetailscheckbox,e.nameOfCourse as nameofcourse,e.nameOfBoard_Or_Univarsity as nameofboard,e.passingyear as passingyear,e.percentage as percentage
        FROM educationdetails as e
        LEFT JOIN optionmaster as o ON e.option_id = o.option_id
        WHERE e.candidate_id=${student_id}`;

        connection.query(educationdetails, (err, result) => {
            if (err) {
                reject(err);
            } else {
                resolve(result);
            }
        });
    });
}


function getexperiencedetails(student_id) {
    return new Promise((resolve, reject) => {
        const experiencedetails = `SELECT companyName as companyname,designation as companydesignation,DATE_FORMAT(dateFrom,'%Y-%m-%d') as companyfrom,DATE_FORMAT(dateTo,'%Y-%m-%d') as companyto 
        FROM experience
        WHERE candidate_id = ${student_id}`;

        connection.query(experiencedetails, (err, result) => {
            if (err) {
                reject(err);
            } else {
                resolve(result);
            }
        });
    });
}

function getlanguageknown(student_id) {
    return new Promise((resolve, reject) => {
        const languageknown = `SELECT o.option_name as languageknown,k.language_read as languageread,k.language_write as languagewrite, k.language_speak as languagespeak
        FROM knownlanguage as k
        LEFT JOIN optionmaster as o ON k.knownlanguage_id = o.option_id
        WHERE k.candidate_id = ${student_id}`;

        connection.query(languageknown, (err, result) => {
            if (err) {
                reject(err);
            } else {
                resolve(result);
            }
        });
    });
}

function gettechnologyknown(student_id) {
    return new Promise((resolve, reject) => {
        const technologyknown = `SELECT o.option_name as technologyknown,t.technologyProficiency as technologyproficiency
        FROM knowntechnology as t
        LEFT JOIN optionmaster as o ON t.knowntechnology_id=o.option_id
        WHERE candidate_id = ${student_id}`;

        connection.query(technologyknown, (err, result) => {
            if (err) {
                reject(err);
            } else {
                resolve(result);
            }
        });
    });
}

function getreferencecontact(student_id) {
    return new Promise((resolve, reject) => {
        const referencecontact = `SELECT referencePersonName as referencename,referencePersonnumber as referencenumber,relationWithReferencePerson as referencerelation
        FROM referencecontact
        WHERE candidate_id=${student_id}`;

        connection.query(referencecontact, (err, result) => {
            if (err) {
                reject(err);
            } else {
                resolve(result);
            }
        });
    });
}


function getpreferencedetails(student_id) {
    return new Promise((resolve, reject) => {
        const preference = `SELECT o1.option_name as preferedlocation,p.preferedLocation as preferedlocationid,p.noticePeriod as noticeperiod,p.expactedCTC as expectedctc,p.currentCTC as currentctc,o2.option_name as department,p.department as departmentid
        FROM preferances as p
        LEFT JOIN optionmaster as o1 ON p.preferedLocation = o1.option_id
        LEFT JOIN optionmaster as o2 ON p.department = o2.option_id
        WHERE p.candidate_id=${student_id}`;

        connection.query(preference, (err, result) => {
            if (err) {
                reject(err);
            } else {
                resolve(result);
            }
        });
    });
}
// function getstudentbasicdetails(student_id){
//     return new Promise((resolve,reject)=>{
//         const studentbasicdetails = `SELECT b.firstname as fname,b.lastname as lname,designation as designation,b.email as email,b.address1 as address1, b.address2 as address2,b.phonenumber as phonenumber,b.city as city,o1.option_name as gender,s.state_name as state,b.state as state_id,o2.option_name as relationship, b.zipcode as zipcode,DATE_FORMAT(b.dob,'%Y-%m-%d') as dob
//         FROM basicdetails as b 
//         LEFT JOIN optionmaster as o1 ON b.gender = o1.option_id
//         LEFT JOIN optionmaster as o2 ON b.relationshipstatus = o2.option_id
//         LEFT JOIN statemaster as s ON b.state=s.state_id
//         WHERE b.candidate_id=${student_id}`;

//         connection.query(studentbasicdetails,(err,result)=>{
//             if(err){
//                 reject(err);
//             }else{
//                 resolve(result);
//             }
//         });
//     });
// }

//----------------------------------------------------------UPDATE POST ROUTE

//global array for option id with name
var optionidwithnamearray = [];

//in this padd optionname as array
function getoptionidwithname() {
    return new Promise((resolve, reject) => {

        const getoptionidwithname = `SELECT option_id as optionid,select_id as selectid,option_name as optionname 
        FROM optionmaster`;

        connection.query(getoptionidwithname, (err, result) => {
            if (err) {
                reject(err);
            } else {
                resolve(result);
            }
        });
    });
}

var optionidwithnametemp = getoptionidwithname().then((data) => {
    data.forEach((element) => {
        optionidwithnamearray.push(element);
    });
});

//---we maintain same route for form update

router.post('/jobapplicationformupdatesuccessfullyajax', jobapplicationformdatabackend.jobapplicationformdatabackend, async (req, res) => {

    let datafrompostrquest = req.body;
    // console.log("update succ");
    // console.log(datafrompostrquest);

    student_id = datafrompostrquest.student_id;

    //set form action for ejs
    jobapplicationformaction.formupdate = "/jobapplicationformupdatesuccessfullyajax";
    jobapplicationformaction.formsubmit = "";

    // console.log(student_id);

    //wait before then execute
    await statetemp;
    await optionidwithnametemp;


    // console.log(optionidwithnamearray);


    // const path =req.originalUrl;
    // const pathname = path.split('?')[0];


    var state_id;
    var relationship_id;
    var gender_id;
    var ssc_id;
    var hsc_id;
    var bachelor_id;
    var master_id;

    for (let state of statearray) {
        if (state.state === datafrompostrquest.state) {
            state_id = state.state_id;
        }
    }
    // console.log(state_id);
    for (let option of optionidwithnamearray) {
        if (option.optionname === datafrompostrquest.relationship) {
            relationship_id = option.optionid;
        }

        if (option.optionname === datafrompostrquest.gender) {
            gender_id = option.optionid;
        }

        if (option.optionname === "SSC" && datafrompostrquest.educationdetailscheckbox1 === "sscresult") {
            ssc_id = option.optionid;
        }

        if (option.optionname === "HSC/Diploma" && datafrompostrquest.educationdetailscheckbox2 === "hscresult") {
            hsc_id = option.optionid;
        }

        if (option.optionname === "Bachelor Degree" && datafrompostrquest.educationdetailscheckbox3 === "bachelordegree") {
            bachelor_id = option.optionid;
        }

        if (option.optionname === "Master Degree" && datafrompostrquest.educationdetailscheckbox4 === "masterdegree") {
            master_id = option.optionid;
        }
    }



    // console.log(relationship_id);
    // console.log(gender_id);
    datafrompostrquest.state_id = state_id;



    // var errorobject = req.errorobject;

    var errorobject = {};

    if (Object.keys(errorobject).length > 0) {
        // studentdata = {
        //     studentbasicdetails: {},
        //     educationdetails : [],
        //     experiencedetails: [],
        //     languageknown:[],
        //     technologyknown:[],
        //     referencecontact:[],
        //     preferencedetails:{}
        // }; 

        return res.render('Task-17/JobApplicationForm_exercise1_view/jobapplicationformexercise1', {
            errorobject: errorobject,
            statearray: statearray,
            preferedlocationarray: preferedlocationarray,
            departmentarray: departmentarray,
            datafrompostrquest: datafrompostrquest,
            studentdata: studentdata,
            jobapplicationformaction: jobapplicationformaction
        });
    } else {
        try {
            await new Promise((resolve, reject) => {

                // console.log(datafrompostrquest);

                const updatebasicdetails = `UPDATE basicdetails SET firstname = '${datafrompostrquest.fname}',lastname = '${datafrompostrquest.lname}',designation = '${datafrompostrquest.designation}',email = '${datafrompostrquest.email}',address1 = '${datafrompostrquest.address1}',address2 = '${datafrompostrquest.address2}',phonenumber = '${datafrompostrquest.phonenumber}',city = '${datafrompostrquest.city}',state = ${state_id},gender = '${gender_id}',zipcode = '${datafrompostrquest.zipcode}'
                WHERE candidate_id=${student_id}`;

                // console.log(updatebasicdetails);
                connection.query(updatebasicdetails, async (err, result) => {
                    try {
                        if (err) throw err;

                        //------------update educationdetails
                        //--------------sscresult

                        let educationdetailspromise = [] //push all education promise

                        //---------this not nedd in educationdetails because i use checkbox so that checkbox condition i map

                        // let previouscoursenamearray = [];

                        // let previouscoursetemp = getpreviouscoursename(student_id).then((data)=>{
                        //     data.forEach((element)=>{
                        //     previouscoursenamearray.push(element.coursename);
                        //     console.log(element.coursename);
                        //     });
                        // });

                        // await previouscoursetemp;
                        // console.log(previouscoursenamearray.length);


                        if (datafrompostrquest.educationdetailscheckbox1 === "sscresult" && ssc_id !== undefined) {
                            educationdetailspromise.push(updateeducationdetails(student_id, ssc_id, 'SSC', datafrompostrquest.nameofboardssc, datafrompostrquest.passingyearssc, datafrompostrquest.percentagessc));
                        }

                        if (datafrompostrquest.educationdetailscheckbox2 === "hscresult" && hsc_id !== undefined) {
                            educationdetailspromise.push(updateeducationdetails(student_id, hsc_id, 'HSC', datafrompostrquest.nameofboardhsc, datafrompostrquest.passingyearhsc, datafrompostrquest.percentagehsc));
                        }

                        if (datafrompostrquest.educationdetailscheckbox3 === "bachelordegree" && bachelor_id !== undefined) {
                            educationdetailspromise.push(updateeducationdetails(student_id, bachelor_id, datafrompostrquest.nameofcoursebachelor, datafrompostrquest.nameofuniversitybachelor, datafrompostrquest.passingyearbachelor, datafrompostrquest.percentagebachelor));
                        }

                        if (datafrompostrquest.educationdetailscheckbox3 === "bachelordegree" && bachelor_id !== undefined) {
                            educationdetailspromise.push(updateeducationdetails(student_id, master_id, datafrompostrquest.nameofcoursemaster, datafrompostrquest.nameofuniversitymaster, datafrompostrquest.passingyearmaster, datafrompostrquest.percentagemaster));
                        }

                        // now resolve all promise
                        await Promise.all(educationdetailspromise);


                        //------------update experience details
                        const experiencedetailspromise = [];  //push all experience promise
                        const previouscompanynamearray = []; //these useful in update new record

                        var previouscompanytemp = getpreviouscompanyname(student_id).then((data) => {
                            data.forEach((element) => {
                                previouscompanynamearray.push(element.companyname);
                            });
                        });

                        await previouscompanytemp;

                        // console.log(previouscompanynamearray.length);

                        //if not undefined then if comdition true
                        //all in form of array 
                        if (typeof datafrompostrquest.companyname === "string" && typeof datafrompostrquest.companydesignation === "string" && typeof datafrompostrquest.companyfrom === "string" && typeof datafrompostrquest.companyto === "string") {
                            experiencedetailspromise.push(updateexperiencedetails(student_id, datafrompostrquest.companyname, datafrompostrquest.companydesignation, datafrompostrquest.companyfrom, datafrompostrquest.companyto, previouscompanynamearray[0]));

                        } else if (typeof datafrompostrquest.companyname === "object" && typeof datafrompostrquest.companydesignation === "object" && typeof datafrompostrquest.companyfrom === "object" && typeof datafrompostrquest.companyto === "object") {

                            for (let i = 0; i < datafrompostrquest.companyname.length; i++) {
                                experiencedetailspromise.push(updateexperiencedetails(student_id, datafrompostrquest.companyname[i], datafrompostrquest.companydesignation[i], datafrompostrquest.companyfrom[i], datafrompostrquest.companyto[i], previouscompanynamearray[i]));
                            }
                        }

                        await Promise.all(experiencedetailspromise);  //resolve all promise


                        //----------------------------Update Language Known----------------------

                        const languages = req.body.language || [];
                        const readProficiency = req.body.languageread || [];
                        const writeProficiency = req.body.languagewrite || [];
                        const speakProficiency = req.body.languagespeak || [];

                        // Create an array to hold the language data
                        const languageData = [];

                        // Loop through each language checkbox
                        languages.forEach((language, index) => {
                            const languageObj = {
                                language: language,
                                read: readProficiency.includes(language),
                                write: writeProficiency.includes(language),
                                speak: speakProficiency.includes(language)
                            };
                            languageData.push(languageObj);
                        });
                        // console.log(languageData);

                        var previouslanguageknownarray = [];
                        var previouslanguagetemp = getpreviouslanguage(student_id).then((data) => {
                            data.forEach((element) => {
                                previouslanguageknownarray.push(element);
                            });
                        });

                        await previouslanguagetemp;

                        //give languagearray that havelanguage store in optionmaster table
                        await languagetemp;

                        // console.log(languageData);
                        // console.log(previouslanguageknownarray);
                        // console.log(languagearray);

                        let statusforlangaugefoundinprevious = false;
                        let knownlanguageid = '';
                        if (languagearray && languageData && languageData.length > 0) {
                            for (let lang of languageData) {      //lang is object key-vale
                                if (previouslanguageknownarray.length !== 0) {
                                    for (let previouslang of previouslanguageknownarray) {    //langoptionmaster is object key-value
                                        if (lang.language === previouslang.knownlanguagename) {
                                            statusforlangaugefoundinprevious = true;
                                            knownlanguageid = previouslang.knownlanguageid; 
                                            break;
                                        }
                                    }
                                    if (statusforlangaugefoundinprevious) {
                                        updatelanguagedetails(student_id, knownlanguageid, lang.read, lang.write, lang.speak, knownlanguageid);
                                        // console.log("update");
                                        statusforlangaugefoundinprevious = false;
                                    } else {
                                        //if newlanguage is not found in previous language then insert this language
                                        for (let langinoptionmaster of languagearray) {
                                            if (lang.language === langinoptionmaster.language) {
                                                insertlanguagedetails(student_id, langinoptionmaster.languageid, lang.read, lang.write, lang.speak);
                                                // console.log("insert");
                                                break;
                                            }
                                        }
                                    }
                                } else {
                                    //insert all language
                                    for (let langinoptionmaster of languagearray) {
                                        if (lang.language === langinoptionmaster.language) {
                                            insertlanguagedetails(student_id, langinoptionmaster.languageid, lang.read, lang.write, lang.speak);
                                            // console.log("inserttttt");
                                        }
                                    }
                                }
                            }
                        }

                        //-----------------update technology known--------------

                        // console.log("==================");
                        // console.log(req.body.technology);
                        // console.log(req.body.technologyproficiency);

                        const technologies = req.body.technology || [];
                        const proficiencyLevels = req.body.technologyproficiency || [];

                        //in this we get technologyarray with id and name store in optionmaster table
                        await technologytemp; //await before then execute

                        const technologyData = [];  //new arrive that is  update

                        // Iterate over selected technologies
                        technologies.forEach((technology, index) => {
                            // Check if the proficiency level for this technology is selected

                            const proficiency = proficiencyLevels[index] || ''; // Default to empty string if proficiency is not selected

                            // Create technology object
                            const technologyObj = {
                                technology: technology,
                                proficiency: proficiency
                            };

                            // Push technology object to technologyData array
                            technologyData.push(technologyObj);
                        });

                        // console.log(technologyData);

                        let previoustechnologyknownarray = [];

                        var previoustechnologytemp = getprevioustechnology(student_id).then((data)=>{
                            data.forEach((element)=>{
                                previoustechnologyknownarray.push(element);
                            }); 
                        });
                        
                        await previoustechnologytemp;

                        // console.log("=================");
                        // console.log(technologyData);
                        // console.log(previoustechnologyknownarray);
                        // console.log(technologyarray);

                        let statusfortechnologyfoundinprevious = false;
                        let knowntechnologyid = '';
                        let newtechnologyproficiency = '';

                        if (technologyarray && technologyData && technologyData.length > 0) {
                            for (let tech of technologyData) {      //lang is object key-vale
                                if (previoustechnologyknownarray.length !== 0) {
                                    for (let previoustech of previoustechnologyknownarray) {    //langoptionmaster is object key-value
                                        if (tech.technology === previoustech.knowntechnologyname) {
                                            statusfortechnologyfoundinprevious = true;
                                            knowntechnologyid = previoustech.knowntechnologyid; 
                                            break;
                                        }
                                    }
                                    if (statusfortechnologyfoundinprevious) {
                                        updatetechnologydetails(student_id, knowntechnologyid, tech.proficiency);
                                        // console.log("update");
                                        statusfortechnologyfoundinprevious = false;
                                    } else {
                                        //if newlanguage is not found in previous language then insert this language
                                        for (let techinoptionmaster of technologyarray) {
                                            if (tech.technology === techinoptionmaster.technology) {
                                                inserttechnologydetails(student_id, techinoptionmaster.technologyid, tech.proficiency);
                                                // console.log("insert");
                                                break;
                                            }
                                        }
                                    }
                                } else {
                                    //insert all technology
                                    for (let techinoptionmaster of technologyarray) {
                                        if (tech.technology === techinoptionmaster.technology) {
                                            inserttechnologydetails(student_id, techinoptionmaster.technologyid,tech.proficiency);
                                            // console.log("inserttttt");
                                        }
                                    }
                                }
                            }
                        }


                        //----------update reference details----------------------------
                        const referencedetailspromise = [];

                        const prevoiusreferencearray = [];

                        let referencetemp = getpreviousreferencecontact(student_id).then((data) => {
                            data.forEach((element) => {
                                prevoiusreferencearray.push(element.referencepersonnumber);
                            });
                        });

                        await referencetemp;
                        // console.log(prevoiusreferencearray.length);

                        if (typeof datafrompostrquest.referencename === "string" && typeof datafrompostrquest.referencenumber === "string" && typeof datafrompostrquest.referencerelation === "string") {
                            referencedetailspromise.push(updatereferencedetails(student_id, datafrompostrquest.referencename, datafrompostrquest.referencenumber, datafrompostrquest.referencerelation, prevoiusreferencearray[0]));

                        } else if (typeof datafrompostrquest.referencename === "object" && typeof datafrompostrquest.referencenumber === "object" && typeof datafrompostrquest.referencerelation === "object") {

                            for (let i = 0; i < datafrompostrquest.referencename.length; i++) {
                                experiencedetailspromise.push(updateexperiencedetails(student_id, datafrompostrquest.referencename[i], datafrompostrquest.referencenumber[i], datafrompostrquest.referencerelation[i], prevoiusreferencearray[i]));
                            }
                        }

                        await Promise.all(referencedetailspromise);  //resolve all promise


                        //-----------------update preference details

                        const previouspreferencearray = [];
                        var previouspreferencetemp = getpreviouspreference(student_id).then((data) => {
                            data.forEach((element) => {
                                previouspreferencearray.push(element);
                                // console.log(element);
                            });
                        });

                        await previouspreferencetemp;

                        //now we find the updated id oof location and department
                        await preferedlocationtemp;
                        await departmenttemp;

                        let newpreferencelocationid;
                        let newdepartmentid;

                        departmentarray.forEach((element) => {
                            if (element.department === datafrompostrquest.department) {
                                newdepartmentid = element.departmentid;
                            }
                        });

                        preferedlocationarray.forEach((element) => {
                            if (element.preferedlocation === datafrompostrquest.preferedlocation) {
                                newpreferencelocationid = element.preferedlocationid;
                            }
                        });

                        // console.log(newdepartmentid);
                        // console.log(newpreferencelocationid);

                        if (newdepartmentid && newpreferencelocationid) {
                            await updatepreferencedetails(student_id, newpreferencelocationid, datafrompostrquest.noticeperiod, datafrompostrquest.expectedctc, datafrompostrquest.currentctc, newdepartmentid, previouspreferencearray[0].previouspreferencelocation, previouspreferencearray[0].previousdepartment);          // promise array not require because only one promise
                        }

                        resolve();

                    } catch (err) {
                        console.log("Error In Update Details: " + err);
                        reject(err);
                        return res.json({message : "Someting Went Wrong...."});
                    }
                });
            });

            return res.json({message : "Thank You For Update...."});

            // return res.render('JobApplicationForm_exercise1_view/jobapplicationformexercise1', {
            //     errorobject: { formupdatemessage: "Thank You For Update.." },
            //     statearray: statearray,
            //     preferedlocationarray: preferedlocationarray,
            //     departmentarray: departmentarray,
            //     datafrompostrquest: {},
            //     studentdata: studentdata,
            //     jobapplicationformaction: jobapplicationformaction
            // });

        } catch (err) {
            console.log("Unhandle Error: " + err);
            // errorobject.recordupdateerror = "Record Update Error";

            // return res.render('JobApplicationForm_exercise1_view/jobapplicationformexercise1', {
            //     errorobject: errorobject,
            //     statearray: statearray,
            //     preferedlocationarray: preferedlocationarray,
            //     departmentarray: departmentarray,
            //     datafrompostrquest: datafrompostrquest,
            //     studentdata: studentdata,
            //     jobapplicationformaction: jobapplicationformaction
            // });
        }
    }
});

/* *in educationdetails if educationdetailscheckbox1 select then ssc,
   * if educationdetailscheckbox2 then hsc
   * if educationdetailscheckbox3 then bachelor 
   * if educationdetailscheckbox4 then master*/

function getpreviouscoursename(student_id) {
    return new Promise((resolve, reject) => {
        const prevoiuscoursename = `SELECT nameOfCourse as coursename FROM educationdetails WHERE candidate_id = ${student_id};`;
        connection.query(prevoiuscoursename, (err, result) => {
            if (err) {
                reject(err);
            } else {
                resolve(result);
            }
        });
    });
}
function updateeducationdetails(student_id, option_id, nameofcourse, nameofboard, passingyear, percentage) {
    return new Promise((resolve, reject) => {
        const educationdetailsupdate = `UPDATE educationdetails 
        SET option_id = '${option_id}',nameOfCourse = '${nameofcourse}',nameOfBoard_Or_Univarsity = '${nameofboard}',passingyear = '${passingyear}',percentage='${percentage}'
        WHERE candidate_id = ${student_id} AND nameOfCourse = '${nameofcourse}';`
        // console.log(educationdetailsupdate);

        connection.query(educationdetailsupdate, (err, result) => {
            if (err) {
                reject(err);
            } else {
                resolve(result);
            }
        });
    });
}

function getpreviouscompanyname(student_id) {
    return new Promise((resolve, reject) => {
        const previouscompanyname = `SELECT companyName as companyname FROM experience WHERE candidate_id = ${student_id};`;
        connection.query(previouscompanyname, (err, result) => {
            if (err) {
                reject(err);
            } else {
                resolve(result);
            }
        });
    });
}

function updateexperiencedetails(student_id, companyname, companydesignation, companyfrom, companyto, previouscompanyname) {
    return new Promise((resolve, reject) => {
        const educationdetails = `UPDATE experience
        SET companyName = '${companyname}',designation = '${companydesignation}',dateFrom = '${companyfrom}',dateTo = '${companyto}'
        WHERE candidate_id = ${student_id} AND companyName = '${previouscompanyname}';`;
        // console.log(educationdetails);
        connection.query(educationdetails, (err, result) => {
            if (err) {
                reject(err);
            } else {
                resolve(result);
            }
        });
    });
}

function getpreviouslanguage(student_id) {
    return new Promise((resolve, reject) => {
        const previouslanguage = `SELECT o.option_id as knownlanguageid,o.option_name as knownlanguagename,l.language_read as languageread,l.language_write as languagewrite,l.language_speak as languagespeak 
        FROM knownlanguage as l
        LEFT JOIN optionmaster as o ON l.knownlanguage_id = o.option_id 
        WHERE candidate_id = ${student_id};`;

        connection.query(previouslanguage, (err, result) => {
            if (err) {
                reject(err);
            } else {
                resolve(result);
            }
        });
    });
}

function insertlanguagedetails(student_id, languageid, languageread, languagewrite, languagespeak) {
    return new Promise((resolve, reject) => {
        const insertlanguage = `INSERT INTO knownlanguage(candidate_id,knownlanguage_id,language_read,language_write,language_speak) VALUES(${student_id},'${languageid}',${languageread},${languagewrite},${languagespeak})`;

        connection.query(insertlanguage, (err, result) => {
            if (err) {
                reject(err);
            } else {
                resolve(result);
            }
        });
    });
}


function updatelanguagedetails(student_id, languageid, languageread, languagewrite, languagespeak, previouslanguageid) {
    return new Promise((resolve, reject) => {

        //if previouslanguageid and new languageid is not same then new will insert
        const languagedetailsquery = `UPDATE knownlanguage 
        SET knownlanguage_id = '${languageid}',language_read = ${languageread},language_write = ${languagewrite},language_speak = ${languagespeak}
        WHERE candidate_id = ${student_id} AND knownlanguage_id = '${previouslanguageid}';`;


        connection.query(languagedetailsquery, (err, result) => {
            if (err) {
                reject(err);
            } else {
                resolve(result);
            }
        });
    });
}


function getprevioustechnology(student_id){
    return new Promise((resolve,reject)=>{
        const previoustechnology = `SELECT t.knowntechnology_id as knowntechnologyid,o.option_name as knowntechnologyname,t.technologyProficiency as technologyproficiency
        FROM knowntechnology as t
        LEFT JOIN optionmaster as o ON t.knowntechnology_id = o.option_id
        WHERE candidate_id = ${student_id};`;

        connection.query(previoustechnology,(err,result)=>{
            if(err){
                reject(err);
            }else{
                resolve(result);
            }
        });
    });
}

function inserttechnologydetails(student_id,technologyid,technologyproficiency){
    return new Promise((resolve,reject)=>{
                    const inserttechnology = `INSERT INTO knowntechnology(candidate_id,knowntechnology_id,technologyProficiency) VALUES(${student_id},'${technologyid}','${technologyproficiency}');`;

                    connection.query(inserttechnology,(err,result)=>{
                        if(err){
                            reject(err);
                        }else{
                            resolve(result);
                        }
                    });
    });
}

function updatetechnologydetails(student_id,technologyid,technologyproficiency){
    return new Promise((resolve,reject)=>{
        const updatetechnology = `UPDATE knowntechnology 
        SET knowntechnology_id = '${technologyid}',technologyProficiency = '${technologyproficiency}'
        WHERE candidate_id = ${student_id} AND knowntechnology_id = '${technologyid}';`;

        connection.query(updatetechnology,(err,result)=>{
            if(err){
                reject(err);
            }else{
                resolve(result);
            }
        });
    });
}


function getpreviousreferencecontact(student_id) {
    return new Promise((resolve, reject) => {
        const previousreference = `SELECT referencePersonnumber as referencepersonnumber 
        FROM referencecontact WHERE candidate_id = ${student_id};`;

        connection.query(previousreference, (err, result) => {
            if (err) {
                reject(err);
            } else {
                resolve(result);
            }
        });
    });
}

function updatereferencedetails(student_id, referencepersonname, referencepersonnumber, referencepersonrelation, previousreferencenumber) {
    return new Promise((resolve, reject) => {
        const updatereference = `UPDATE referencecontact SET referencePersonName = '${referencepersonname}',referencePersonnumber = '${referencepersonnumber}',relationWithReferencePerson = '${referencepersonrelation}'
    WHERE candidate_id = ${student_id} AND referencePersonnumber = '${previousreferencenumber}';`;

        connection.query(updatereference, (err, result) => {
            if (err) {
                reject(err);
            } else {
                resolve(result);
            }
        });
    });
}


function getpreviouspreference(student_id) {
    return new Promise((resolve, reject) => {
        const previouspreference = `SELECT o1.option_id as previouspreferencelocation,o2.option_id as previousdepartment 
        FROM preferances as p
        LEFT JOIN optionmaster as o1 ON p.preferedLocation = o1.option_id
        LEFT JOIN optionmaster as o2 ON p.department = o2.option_id
        WHERE candidate_id = ${student_id};`;

        connection.query(previouspreference, (err, result) => {
            if (err) {
                reject(err);
            } else {
                resolve(result);
            }
        });
    });
}


function updatepreferencedetails(student_id, preferencelocation, noticeperiod, expactedctc, currentctc, department, previouslocation, previousdepartment) {
    return new Promise((resolve, reject) => {
        const updatepreference = `UPDATE preferances 
        SET preferedLocation = '${preferencelocation}',noticePeriod = ${noticeperiod},expactedCTC = ${expactedctc},currentCTC = ${currentctc},department = '${department}'
        WHERE candidate_id = ${student_id} AND preferedLocation = '${previouslocation}' AND department = '${previousdepartment}';`;

        connection.query(updatepreference, (err, result) => {
            if (err) {
                reject(err);
            } else {
                resolve(result);
            }
        });
    });
}
//----------------------------------------------------------
module.exports = router;
