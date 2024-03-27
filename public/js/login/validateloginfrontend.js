
var errorobject = {};

function userloginvalidation(loginDetails) {

    const logindetailserrorobject = logindetailsvalidate(loginDetails);  //return object   

    //add basicdetails error
    if (Object.keys(logindetailserrorobject).length > 0) {
        errorobject.logindetailserror = logindetailserrorobject; //extract object from object
    } else {
        errorobject = {};
    }
        return errorobject;
}


function logindetailsvalidate(loginDetails) {
    
    let loginerror = {};

    //email
    const regexemail = /^[a-z0-9]+@[a-z]+\.[a-z]{2,3}$/;

    if (loginDetails.username.length === 0) {
        loginerror.username = "* require";
    } else if (!regexemail.test(loginDetails.username) && loginDetails.username !== "") {
        loginerror.username = "* Please Enter Valid Email";
    } else {
        delete loginerror.username;
    }

    //password

    if(loginDetails.password.length === 0){
        loginerror.password = "* require";
    }else if(loginDetails.password.trim().length === 0 && loginDetails.password !== ""){
        loginerror.password = "* Please Enter Password";
    } else {
        delete loginerror.username;
    }


    return loginerror;
}

