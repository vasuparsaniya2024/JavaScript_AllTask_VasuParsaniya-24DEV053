const connection = require('../../connection.js');

function dynamicgridform(req, res) {
    let ObjectData = {
        errorInEnterInput: "",
        erroInDataFound: "",
        data: []
    }
    ObjectData.errorInEnterInput = "";
    ObjectData.erroInDataFound = "";
    ObjectData.query = "";
    ObjectData.querybeforelimit = "";
    ObjectData.data = [];
    res.render('Task-13/dynamicGrid', {
        ObjectData: ObjectData
    });
}


function dynamicgridget(req, res) {

    let ObjectData = {
        errorInEnterInput: "",
        erroInDataFound: "",
        data: []
    }

    let queryInput = req.query.querystring;

    const urlPath = req.path;
    const currentPage = req.query.page || 1;

    const queryInputSplit = queryInput.split("LIMIT");
    ObjectData.querybeforelimit = queryInputSplit[0];
    let totalPage = 0;
    connection.query(queryInputSplit[0].trim() + ";", (err, result) => {
        if (result !== undefined) {
            totalPage = result.length / process.env.RECORS_IN_SINGLEPAGE;
        }
    });


    const offset = process.env.RECORS_IN_SINGLEPAGE * (currentPage - 1);
    const limit = " " + "LIMIT" + " " + offset + "," + process.env.RECORS_IN_SINGLEPAGE + ";";
    queryInput = queryInputSplit[0].trim() + limit;
   
    // console.log(urlPath);
    ObjectData.query = queryInput;
    ObjectData.urlPath = urlPath;

    if (queryInput.length === 0) {
        ObjectData.errorInEnterInput = "Please Enter Query.."
        ObjectData.erroInDataFound = "";
        res.render('Task-13/dynamicGrid', {
            ObjectData: ObjectData,
            pageCount: totalPage,
            pageSize: +process.env.RECORS_IN_SINGLEPAGE,
            currentPage: +currentPage
        });
    } else {
        connection.query(queryInput, (err, result) => {
            try {
                if (err) throw err
                ObjectData.data = result;
                ObjectData.errorInEnterInput = "";
                ObjectData.erroInDataFound = "";
                if (result.length === 0) {
                    ObjectData.erroInDataFound = "Data Not Found...";
                }
                res.render('Task-13/dynamicGrid', {
                    ObjectData: ObjectData,
                    pageCount: totalPage,
                    pageSize: +process.env.RECORS_IN_SINGLEPAGE,
                    currentPage: +currentPage
                });
            } catch (err) {
                // console.log("Data Not Found"); 
                ObjectData.erroInDataFound = "Data Not Found..";
                ObjectData.errorInEnterInput = "";
                ObjectData.data = result;
                res.render('Task-13/dynamicGrid', {
                    ObjectData: ObjectData
                });
            }
        });
    }
}

function dynamicgridpost(req, res) {
    let ObjectData = {
        errorInEnterInput: "",
        erroInDataFound: "",
        data: []
    }

    let queryInput = req.body.inputquery;
    const urlPath = req.path;
    const currentPage = req.query.page || 1;

    ObjectData.querybeforelimit = queryInput;


    let totalPage = 0;
    connection.query(queryInput, (err, result) => {
        if (result !== undefined) {
            totalPage = result.length / process.env.RECORS_IN_SINGLEPAGE;
        }
    });

    const queryInputSplit = queryInput.split(";");

    const offset = process.env.RECORS_IN_SINGLEPAGE * (currentPage - 1);

    const limit = " " + "LIMIT" + " " + offset + "," + process.env.RECORS_IN_SINGLEPAGE + ";";

    queryInput = queryInputSplit[0].trim() + limit;
    // console.log(queryInput);
    ObjectData.query = queryInput;
    ObjectData.urlPath = urlPath;


    if (queryInputSplit[0].length === 0) {
        ObjectData.errorInEnterInput = "Please Enter Query.."
        ObjectData.erroInDataFound = "";
        res.render('Task-13/dynamicGrid', {
            ObjectData: ObjectData,
            pageCount: totalPage,
            pageSize: +process.env.RECORS_IN_SINGLEPAGE,
            currentPage: +currentPage
        });
    } else {
        connection.query(queryInput, (err, result) => {
            try {
                if (err) throw err
                ObjectData.data = result;
                ObjectData.errorInEnterInput = "";
                ObjectData.erroInDataFound = "";
                if (result.length === 0) {
                    ObjectData.erroInDataFound = "Data Not Found...";
                }
                res.render('Task-13/dynamicGrid', {
                    ObjectData: ObjectData,
                    pageCount: totalPage,
                    pageSize: +process.env.RECORS_IN_SINGLEPAGE,
                    currentPage: +currentPage
                });
            } catch (err) {
                // console.log("Data Not Found");
                ObjectData.erroInDataFound = "Data Not Found..";
                ObjectData.errorInEnterInput = "";
                ObjectData.data = result;
                res.render('Task-13/dynamicGrid', {
                    ObjectData: ObjectData
                });
            }
        });
    }
}

module.exports = { dynamicgridform, dynamicgridget, dynamicgridpost };