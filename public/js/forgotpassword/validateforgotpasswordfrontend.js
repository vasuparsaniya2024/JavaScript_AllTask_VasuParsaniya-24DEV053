
var errorobject = {};

function forgotpasswordvalidation(forgotpasswordData) {

    const forgotpassworderrorobject = forgotpasswordvalidate(forgotpasswordData);  //return object   
    // console.log(forgotpassworderrorobject);

    //add basicdetails error
    if (Object.keys(forgotpassworderrorobject).length > 0) {
        errorobject.forgotpassworderror = forgotpassworderrorobject; //extract object from object
    } else {
        errorobject = {};
    }
        return errorobject;
}

function forgotpasswordvalidate(forgotpasswordDetails) {

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



function newforgotpasswordvalidation(passwordData) {
   
    const passworderrorobject = passwordsectionvalidation(passwordData);  //return object   
    // console.log(basicdetailserrorobject);

    //add basicdetails error
    if (Object.keys(passworderrorobject).length > 0) {
        errorobject.passworderror = passworderrorobject; //extract object from object
    } else {
        errorobject = {};
    }
        return errorobject;
}

function passwordsectionvalidation(passwordDetails) {

    let passworderrorobject = {};

    //password 
    if(passwordDetails.password.length === 0){
        passworderrorobject.password = "* require";
    }else if(passwordDetails.password.trim().length === 0 && passwordDetails.password !== ""){
        passworderrorobject.password = "* Please Enter Password";
    }

    
    //confirmpassword
    if(passwordDetails.confirmpassword.length === 0){
        passworderrorobject.confirmpassword = '* require';
    }else if(passwordDetails.confirmpassword.trim().length === 0 && passwordDetails.confirmpassword !== ""){
        passworderrorobject.confirmpassword = "* Please Enter confirm password";
    }else if(passwordDetails.password !== passwordDetails.confirmpassword){
        passworderrorobject.confirmpassword = "* Confirm password is not match";
    }

    return passworderrorobject;
}
