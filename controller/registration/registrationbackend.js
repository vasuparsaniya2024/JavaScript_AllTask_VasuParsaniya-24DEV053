function useregistrationbackendvalidation(req, res, next) {
    const requestData = req.body;
    // console.log(requestData );

    let errorobjectbackend = {};

    let basicdetailserrorobject = basicdetailsvalidate(requestData);  //return object   

    

    //add basicdetails error
    if (Object.keys(basicdetailserrorobject).length > 0) {
        errorobjectbackend.basicdetailserror = basicdetailserrorobject; //extract object from object
    } else {
        errorobjectbackend = {};
    }

    // console.log(errorobjectbackend);

    if (Object.keys(errorobjectbackend).length > 0) {
        return res.status(400).json(errorobjectbackend);
    } else {
        next();
    }
}

function basicdetailsvalidate(basicDetails) {
    // let basicdetailsvalidationstatus = false;
    let basicdetailserror = {};

    //firstname
    if (basicDetails.fname.length === 0) {
        basicdetailserror.fname = "* require";
    } else if (basicDetails.fname.trim().length === 0 && basicDetails.fname !== "") {
        basicdetailserror.fname = "* Please Enter Valid Firstname";
    } else {
        delete basicdetailserror.fname;
    }

    //lastname
    if (basicDetails.lname.length === 0) {
        basicdetailserror.lname = "* require";
    } else if (basicDetails.lname.trim().length === 0 && basicDetails.lname !== "") {
        basicdetailserror.lname = "* Please Enter Valid Lastname";
    } else {
        delete basicdetailserror.lname;
    }

    //email
    const regexemail = /^[a-z0-9]+@[a-z]+\.[a-z]{2,3}$/;

    if (basicDetails.email.length === 0) {
        basicdetailserror.email = "* require";
    } else if (!regexemail.test(basicDetails.email) && basicDetails.email !== "") {
        basicdetailserror.email = "* Please Enter Valid Email";
    } else {
        delete basicdetailserror.email;
    }

    //phonenumner
    if (basicDetails.phonenumber.length === 0) {
        basicdetailserror.phonenumber = "* require";
    } else if ((isNaN(basicDetails.phonenumber) || basicDetails.phonenumber.length !== 10 || basicDetails.phonenumber.trim().length === 0 || basicDetails.phonenumber.charAt(0) === "0") && basicDetails.phonenumber !== "") {
        basicdetailserror.phonenumber = "* Please Enter Valid phonenumber";
    } else {
        delete basicdetailserror.phonenumber;
    }

    // console.log(basicdetailserror);

    return basicdetailserror;

}

module.exports = { useregistrationbackendvalidation: useregistrationbackendvalidation };