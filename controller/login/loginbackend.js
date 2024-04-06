function logindetailsbackend(req,res,next){
    const requestData = req.body;

    // console.log(requestData);
    let errorobjectbackend = {};

    let loginerrorobject = logindetailsvalidate(requestData);

    if(Object.keys(loginerrorobject) > 0){

        errorobjectbackend.logindetailserror = loginerrorobject;
    }else{
        errorobjectbackend = {};
    }

    if(Object.keys(errorobjectbackend).length>0){
        return res.status(400).json(errorobjectbackend);
    }else{
        next();
    }
}

function logindetailsvalidate(loginDetails){
    let logindataerror = {};
    
    //email
    const regexemail = /^[a-z0-9]+@[a-z]+\.[a-z]{2,3}$/;

    if (loginDetails.username.length === 0) {
        logindataerror.username = "* require";
    } else if (!regexemail.test(loginDetails.username) && loginDetails.username !== "") {
        logindataerror.username = "* Please Enter Valid Email";
    } else {
        delete logindataerror.username;
    }

    //password

    if(loginDetails.password.length === 0){
        logindataerror.password = "* require";
    }else if(loginDetails.password.trim().length === 0 && loginDetails.password !== ""){
        logindataerror.password = "* Please Enter Password";
    }else {
        delete logindataerror.username;
    }
    return logindataerror;
}

module.exports = { logindetailsbackend:logindetailsbackend }