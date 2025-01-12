const connection = require('../../connection.js');
const logger = require('../../logs.js');

let totalRecords = 0;

function studentdetailswithpaggination(req, res) {
    // let totalRow = "SELECT count(*) FROM StudentMaster";

    const currentPage = req.query.page || 1;
    const sortingColumn = req.query.orderby;
    const orderbytype = req.query.orderbytype;
    let arrayofHeader = ["Student ID", "StudentName", "Email", "PhoneNumber", "Gender", "Address1", "Address2",
        "City", "State", "ZipCode"];

    let queryForRecordsCount = "SELECT COUNT(*) FROM StudentMaster";

    connection.query(queryForRecordsCount, (err, result) => {
        try {
            if (err) throw err
            totalRecords = result;
        } catch (err) {
            logger.logError("Error In Records Count: " + err);
        }
    });

    const offset = process.env.RECORS_IN_SINGLEPAGE * (currentPage - 1);

    if (typeof sortingColumn !== "undefined") {
        const queryOrderBy = "SELECT * FROM StudentMaster ORDER BY" + " " + sortingColumn + " " + orderbytype + " LIMIT" + " " + offset + ","
            + process.env.RECORS_IN_SINGLEPAGE;
        connection.query(queryOrderBy, (err, result) => {
            try {
                if (err) throw err
                res.render('Task-10_studentlistwithpaggination/PagginationWithComponent', {
                    arrayUser: result,
                    arrayofHeader: arrayofHeader,
                    pageCount: +process.env.TOTAL_PAGE,
                    pageSize: +process.env.RECORS_IN_SINGLEPAGE,
                    currentPage: +currentPage,       //currentPage convert into number using + 
                    sortingColumn: sortingColumn,
                    orderbytype: orderbytype
                });
            } catch (err) {
                logger.logError("Error In Sorting: " + err);
            }
        });
    } else {
        let query = "SELECT * FROM StudentMaster LIMIT" + " " + offset + "," + process.env.RECORS_IN_SINGLEPAGE;


        connection.query(query, (err, result) => {
            try {
                if (err) throw err
                res.render('Task-10_studentlistwithpaggination/PagginationWithComponent', {
                    arrayUser: result,
                    arrayofHeader: arrayofHeader,
                    pageCount: +process.env.TOTAL_PAGE,
                    pageSize: +process.env.RECORS_IN_SINGLEPAGE,
                    currentPage: +currentPage,      //currentPage convert into number using +
                    sortingColumn: sortingColumn
                });
            } catch (err) {
                logger.logError("Error In Get Student Detail: " + err);
            }
        });

    }
}


module.exports = studentdetailswithpaggination;