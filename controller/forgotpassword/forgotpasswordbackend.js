function forgotpasswordbackendvalidation(req, res, next) {
    const requestData = req.body;
    // console.log(requestData );

    let errorobjectbackend = {};

    let forgotpassworderrorobject = forgotpasswordvalidate(requestData);  //return object   

    
    //add basicdetails error
    if (Object.keys(forgotpassworderrorobject).length > 0) {
        errorobjectbackend.forgotpassworderror = forgotpassworderrorobject; //extract object from object
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

function forgotpasswordvalidate(forgotpasswordDetails) {
    // let basicdetailsvalidationstatus = false;
    let forgotpassworderror = {};

    //email
    const regexemail = /^[a-z0-9]+@[a-z]+\.[a-z]{2,3}$/;

    if (forgotpasswordDetails.email.length === 0) {
        forgotpassworderror.email = "* require";
    } else if (!regexemail.test(forgotpasswordDetails.email) && forgotpasswordDetails.email !== "") {
        forgotpassworderror.email = "* Please Enter Valid Email";
    } else {
        delete forgotpassworderror.email;
    }

    return forgotpassworderror;
}

module.exports = { forgotpasswordbackendvalidation: forgotpasswordbackendvalidation };