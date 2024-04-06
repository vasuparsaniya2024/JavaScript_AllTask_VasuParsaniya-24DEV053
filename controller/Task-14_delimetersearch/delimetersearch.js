const connection = require('../../connection.js');
const logger = require('../../logs.js');

function delimetersearchget(req, res) {

    let ObjectData = {
        errorInEnterInput: "",
        erroInDataFound: "",
        data: []
    }

    let queryInput = "SELECT studentname,email,phonenumber,city,state,zipcode FROM StudentDetails;"
    const urlPath = req.path;
    const currentPage = req.query.page || 1;

    ObjectData.query = queryInput;
    ObjectData.urlPath = urlPath;

    if (queryInput.length === 0) {
        ObjectData.errorInEnterInput = "Please Enter Query.."
        ObjectData.erroInDataFound = "";
        res.render('Task-14/DelimeterSearch_exercise5/delimetersearch', {
            ObjectData: ObjectData
        });
    } else {
        connection.query(queryInput, (err, result) => {
            try {
                if (err) throw err
                ObjectData.data = result;
                ObjectData.errorInEnterInput = "";
                ObjectData.erroInDataFound = "";
                ObjectData.querybeforesplit = "";
                if (result.length === 0) {
                    ObjectData.erroInDataFound = "Data Not Found...";
                }
                res.render('Task-14/DelimeterSearch_exercise5/delimetersearch', {
                    ObjectData: ObjectData
                });
            } catch (err) {
                // console.log("Data Not Found"); 
                ObjectData.erroInDataFound = "Data Not Found..";
                ObjectData.errorInEnterInput = "";
                ObjectData.data = result;
                res.render('Task-14/DelimeterSearch_exercise5/delimetersearch', {
                    ObjectData: ObjectData
                });
            }
        });
    }
}

