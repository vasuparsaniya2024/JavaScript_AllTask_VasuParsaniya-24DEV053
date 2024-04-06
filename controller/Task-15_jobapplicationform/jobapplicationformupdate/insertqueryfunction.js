/* *in educationdetails if educationdetailscheckbox1 select then ssc,
   * if educationdetailscheckbox2 then hsc
   * if educationdetailscheckbox3 then bachelor 
   * if educationdetailscheckbox4 then master*/

const connection = require('../../../connection.js');

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

module.exports = { insertlanguagedetails,inserttechnologydetails }