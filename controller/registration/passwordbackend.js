function passwordbackendvalidation(req, res, next) {
    const requestData = req.body;

    let errorobjectbackend = {};

    let passworderrorobject = passwordvalidate(requestData);  //return object   

    

    //add basicdetails error
    if (Object.keys(passworderrorobject).length > 0) {
        passworderrorobject.passworderror = passworderrorobject; //extract object from object
    } else {
        errorobjectbackend = {};
    }
    if (Object.keys(errorobjectbackend).length > 0) {
        return res.status(400).json(errorobjectbackend);
    } else {
        next();
    }
}


function passwordvalidate(passwordDetails) {
    // let basicdetailsvalidationstatus = false;
    let passworderror = {};

    //password 
    if (!passwordDetails.password) {    //passwordDetails.password.length === 0
        passworderror.password = "* require";
    } else if (passwordDetails.password.trim().length === 0 && passwordDetails.password !== "") {
        passworderror.password = "* Please Enter Password";
    }

    //confirmpassword   
    if (passwordDetails.confirmpassword.length === 0) {
        passworderror.confirmpassword = '* require';
    } else if (passwordDetails.confirmpassword.trim().length === 0 && passwordDetails.confirmpassword !== "") {
        passworderror.confirmpassword = "* Please Enter confirm password";
    } else if (passwordDetails.confirmpassword && passwordDetails.password !== passwordDetails.confirmpassword) {
        passworderror.confirmpassword = "* Confirm password is not match";
    }

    return passworderror;

}

module.exports = { passwordbackendvalidation: passwordbackendvalidation };