function delimetersearchpost(req, res) {

    let ObjectData = {
        errorInEnterInput: "",
        erroInDataFound: "",
        data: []
    }

    let queryInput = req.body.inputquery;
    const urlPath = req.path;
    const currentPage = req.query.page || 1;
    // console.log(queryInput);

    ObjectData.querybeforesplit = queryInput;

    const delimeterarray = ["_", "^", "$", "{", "}", ";"];

    const objectmapdelimeter = {
        "_": "studentname",
        "^": "email",
        "$": "phonenumber",
        "{": "city",
        "}": "state",
        ";": "zipcode"
    }

    // console.log(objectmapdelimeter.hasOwnProperty('_'));
    const fieldvalue = {
        "studentname": [],
        "email": [],
        "phonenumber": [],
        "city": [],
        "state": [],
        "zipcode": []
    }
    // let fieldvalue = {};
    let substring = "";
    let statusForFound = false;
    let statuForNotFound = false;

    //-------------------split----------------------------------------
    for (let element of delimeterarray) {
        let queryInputSplit = queryInput.split(element);
        // console.log(queryInputSplit);

        if (queryInputSplit.length <= 2) {
            //if all field use
            if (queryInputSplit[1] !== undefined) {
                for (let j = 1; j < queryInputSplit.length; j++) {

                }
                for (let i = 0; i < queryInputSplit[1].length; i++) {
                    for (let entry of delimeterarray) {
                        if (queryInputSplit[1].charAt(i) === entry) {
                            substring = queryInputSplit[1].substring(0, i);
                            statusForFound = true;
                            statuForNotFound = false;
                            break;
                        } else {
                            statuForNotFound = true;
                        }
                    }
                    if (statusForFound === true) {
                        break;
                    }
                }

                if (statuForNotFound) {
                    statuForNotFound = false;
                    let valueofdelimeter = objectmapdelimeter[element];
                    fieldvalue[valueofdelimeter].push(queryInputSplit[1]);
                    // console.log(objectmapdelimeter[element]);
                }

                if (statusForFound) {
                    statusForFound = false;

                    let valueofdelimeter = objectmapdelimeter[element];
                    fieldvalue[valueofdelimeter].push(substring);
                    // console.log(objectmapdelimeter[element]);
                }
            } else {
                // if all field not enter
                for (let i = 0; i < queryInputSplit[0].length; i++) {
                    for (let entry of delimeterarray) {
                        if (queryInputSplit[0].charAt(i) === entry) {
                            substring = queryInputSplit[0].substring(0, i);
                            statusForFound = true;
                            statuForNotFound = false;
                            break;
                        } else {
                            statuForNotFound = true;
                        }
                    }
                    if (statusForFound === true) {
                        break;
                    }
                }

                if (statuForNotFound) {
                    statuForNotFound = false;
                    let valueofdelimeter = objectmapdelimeter[element];
                    fieldvalue[valueofdelimeter].push(queryInputSplit[1]);
                    // console.log(objectmapdelimeter[element]);
                }

                if (statusForFound) {
                    statusForFound = false;

                    let valueofdelimeter = objectmapdelimeter[element];
                    fieldvalue[valueofdelimeter].push(substring);
                    // console.log(objectmapdelimeter[element]);
                }
            }
        } else {
            let statusForGreaterthan = false;
            let statusForGreaterthannotfound = false;

            for (let i = 1; i < queryInputSplit.length; i++) {
                for (let j = 1; j < queryInputSplit[i].length; j++) {
                    for (let entry of delimeterarray) {
                        if (queryInputSplit[i].charAt(j) === entry) {
                            substring = queryInputSplit[i].substring(0, j);
                            let valueofdelimeter = objectmapdelimeter[element];
                            fieldvalue[valueofdelimeter].push(substring);
                            statusForGreaterthan = true;
                            statusForGreaterthannotfound = false;
                            break;
                        } else {
                            statusForGreaterthannotfound = true;
                        }
                    }
                    if (statusForGreaterthan === true) {
                        statusForGreaterthan = false;
                        break;
                    }
                }
                if (statusForGreaterthannotfound) {
                    let valueofdelimeter = objectmapdelimeter[element];
                    fieldvalue[valueofdelimeter].push(queryInputSplit[i]);
                    statusForGreaterthannotfound = false;
                }
            }
        }
    }

    //         _vasu^v@gmail.com$9586606859{junagadh}gujarat;362640
    // _Shyam^it.ah2tmb@gmail.com$7186630228{Panchkula}Mizoram;660399

    // _vasu_Shyam^it.ah2tmb@gmail.com$7186630228{Panchkula}Mizoram;660399
    // _Shyam^it.ah2tmb@gmail.com_vasu$7186630228{Panchkula}Mizoram;660399

    //-------------------------------------------
    // ObjectData.query = queryInput;
    // ObjectData.urlPath = urlPath;


    // const query = "SELECT studentname,email,phonenumber,city,state,zipcode FROM StudentDetails WHERE studentname like '%"+fieldvalue.studentname[0]+"%'"+" "+" AND email like '%"+fieldvalue.email[0]+"%'"+" "+" AND phonenumber like '%"+fieldvalue.phonenumber[0]+"%'"+" "+" AND city like '%"+fieldvalue.city+"%'"+" "+" AND state like '%"+fieldvalue.state[0]+"%'"+" "+" AND zipcode like '%"+fieldvalue.zipcode+"%';";
    // console.log(query);

    //--------------query with IN
    // const query = "SELECT studentname,email,phonenumber,city,state,zipcode FROM StudentDetails WHERE studentname IN('"+fieldvalue.studentname.join("','")+"')"+" "+" AND email IN('"+fieldvalue.email.join("','")+"')"+" "+" AND phonenumber IN('"+fieldvalue.phonenumber.join("','")+"')"+" "+" AND city IN('"+fieldvalue.city.join("','")+"')"+" "+" AND state IN('"+fieldvalue.state.join("','")+"')"+" "+" AND zipcode IN('"+fieldvalue.zipcode.join("','")+"');";


    const query = "SELECT studentname,email,phonenumber,city,state,zipcode FROM StudentDetails WHERE (studentname LIKE '%" + fieldvalue.studentname.join("%' or studentname LIKE '%") + "%')" + " " + " AND (email LIKE '%" + fieldvalue.email.join("%' or email LIKE '%") + "%')" + " " + " AND (phonenumber LIKE '%" + fieldvalue.phonenumber.join("%' or phonenumber LIKE '%") + "%')" + " " + " AND (city LIKE '%" + fieldvalue.city.join("%' or city LIKE '%") + "%')" + " " + " AND (state LIKE '%" + fieldvalue.state.join("%' or state LIKE '%") + "%')" + " " + " AND (zipcode LIKE '%" + fieldvalue.zipcode.join("%' or zipcode LIKE '%") + "%');";

    connection.query(query, (err, result) => {
        try {
            if (err) throw err
            ObjectData.data = result;
            ObjectData.errorInEnterInput = "";
            ObjectData.erroInDataFound = "";

            res.render('Task-14/DelimeterSearch_exercise5/delimetersearch', {
                ObjectData: ObjectData
            });
        } catch (err) {
            logger.info("Data Not Found:" + err);
            ObjectData.erroInDataFound = "Data Not Found..";
            ObjectData.errorInEnterInput = "";
            ObjectData.data = result;
            res.render('Task-14/DelimeterSearch_exercise5/delimetersearch', {
                ObjectData: ObjectData
            });
        }
    });
}

module.exports = { delimetersearchget, delimetersearchpost }