
var errorobject = {};

function userregistrationvalidation(registrationData) {
    // return new Promise((resolve,reject)=>{
    //     const basicdetailserrorobject = basicdetailsvalidate(registrationData);  //return object   
    //     // console.log(basicdetailserrorobject);
    //     //add basicdetails error

    //     if (Object.keys(basicdetailserrorobject).length > 0) {
    //         errorobject.basicdetailserror = basicdetailserrorobject; //extract object from object
    //     } else {
    //         errorobject = {};
    //     }
    //     resolve(errorobject);
    // });

    const basicdetailserrorobject = basicdetailsvalidate(registrationData);  //return object   
    // console.log(basicdetailserrorobject);

    //add basicdetails error
    if (Object.keys(basicdetailserrorobject).length > 0) {
        errorobject.basicdetailserror = basicdetailserrorobject; //extract object from object
    } else {
        errorobject = {};
    }
        return errorobject;
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
    } else if ((isNaN(basicDetails.phonenumber) || basicDetails.phonenumber.length !== 10 || basicDetails.phonenumber.trim().length === 0 || phonenumber.value.charAt(0) === "0") && basicDetails.phonenumber !== "") {
        basicdetailserror.phonenumber = "* Please Enter Valid phonenumber";
    } else {
        delete basicdetailserror.phonenumber;
    }

    // console.log(basicdetailserror);

    return basicdetailserror;

}


function passwordvalidation(passwordData) {
   
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
