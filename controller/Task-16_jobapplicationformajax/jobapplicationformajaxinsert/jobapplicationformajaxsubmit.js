const connection = require('../../../connection.js');

const { getstates, optionmaster } = require('../commonfunction.js');

const { insertEducationDetail, insertExperienceDetail, insertReferenceDetail, inserttechnologyknown, insertlanguageknown } = require('./insertrecordfunction.js');

async function jobapplicationformajaxsubmit(req, res) {

    let jobapplicationformaction = {
        formsubmit: "",
        formupdate: ""
    };

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

    jobapplicationformaction.formsubmit = "/jobapplicationformsubmitajax";
    jobapplicationformaction.formupdate = "";

    // i give preferedlocation id in optionmaster table is 3
    //also pass parameter those name we want to require

    let statetemp = getstates().then((state) => {
        state.forEach((element) => {
            statearray.push(element);
        });
    });

    let languagetemp = optionmaster(1, "languageid", "languagename").then((data) => {
        data.forEach((element) => {
            languagearray.push(element);
        });
    });

    let technologytemp = optionmaster(4, "technologyid", "technology").then((data) => {
        data.forEach((element) => {
            technologyarray.push(element);
        });
    });

    await statetemp;

    // console.log("Route call");
    // console.log(req.body);
    //basic details
    const { fname, lname, designation, address1, address2, email, phonenumber, city, gender, state, relationship, zipcode, dob } = req.body;

    //education details

    const { educationdetailscheckbox1, educationdetailscheckbox2, educationdetailscheckbox3, educationdetailscheckbox4, nameofboardssc, passingyearssc, percentagessc, nameofboardhsc, passingyearhsc, percentagehsc, nameofcoursebachelor, nameofuniversitybachelor, passingyearbachelor, percentagebachelor, nameofcoursemaster, nameofuniversitymaster, passingyearmaster, percentagemaster } = req.body;

    let errorobject = req.errorobject;

    let datafrompostrquest = req.body;

    // console.log(errorobject);

    if (Object.keys(errorobject).length > 0) {
        //it is return because if error exist then render ejs with error
        //if i am not put return then out side of if block is execute
        return res.render('Task-16/JobApplicationForm_exercise1_view/jobapplicationformexercise1', {
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


                for (let state of statearray) {
                    if (state.state === datafrompostrquest.state) {
                        state_id = state.state_id;
                    }
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

                // console.log(insertbasicdetails);

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

                        // console.log(technologyData);

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
                        // console.log(languageData);


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

                        resolve();
                    } catch (err) {
                        console.log("Error in basic details:" + err);  //basically this is not need but only understanding i put this
                        reject(err);
                        return res.json({ message: "Something Went Wrong...." });

                        //because outside of promise try catch handle any error if promise reject called as unhandle error 
                    }
                });
                // });
            });

            // response after successful insertion and promise resolve 

            return res.json({ message: "Thank You For Submit...." });
        } catch (err) {
            //if promise reject then this handle here
            console.log("Unhandle Error:" + err);
        }
    }
}


module.exports = jobapplicationformajaxsubmit;