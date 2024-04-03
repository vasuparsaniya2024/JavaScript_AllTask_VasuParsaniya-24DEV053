/* *in educationdetails if educationdetailscheckbox1 select then ssc,
   * if educationdetailscheckbox2 then hsc
   * if educationdetailscheckbox3 then bachelor 
   * if educationdetailscheckbox4 then master*/

const connection = require('../../../connection.js');

//-----------useful in when first time page load with previous
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

//-------------------------------------------------------

//-----------use in update details

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
                // console.log(result);
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


module.exports = { geteducationdetails,getexperiencedetails,getlanguageknown,gettechnologyknown,getreferencecontact,getpreferencedetails,getpreviouscoursename,getpreviouscompanyname,getpreviouslanguage,getprevioustechnology,getpreviousreferencecontact,getpreviouspreference}