require('dotenv').config();
const express = require('express');
const router = express.Router();

const connection = require('../../../connection.js');
const jobapplicationformdatabackend = require('../../../controller/Task-16/JobApplicationForm_exercise8_controller/jobapplicationformdatabackend.js');

const authenticateToken = require('../../../services/Authentication.js');


var jobapplicationformaction = {
    formsubmit: "",
    formupdate: ""
};
var errorobject = {};  //define for firsttime when form load with get request
var datafrompostrquest = {};
var lastRecordInsertid = 0;
var statearray = [];
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

var languagetemp = optionmaster(1, "languageid", "languagename").then((data) => {
    data.forEach((element) => {
        languagearray.push(element);
    });
});

var technologytemp = optionmaster(4, "technologyid", "technology").then((data) => {
    data.forEach((element) => {
        technologyarray.push(element);
    });
});


router.get('/task16_jobform',authenticateToken.authenticateToken,(req, res) => {
    res.render('Task-16/JobApplicationForm_exercise8_view/jobapplicationformhomepage');
});

//get all student data
router.get('/allstudentlist', authenticateToken.authenticateToken,(req, res) => {
    const studentdataretrive = `SELECT candidate_id as StudentId,firstname as FirstName,lastname as LastName,email as Email
    FROM basicdetails`;
    connection.query(studentdataretrive,(err,result)=>{
        console.log(result);
        return res.json(result);
    });
});


router.get('/jobapplicationform',authenticateToken.authenticateToken,async (req, res) => {

    const path = req.originalUrl;
    const pathname = path.split('?')[0];
    jobapplicationformaction.formsubmit = "/jobapplicationformsubmit";
    jobapplicationformaction.formupdate = "";

    await statetemp;   //wait before the promise generate by then is resolve

    await preferedlocationtemp;

    await departmenttemp;

    datafrompostrquest = {};

    return res.render('Task-16/JobApplicationForm_exercise8_view/jobapplicationformexercise8', {
        errorobject: errorobject,
        statearray: statearray,
        preferedlocationarray: preferedlocationarray,
        departmentarray: departmentarray,
        datafrompostrquest: datafrompostrquest,
        studentdata: studentdata,
        jobapplicationformaction: jobapplicationformaction
    });
});


