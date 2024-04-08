const connection = require('../../connection.js');
const logger = require('../../logs.js');

function studentdetails(req, res) {
    let query = "SELECT * FROM StudentMaster LIMIT 50000;";

    let arrayofHeader = ["Student ID", "StudentName", "Email", "PhoneNumber", "Gender", "Address1", "Address2", "City", "State", "ZipCode"];
    connection.query(query, (err, result) => {
        try {
            if (err) throw err
            res.render('Task-9_studentdetails/userlist', {
                arrayUser: result,
                arrayofHeader: arrayofHeader
            });
        } catch (err) {
            logger.logError("Error In Get Student Details: " + err);
        }
    });
}

module.exports = studentdetails