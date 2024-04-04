
const connection = require('../../../connection.js');

const { getstates, getcity, optionmaster, getoptionidwithname } = require('./commonfunction.js');

const { insertlanguagedetails, inserttechnologydetails } = require('./insertqueryfunction.js');

const { getpreviouscompanyname, getpreviouslanguage, getprevioustechnology, getpreviousreferencecontact, getpreviouspreference } = require('./selectqueryfunction.js');

const { updateeducationdetails, updateexperiencedetails, updatelanguagedetails, updatetechnologydetails, updatereferencedetails, updatepreferencedetails } = require('./updatequeryfunction.js');


async function jobapplicationformajaxsubmitupdate(req, res) {


    let jobapplicationformaction = {
        formsubmit: "",
        formupdate: ""
    };

    let student_id = 0;
    let statearray = [];
    let cityarray = [];

    let preferedlocationarray = [];
    let departmentarray = [];
    let languagearray = [];
    let technologyarray = [];
    let optionidwithnamearray = [];

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

    let datafrompostrquest = req.body;
    // console.log("update succ");
    // console.log(datafrompostrquest);

    student_id = datafrompostrquest.student_id;

    //set form action for ejs
    jobapplicationformaction.formupdate = "/jobapplicationformupdatesuccessfullyajax";
    jobapplicationformaction.formsubmit = "";

    // console.log(student_id);

    let optionidwithnametemp = getoptionidwithname().then((data) => {
        data.forEach((element) => {
            optionidwithnamearray.push(element);
        });
    });

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


    let languagetemp = optionmaster(1, "languageid", "language").then((data) => {
        data.forEach((element) => {
            languagearray.push(element);
        });
    });

    let technologytemp = optionmaster(4, "technologyid", "technology").then((data) => {
        data.forEach((element) => {
            technologyarray.push(element);
        });
    });

    //wait before then execute
    await statetemp;
    await optionidwithnametemp;

    await citytemp;

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

        return res.render('Task-16/JobApplicationForm_exercise1_view/jobapplicationformexercise1', {
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

                console.log(updatebasicdetails);
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

                        var previoustechnologytemp = getprevioustechnology(student_id).then((data) => {
                            data.forEach((element) => {
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
                                            inserttechnologydetails(student_id, techinoptionmaster.technologyid, tech.proficiency);
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
                        return res.json({ message: "Someting Went Wrong...." });
                    }
                });
            });

            return res.json({ message: "Thank You For Update...." });

        } catch (err) {
            console.log("Unhandle Error: " + err);
            // errorobject.recordupdateerror = "Record Update Error";
        }
    }
}


module.exports = jobapplicationformajaxsubmitupdate;