router.post('/jobapplicationformsubmit',jobapplicationformdatabackend.jobapplicationformdatabackend, async (req, res) => {

    const path = req.originalUrl;
    const pathname = path.split('?')[0];
    jobapplicationformaction.formsubmit = "/jobapplicationformsubmit";
    jobapplicationformaction.formupdate = "";


    //basic details
    const { fname, lname, designation, address1, address2, email, phonenumber, city, gender, state, relationship, zipcode, dob } = req.body;

    //education details

    const { educationdetailscheckbox1, educationdetailscheckbox2, educationdetailscheckbox3, educationdetailscheckbox4, nameofboardssc, passingyearssc, percentagessc, nameofboardhsc, passingyearhsc, percentagehsc, nameofcoursebachelor, nameofuniversitybachelor, passingyearbachelor, percentagebachelor, nameofcoursemaster, nameofuniversitymaster, passingyearmaster, percentagemaster } = req.body;

    var errorobject = req.errorobject;

    let datafrompostrquest = req.body;

    // console.log(errorobject);

    if (Object.keys(errorobject).length > 0) {
        //it is return because if error exist then render ejs with error
        //if i am not put return then out side of if block is execute
        return res.render('Task-16/JobApplicationForm_exercise8_view/jobapplicationformexercise8', {
            errorobject: errorobject,
            statearray: statearray,
            preferedlocationarray: preferedlocationarray,
            departmentarray: departmentarray,   //render data because error
            datafrompostrquest: datafrompostrquest,
            studentdata: studentdata,
            jobapplicationformaction: jobapplicationformaction
        });
    } else {

        //error handle during insertion of record if any error is not handle in backend
        //if i am not use try catch then any error occur in this else block that is not handle ans server crash so that's used try catch

        //-------------------------------------------------------------------
        try {
            await new Promise((resolve, reject) => {
                // connection.beginTransaction(async (err) => {
                //     if (err) {
                //         console.log("Begin Transaction Error:" + err);
                //         reject(err);
                //     }

                //-----------insert basic details
                let state_id
                let gender_id = "";
                let relation_id = "";

                if (state === "Gujarat") {
                    state_id = 10;
                } else if (state === "Panjab") {
                    state_id = 24;
                }

                if (gender === "Male") {
                    gender_id = "G1";
                } else if (gender === "Female") {
                    gender_id = "G2";
                }

                if (relationship === "Single") {
                    relation_id = "R1";
                } else if (relationship === "Married") {
                    relation_id = "R2";
                }

                const insertbasicdetails = `INSERT INTO basicdetails(firstname,lastname,designation,email,address1,address2,phonenumber,city,state,gender,zipcode,relationshipstatus,dob) VALUES("${fname}","${lname}","${designation}","${email}","${address1}","${address2}","${phonenumber}","${city}",${state_id},"${gender_id}","${zipcode}","${relation_id}","${dob}");`

                connection.query(insertbasicdetails, async (err, result) => {

                    try {
                        if (err) throw err

                        lastRecordInsertid = result.insertId;    //lastinsert id

                        const educationdetailsPromise = [];
                        let educationdetails = [];

                        if (educationdetailscheckbox1 === "sscresult") {
                            // educationdetailsPromise.push(insertEducationDetail(lastRecordInsertid, "C1", "SSC", nameofboardssc, passingyearssc, percentagessc));
                            let sscresulttemp = [lastRecordInsertid, "C1", "SSC", nameofboardssc, passingyearssc, percentagessc];

                            educationdetails.push(sscresulttemp);
                        }

                        if (educationdetailscheckbox2 === "hscresult") {
                            // educationdetailsPromise.push(insertEducationDetail(lastRecordInsertid, "C2", "HSC", nameofboardhsc, passingyearhsc, percentagehsc));
                            let hscresulttemp = [lastRecordInsertid, "C2", "HSC", nameofboardhsc, passingyearhsc, percentagehsc];
                            educationdetails.push(hscresulttemp);
                        }

                        if (educationdetailscheckbox3 === "bachelordegree") {
                            // educationdetailsPromise.push(insertEducationDetail(lastRecordInsertid, "C3", nameofcoursebachelor, nameofuniversitybachelor, passingyearbachelor, percentagebachelor));

                            let bachelordegreetemp = [lastRecordInsertid, "C3", nameofcoursebachelor, nameofuniversitybachelor, passingyearbachelor, percentagebachelor];

                            educationdetails.push(bachelordegreetemp);
                        }

                        if (educationdetailscheckbox4 === "masterdegree") {
                            // educationdetailsPromise.push(insertEducationDetail(lastRecordInsertid, "C4", nameofcoursemaster, nameofuniversitymaster, passingyearmaster, percentagemaster));
                            let masterdegreetemp = [lastRecordInsertid, "C4", nameofcoursemaster, nameofuniversitymaster, passingyearmaster, percentagemaster];
                            educationdetails.push(masterdegreetemp);
                        }

                        // educationdetailsPromise.push(insertEducationDetail  (educationdetails)); // not use for single promise`

                        if (educationdetails.length !== 0) {
                            insertEducationDetail(educationdetails);
                            educationdetails = [];
                        }
                        // await Promise.all(educationdetailsPromise);  //solve all promise

                        //-----------insert experience

                        const experiencedetails = [];  //for promise resolve

                        let experience = [];

                        if (typeof req.body.companyname === "string" && typeof req.body.companydesignation === "string" && typeof req.body.companyfrom === "string" && typeof req.body.companyto === "string") {
                            let experiencetemp = [lastRecordInsertid, req.body.companyname, req.body.companydesignation, req.body.companyfrom, req.body.companyto];

                            experience.push(experiencetemp);

                            //-------------one way 
                            // experiencedetails.push(insertExperienceDetail(lastRecordInsertid,req.body.companyname,req.body.companydesignation,req.body.companyfrom,req.body.companyto));

                            //----------second way

                            // experiencedetails.push(insertExperienceDetail(experience)); //this not use for single promise

                        } else if (typeof req.body.companyname === "object" && typeof req.body.companydesignation && typeof req.body.companyfrom === "object" && typeof req.body.companyto === "object") {

                            //-------------one way
                            // for(let i=0;i<req.body.companyname.length;i++){
                            //     experiencedetails.push(insertExperienceDetail(lastRecordInsertid,req.body.companyname[i],req.body.companydesignation[i],req.body.companyfrom[i],req.body.companyto[i]));
                            // }

                            //----------second way
                            for (let i = 0; i < req.body.companyname.length; i++) {
                                let experiencetemp = [lastRecordInsertid, req.body.companyname[i], req.body.companydesignation[i], req.body.companyfrom[i], req.body.companyto[i]];
                                experience.push(experiencetemp);
                            }
                            // experiencedetails.push(insertExperienceDetail(experience));
                        }
                        if (experience.length !== 0) {
                            insertExperienceDetail(experience);
                            experience = [];
                        }
                        // await Promise.all(experiencedetails);

                        //----------------insert reference
                        const referencedetails = [];  //promise array

                        let reference = [];

                        if (typeof req.body.referencename === "string" && typeof req.body.referencenumber === "string" && typeof req.body.referencerelation === "string") {

                            // experiencedetails.push(insertReferenceDetail(lastRecordInsertid,req.body.referencename,req.body.referencenumber,req.body.referencerelation));
                            let referencetemp = [lastRecordInsertid, req.body.referencename, req.body.referencenumber, req.body.referencerelation];
                            reference.push(referencetemp);

                            // referencedetails.push(insertReferenceDetail(reference));

                        } else if (typeof req.body.referencename === "object" && typeof req.body.referencenumber === "object" && typeof req.body.referencerelation === "object") {

                            //------one way
                            // for(let i=0;i<req.body.referencename.length;i++){
                            //     experiencedetails.push(insertReferenceDetail(lastRecordInsertid,req.body.referencename[i],req.body.referencenumber[i],req.body.referencerelation[i]));
                            // }

                            //----second way
                            for (let i = 0; i < req.body.referencename.length; i++) {
                                let referencetemp = [lastRecordInsertid, req.body.referencename[i], req.body.referencenumber[i], req.body.referencerelation[i]];
                                reference.push(referencetemp);

                                // referencedetails.push(insertReferenceDetail(reference));
                            }
                        }

                        if (reference.length !== 0) {
                            insertReferenceDetail(reference);
                            reference = [];
                        }
                        // await Promise.all(referencedetails);

                        //----------insert preferance

                        //id store in optionmaster table

                        let preferedlocation_id = "";
                        let department_id = "";

                        if (req.body.preferedlocation === "Ahmedabad") {
                            preferedlocation_id = "PL1";
                        } else if (req.body.preferedlocation === "Rajkot") {
                            preferedlocation_id = "PL2";
                        }

                        if (req.body.department === "Development") {
                            department_id = "D1";
                        } else if (req.body.department === "Design") {
                            department_id = "D2";
                        } else if (req.body.department === "Marketing") {
                            department_id = "D3";
                        }

                        const insertpreferance = `INSERT INTO preferances(candidate_id,preferedLocation,noticePeriod,expactedCTC,currentCTC,department) VALUES(${lastRecordInsertid},"${preferedlocation_id}",${req.body.noticeperiod || 'NULL'},${req.body.expectedctc || 'NULL'},${req.body.currentctc || 'NULL'},"${department_id}");`

                        await new Promise((resolve, reject) => {
                            connection.query(insertpreferance, (err, result) => {
                                if (err) {
                                    reject(err);
                                } else {
                                    resolve(result);
                                }
                            });
                        });


                        //---------Technology Insert
                        let knowntechnologyforquery = [];

                        //in this we get technologyarray with id and name store in optionmaster table
                        await technologytemp; //await before then execute

                        const technologies = req.body.technology || [];
                        const proficiencyLevels = req.body.technologyproficiency || [];


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

                        console.log(technologyData);

                        for (let tech of technologyData) {
                            for (let techinoptionmaster of technologyarray) {
                                if (tech.technology === techinoptionmaster.technology) {
                                    let knowntechnology = [lastRecordInsertid, techinoptionmaster.technologyid, tech.proficiency];
                                    knowntechnologyforquery.push(knowntechnology);
                                }
                            }
                        }

                        if (knowntechnologyforquery.length !== 0) {
                            inserttechnologyknown(knowntechnologyforquery);
                            knowntechnologyforquery = [];
                        }

                        // const knowntechnology = [];  //promise 

                        // if (req.body.technology1 === "PHP") {

                        //     //------one way
                        //     // knowntechnology.push(inserttechnologyknown(lastRecordInsertid,"T1",req.body.firsttechnologyproficiency));

                        //     //---------second way
                        //     let knowntechnologyforqueryphp = [lastRecordInsertid, "T1", req.body.firsttechnologyproficiency];

                        //     knowntechnologyforquery.push(knowntechnologyforqueryphp);

                        // }

                        // if (req.body.technology2 === "MySQL") {
                        //     //------one way
                        //     // knowntechnology.push(inserttechnologyknown(lastRecordInsertid,"T2",req.body.secondtechnologyproficiency));

                        //     let knowntechnologyforquerymysql = [lastRecordInsertid, "T2", req.body.secondtechnologyproficiency];

                        //     knowntechnologyforquery.push(knowntechnologyforquerymysql);
                        // }

                        // if (req.body.technology3 === "Angular") {
                        //     //---one way
                        //     // knowntechnology.push(inserttechnologyknown(lastRecordInsertid,"T3",req.body.thirdtechnologyproficiency))

                        //     //---second way
                        //     let knowntechnologyforqueryangular = [lastRecordInsertid, "T3", req.body.thirdtechnologyproficiency];

                        //     knowntechnologyforquery.push(knowntechnologyforqueryangular);
                        // }

                        // if (req.body.technology4 === "React") {
                        //     //-------one way
                        //     // knowntechnology.push(inserttechnologyknown(lastRecordInsertid,"T4",req.body.fourthtechnologyproficiency))

                        //     //------seacond way
                        //     let knowntechnologyforqueryreact = [lastRecordInsertid, "T4", req.body.fourthtechnologyproficiency];

                        //     knowntechnologyforquery.push(knowntechnologyforqueryreact);
                        // }

                        // knowntechnology.push(inserttechnologyknown(knowntechnologyforquery));


                        // await Promise.all(knowntechnology);

                        //--------------------------------Language Known Insert--------------------------


                        let languageknownforquery = [];

                        await languagetemp;     // await before then execute  so we get languagearray that contain language object store in optionmastertable

                        //=============
                        //--------optimize solution for language store----
                        /**In this we map selected language with language store with id in optionmaster table 
                         * so we achive dynamically we does not need to find each language proficiency by name
                         */
                        const languages = req.body.language || [];
                        const readProficiency = req.body.languageread || [];
                        const writeProficiency = req.body.languagewrite || [];
                        const speakProficiency = req.body.languagespeak || [];

                        // Create an array to hold the language data
                        const languageData = [];   //user select those language that store in this as each language with proficiency object

                        // Loop through each language checkbox
                        languages.forEach((language, index) => {
                            const languageObj = {
                                language: language,
                                read: readProficiency.includes(language),    //includes() return true or false
                                write: writeProficiency.includes(language),
                                speak: speakProficiency.includes(language)
                            };
                            languageData.push(languageObj);
                        });
                        console.log(languageData);


                        if (languagearray && languageData && languageData.length > 0) {
                            for (let lang of languageData) {      //lang is object key-vale
                                for (let langinoptionmaster of languagearray) {    //langoptionmaster is object key-value
                                    if ((lang.language === langinoptionmaster.languagename)) {
                                        let knownlanguage = [lastRecordInsertid, langinoptionmaster.languageid, lang.read, lang.write, lang.speak];
                                        languageknownforquery.push(knownlanguage);

                                    }
                                }
                            }
                        }

                        if (languageknownforquery.length !== 0) {
                            insertlanguageknown(languageknownforquery);
                            languageknownforquery = [];
                        }

                        //==============

                        //---------this is not better way to store language checkbox value in database 
                        // if (req.body.language1 === "Hindi") {
                        //     let languageread1 = 0;  //boolean
                        //     let languagewrite1 = 0;
                        //     let languagespeak1 = 0;

                        //     if (req.body.languageread1 === "Read") {
                        //         languageread1 = 1;
                        //     }
                        //     if (req.body.languagewrite1 === "Write") {
                        //         languagewrite1 = 1;
                        //     }
                        //     if (req.body.languagespeak1 === "Speak") {
                        //         languagespeak1 = 1;
                        //     }

                        //     // languageknown.push(insertlanguageknown(lastRecordInsertid,"L1",languageread1,languagewrite1,languagespeak1));
                        //     let knownlanguagehindi = [lastRecordInsertid, "L1", languageread1, languagewrite1, languagespeak1];
                        //     languageknownforquery.push(knownlanguagehindi);

                        // }

                        // if (req.body.language2 === "English") {
                        //     let languageread2 = 0;  //boolean
                        //     let languagewrite2 = 0;
                        //     let languagespeak2 = 0;

                        //     if (req.body.languageread2 === "Read") {
                        //         languageread2 = 1;
                        //     }
                        //     if (req.body.languagewrite2 === "Write") {
                        //         languagewrite2 = 1;
                        //     }
                        //     if (req.body.languagespeak2 === "Speak") {
                        //         languagespeak2 = 1;
                        //     }
                        //     // languageknown.push(insertlanguageknown(lastRecordInsertid,"L2",languageread2,languagewrite2,languagespeak2));

                        //     let languageknownenglish = [lastRecordInsertid, "L2", languageread2, languagewrite2, languagespeak2];
                        //     languageknownforquery.push(languageknownenglish);

                        // }

                        // if (req.body.language3 === "Gujarati") {
                        //     let languageread3 = 0;  //boolean
                        //     let languagewrite3 = 0;
                        //     let languagespeak3 = 0;

                        //     if (req.body.languageread3 === "Read") {
                        //         languageread3 = 1;
                        //     }
                        //     if (req.body.languagewrite3 === "Write") {
                        //         languagewrite3 = 1;
                        //     }
                        //     if (req.body.languagespeak3 === "Speak") {
                        //         languagespeak3 = 1;
                        //     }

                        //     // languageknown.push(insertlanguageknown(lastRecordInsertid,"L3",languageread3,languagewrite3,languagespeak3));

                        //     let languageknowngujarati = [lastRecordInsertid, "L3", languageread3, languagewrite3, languagespeak3];
                        //     languageknownforquery.push(languageknowngujarati);
                        // }

                        // languageknown.push(insertlanguageknown(languageknownforquery));
                        //-------------------------------------------

                        // await Promise.all(languageknown);
                        resolve();
                    } catch (err) {
                        console.log("Error in basic details:" + err);  //basically this is not need but only understanding i put this
                        //because outside of promise try catch handle any error if promise reject called as unhandle error 
                        reject(err);
                    }


                    //commit the transaction if successfully inserted

                    // connection.commit((err) => {
                    //     try {
                    //         if (err) throw err
                    //         console.log("commit");
                    //         resolve();
                    //     } catch (err) {
                    //         console.log("Error commiting transaction:" + err);
                    //         reject(err); // Reject the promise with the error
                    //         connection.rollback(() => {
                    //             console.log("Transaction Rollback");
                    //         });
                    //     }
                    // });

                });
                // });
            });
            //Here We Render because after resolve promise 
            //If We render in the connection.commit then it give error like cannot sent header after they are send to the client
            // Render the response after successful insertion and promise resolve 
            return res.render('Task-16/JobApplicationForm_exercise8_view/jobapplicationformexercise8', {
                errorobject: { formsubmitmessage: "Thank You For Submitting.." },
                datafrompostrquest: {},
                statearray: statearray, preferedlocationarray: preferedlocationarray, departmentarray: departmentarray, studentdata: studentdata,
                jobapplicationformaction: jobapplicationformaction
            });
        } catch (err) {
            //if promise reject then this handle here

            console.log("Unhandle Error:" + err);
            errorobject.recordinserterror = "Something Went Wrong";

            return res.render('Task-16/JobApplicationForm_exercise8_view/jobapplicationformexercise8', {
                errorobject: errorobject,
                datafrompostrquest: datafrompostrquest,
                statearray: statearray, preferedlocationarray: preferedlocationarray, departmentarray: departmentarray,
                studentdata: studentdata,
                jobapplicationformaction: jobapplicationformaction
            });
        }
    }

    // Function to insert education detail
    function insertEducationDetail(educationdetails) {
        return new Promise((resolve, reject) => {
            // const inserteducationdetails = `INSERT INTO educationdetails(candidate_id,option_id,nameOfCourse,nameOfBoard_Or_Univarsity,passingyear,percentage) VALUES(${lastRecordInsertid},"${optionId}","${courseName}","${nameOfBoard_Or_Univarsity}","${passingyear}","${percentage}")`;

            const inserteducationdetails = "INSERT INTO educationdetails(candidate_id,option_id,nameOfCourse,nameOfBoard_Or_Univarsity,passingyear,percentage) VALUES ?";

            connection.query(inserteducationdetails, [educationdetails], (err, result) => {
                if (err) {
                    console.log("Error in education detail insertion:", err);
                    reject(err);
                } else {
                    resolve(result);
                }
            });
        });
    }

    function insertExperienceDetail(experience) {
        return new Promise((resolve, reject) => {
            // const insertexperiencedetails = `INSERT INTO experience(candidate_id,companyName,designation,dateFrom,dateTo) VALUES(${lastRecordInsertid},"${companyname}","${companydesignation}","${datefrom}","${dateto}")`;

            const insertexperiencedetails = "INSERT INTO experience(candidate_id,companyName,designation,dateFrom,dateTo) VALUES ?";
            connection.query(insertexperiencedetails, [experience], (err, result) => {
                if (err) {
                    console.log("Error in experience details insertion:", err);
                    reject(err);
                } else {
                    resolve(result);
                }
            });
        });
    }



    function insertReferenceDetail(reference) {
        return new Promise((resolve, reject) => {
            // const insertreferencedetails = `INSERT INTO referencecontact(candidate_id,referencePersonName,referencePersonnumber,relationWithReferencePerson) VALUES(${lastRecordInsertid},"${referencename}","${referencenumber}","${referencerelation}")`;

            const insertreferencedetails = "INSERT INTO referencecontact(candidate_id,referencePersonName,referencePersonnumber,relationWithReferencePerson) VALUES ?";

            connection.query(insertreferencedetails, [reference], (err, result) => {
                if (err) {
                    console.log("Error in reference details insertion:", err);
                    reject(err);
                } else {
                    resolve(result);
                }
            });
        });
    }

    function inserttechnologyknown(technologyknown) {
        return new Promise((resolve, reject) => {
            // const inserttechnology = `INSERT INTO knowntechnology(candidate_id,knowntechnology_id,technologyProficiency) VALUES(${lastRecordInsertid},"${knowntechnology_id}","${technologyProficiency}")`;

            const inserttechnology = "INSERT INTO knowntechnology(candidate_id,knowntechnology_id,technologyProficiency) VALUES ?";

            connection.query(inserttechnology, [technologyknown], (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            })
        });
    }

    function insertlanguageknown(languageknown) {
        return new Promise((resolve, reject) => {
            // const insertlanguage = `INSERT INTO knownlanguage(candidate_id,knownlanguage_id,language_read,language_write,language_speak) VALUES(${lastRecordInsertid},"${knownlanguage_id}",${language_read},${language_write},${language_speak})`;

            const insertlanguage = "INSERT INTO knownlanguage(candidate_id,knownlanguage_id,language_read,language_write,language_speak) VALUES ?";

            connection.query(insertlanguage, [languageknown], (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            })
        });
    }

    //------------------------------------------------------------------------------------
});

module.exports = router;
