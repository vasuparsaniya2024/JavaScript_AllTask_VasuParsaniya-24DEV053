const connection = require('../../connection.js');
const logger = require('../../logs.js');

async function studentattandancereport(req, res) {
    const month = Number(req.query.month) || 1;
    let currentPage = req.query.page || 1;
    const offset = process.env.RECORS_IN_SINGLEPAGE * (currentPage - 1);
    const orderyColumn = req.query.orderby;
    const orderbytype = req.query.orderbytype || "ASC";
    let year = "2023";
    let monthnumber = "12";

    let totalRecords = 0;
    const querycountrecord = "SELECT COUNT(*) as numberofstudent FROM StudentDetails;"

    await new Promise((resolve, reject) => {
        connection.query(querycountrecord, (err, resultcount) => {
            try {
                if (err) throw err
                totalRecords = resultcount[0].numberofstudent;
                resolve();
            } catch (err) {
                reject();
            }
        });
    });

    let nextorderbytype = "ASC";
    if (orderbytype === "ASC") {
        nextorderbytype = "DESC"
    } else {
        nextorderbytype = "ASC"
    }

    //calculate number of dayes in particular month and year
    var monthdays = 0;
    function getDate(month, year) {
        let date = new Date(year, month, 1);
        let days = [];

        while (date.getMonth() === month) {
            monthdays++;
            days.push(new Date(date));
            date.setDate(date.getDate() + 1);
        }
        return monthdays;
    }

    if (month === 1) {
        year = "2023";
        monthnumber = "12";
        monthdays = getDate(11, 2023);
        // console.log("Dec"+monthdays);
    } else if (month === 2) {
        year = "2024";
        monthnumber = "01";
        monthdays = getDate(0, 2024);
        // console.log("jan"+monthdays);
    } else if (month === 3) {
        year = "2024";
        monthnumber = "02";
        monthdays = getDate(1, 2024);
        // console.log("feb"+monthdays);
    }


    if (orderyColumn !== undefined && orderyColumn !== "") {
        var query = "SELECT StudentAttandanceRecord.student_id as student_id,StudentDetails.studentname as studentname," +
            "count(*) as numberofattandance, CONCAT(ROUND(((count(*)*100)/" + monthdays + "),2),'%') as percentage" + " " +
            "FROM StudentAttandanceRecord" + " " +
            "INNER JOIN StudentDetails" + " " +
            "WHERE EXTRACT(YEAR from attandancedate)=" + year + " " + "and EXTRACT(MONTH from attandancedate)=" + monthnumber + " " + "and presentorabsent = 'P' and StudentDetails.student_id = StudentAttandanceRecord.student_id" + " " +
            "GROUP BY student_id" + " " +
            "ORDER BY " + orderyColumn + " " + orderbytype + " " +
            "LIMIT" + " " + offset + "," + process.env.RECORS_IN_SINGLEPAGE;
    } else {
        var query = "SELECT StudentAttandanceRecord.student_id as student_id,StudentDetails.studentname as studentname," +
            "count(*) as numberofattandance, CONCAT(ROUND(((count(*)*100)/" + monthdays + "),2),'%') as percentage" + " " +
            "FROM StudentAttandanceRecord" + " " +
            "INNER JOIN StudentDetails" + " " +
            "WHERE EXTRACT(YEAR from attandancedate)=" + year + " " + "and EXTRACT(MONTH from attandancedate)=" + monthnumber + " " + "and presentorabsent = 'P' and StudentDetails.student_id = StudentAttandanceRecord.student_id" + " " +
            "GROUP BY student_id" + " " + "LIMIT" + " " + offset + "," + process.env.RECORS_IN_SINGLEPAGE;
    }

    connection.query(query, (err, result) => {
        try {
            if (err) throw err
            res.render('Task-11_studentattandancereport/studentAttandance', {
                studentAttandance: result,
                month: month,
                pageCount: + totalRecords / process.env.RECORS_IN_SINGLEPAGE,
                pageSize: + process.env.RECORS_IN_SINGLEPAGE,
                currentPage: +currentPage,
                orderby: orderyColumn,
                orderbytype: orderbytype,
                nextorderbytype: nextorderbytype
            });
            monthdays = 0;
        } catch (err) {
            logger.logError("Error In student attandace: " + err);
        }
    });
}


module.exports = studentattandancereport;