const connection = require('../../../connection.js');
const logger = require('../../../logs.js');

// Function to insert education detail
function insertEducationDetail(educationdetails) {
    return new Promise((resolve, reject) => {
        // const inserteducationdetails = `INSERT INTO educationdetails(candidate_id,option_id,nameOfCourse,nameOfBoard_Or_Univarsity,passingyear,percentage) VALUES(${lastRecordInsertid},"${optionId}","${courseName}","${nameOfBoard_Or_Univarsity}","${passingyear}","${percentage}")`;

        const inserteducationdetails = "INSERT INTO educationdetails(candidate_id,option_id,nameOfCourse,nameOfBoard_Or_Univarsity,passingyear,percentage) VALUES ?";

        connection.query(inserteducationdetails, [educationdetails], (err, result) => {
            if (err) {
                logger.logError("Error in education detail insertion: " + err)
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
                logger.logError("Error in experience details insertion:", err);
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
                logger.logError("Error in reference details insertion:", err);
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


module.exports = { insertEducationDetail,insertExperienceDetail,insertReferenceDetail,inserttechnologyknown,insertlanguageknown }