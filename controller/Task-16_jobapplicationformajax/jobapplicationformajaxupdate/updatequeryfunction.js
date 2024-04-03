const connection = require('../../../connection.js');

/* *in educationdetails if educationdetailscheckbox1 select then ssc,
   * if educationdetailscheckbox2 then hsc
   * if educationdetailscheckbox3 then bachelor 
   * if educationdetailscheckbox4 then master*/


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

module.exports = { updateeducationdetails,updateexperiencedetails,updatelanguagedetails,updatetechnologydetails,updatereferencedetails,updatepreferencedetails }