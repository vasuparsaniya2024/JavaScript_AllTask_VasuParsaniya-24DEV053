function jobapplicationformdatabackend(req,res,next){
    req.errorobject = {};

    const { fname, lname, designation, address1, address2, email, phonenumber, city, gender, state, relationship, zipcode, dob} = req.body;

    let errorfound = false;

    const regexwhitespace = /\s/;
    const regexemail = /^[a-z0-9]+@[a-z]+\.[a-z]{2,3}$/;
    const regexdateofbith = /([12]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01]))/;
 
    if(!fname){
        req.errorobject.firstname = "*require";
        errorfound = true;
    }else if(fname.trim().length === 0){
        req.errorobject.firstname = "* Please Enter valid firstname";
        errorfound = true;
    }

    if(!lname){
        req.errorobject.lastname = "*require";
        errorfound = true;
    }else if(lname.trim().length === 0){
        req.errorobject.lastname = "* Please Enter valid lastname";
        errorfound = true;
    }
    
    if(!designation){
        req.errorobject.designation = "*require";
    }else if(designation.trim().length === 0){
        req.errorobject.designation = "* Please Enter valid designation";
    }

    if(!address1){
        req.errorobject.address1 = "*require";
    }else if(address1.trim().length === 0){
        req.errorobject.address1 = "* Please Enter valid address1";
    }

    //address2 is not require but check it contains space or not
    if(address2 && address2.trim().length === 0){
        req.errorobject.address2 = "* Please Enter valid address2";
    }

    if(!email){
        req.errorobject.email = "*require";
    }else if(!regexemail.test(email)){
        req.errorobject.email = "* Please Enter valid email";
    }

    if(!phonenumber){
        req.errorobject.phonenumber = "*require";
    }else if(isNaN(phonenumber) || phonenumber.length !== 10){
        req.errorobject.phonenumber = "* Please Enter valid phoennumber";
    }

    if(!city){
        req.errorobject.city = "*require";
    }else if(city.trim().length === 0){
        req.errorobject.city = "* please Enter valid city";
    }

    if(!gender){
        req.errorobject.gender = "* Please select gender";
    }

    if(!state){
        req.errorobject.state = "* please select state";
    }

    if(!relationship){
        req.errorobject.relationship = "* Please select relationship";
    }

    if(!zipcode){
        req.errorobject.zipcode = "*require";
    }else if(isNaN(zipcode) || zipcode.trim().length === 0){
        req.errorobject.zipcode = "* Please Enter valid zipcode";
    }

    if(!dob){
        req.errorobject.dob = "*require";
    }else if(!regexdateofbith.test(dob) && dob.length !== 0){
        req.errorobject.dob = "* Please Enter valid Date of birth(YYYY-MM-DD)s";
    }

    //------------------------education details validation 

    const { educationdetailscheckbox1, educationdetailscheckbox2, educationdetailscheckbox3, educationdetailscheckbox4,nameofboardssc, passingyearssc,percentagessc,nameofboardhsc,passingyearhsc,percentagehsc,nameofcoursebachelor,nameofuniversitybachelor,passingyearbachelor,percentagebachelor,nameofcoursemaster,nameofuniversitymaster,passingyearmaster,percentagemaster} = req.body;

    let cureent_year = new Date().getFullYear();

    // console.log(educationdetailscheckbox1);
    if(!educationdetailscheckbox1){
        req.errorobject.educationdetailscheckbox1 = "* require";
    }

    if(!nameofboardssc){
        req.errorobject.nameofboardssc = "* require";
    }else if(nameofboardssc.trim().length === 0){
        req.errorobject.nameofboardssc = "* Please Enter name of board";
    }

    //passingyearssc
    if(!passingyearssc){
        req.errorobject.passingyearssc = "* require";
    }else if(isNaN(passingyearssc)){
        req.errorobject.passingyearssc = "* Only Number is Allow";
    }else if(passingyearssc.length !== 4){
        req.errorobject.passingyearssc = "* Year is not proper";
    }else if((parseInt(passingyearssc) < 1950) || (parseInt(passingyearssc))>cureent_year){
        req.errorobject.passingyearssc = "* please Enter year 1950 to Current year";
    }

    //percentagessc
    let percentagefloatssc = parseFloat(percentagessc);  //convert into float
    if(!percentagessc){
        req.errorobject.percentagessc = "* require";
    }else if (isNaN(percentagefloatssc) || percentagefloatssc < 0 || percentagefloatssc > 100) {
        req.errorobject.percentagessc = "* Please Enter Percentage between 0 and 100";
    }

    //this field is not select then it is not require
    if(educationdetailscheckbox2){
        if(!nameofboardhsc){
            req.errorobject.nameofboardhsc = "* require";
        }else if(nameofboardhsc.trim().length === 0){
            req.errorobject.nameofboardhsc = "* Please Enter nameof board";
        }

        //passing year hsc
        if(!passingyearhsc){
            req.errorobject.passingyearhsc = "* require";
        }else if(isNaN(passingyearhsc)){
            req.errorobject.passingyearhsc = "* Only Number is Allow";
        }else if(passingyearhsc.length !== 4){
            req.errorobject.passingyearhsc = "* Year is not proper";
        }else if((parseInt(passingyearhsc) < 1950) || (parseInt(passingyearhsc))>cureent_year){
            req.errorobject.passingyearhsc = "* please Enter year 1950 to Current year";
        }

        //percentagehsc
    let percentagefloathsc = parseFloat(percentagehsc);  //convert into float
    if(!percentagehsc){
        req.errorobject.percentagehsc = "* require";
    }else if (isNaN(percentagefloathsc) || percentagefloathsc < 0 || percentagefloathsc > 100) {
        req.errorobject.percentagehsc = "* Please Enter Percentage between 0 and 100";
        errorfoundeducationdetails = true;
    }
    }


    //this field is not select then it is not require
    if(educationdetailscheckbox3){

        if(!nameofcoursebachelor){
            req.errorobject.nameofcoursebachelor = "* require";
        }else if(nameofcoursebachelor.trim().length === 0){
            req.errorobject.nameofcoursebachelor = "* Please Enter nameof course";
        }

        if(!nameofuniversitybachelor){
            req.errorobject.nameofuniversitybachelor = "* require";
        }else if(nameofuniversitybachelor.trim().length === 0){
            req.errorobject.nameofuniversitybachelor = "* Please Enter nameof course";
        }

        //passing year master
        if(!passingyearbachelor){
            req.errorobject.passingyearbachelor = "* require";
        }else if(isNaN(passingyearbachelor)){
            req.errorobject.passingyearbachelor = "* Only Number is Allow";
        }else if(passingyearbachelor.length !== 4){
            req.errorobject.passingyearbachelor = "* Year is not proper";
        }else if((parseInt(passingyearbachelor) < 1950) || (parseInt(passingyearbachelor))>cureent_year){
            req.errorobject.passingyearbachelor = "* please Enter year 1950 to Current year";
        }

        //percentagemaster
    let percentagefloatbachelor = parseFloat(percentagebachelor);  //convert into float
    if(!percentagebachelor){
        req.errorobject.percentagebachelor = "* require";
    }else if (isNaN(percentagebachelor) || percentagefloatbachelor < 0 || percentagefloatbachelor > 100) {
        req.errorobject.percentagebachelor = "* Please Enter Percentage between 0 and 100";
    }
    }


    //this field is not select then it is not require
    if(educationdetailscheckbox4){

        if(!nameofcoursemaster){
            req.errorobject.nameofcoursemaster = "* require";
        }else if(nameofcoursemaster.trim().length === 0){
            req.errorobject.nameofcoursemaster = "* Please Enter nameof course";
        }

        if(!nameofuniversitymaster){
            req.errorobject.nameofuniversitymaster = "* require";
        }else if(nameofuniversitymaster.trim().length === 0){
            req.errorobject.nameofuniversitymaster = "* Please Enter nameof course";
        }

        //passing year master
        if(!passingyearmaster){
            req.errorobject.passingyearmaster = "* require";
        }else if(isNaN(passingyearmaster)){
            req.errorobject.passingyearmaster = "* Only Number is Allow";
        }else if(passingyearmaster.length !== 4){
            req.errorobject.passingyearmaster = "* Year is not proper";
        }else if((parseInt(passingyearmaster) < 1950) || (parseInt(passingyearmaster))>cureent_year){
            req.errorobject.passingyearmaster = "* please Enter year 1950 to Current year";
        }

        //percentage master
    let percentagefloatmaster = parseFloat(percentagemaster);  //convert into float
    if(!percentagemaster){
        req.errorobject.percentagemaster = "* require";
    }else if (isNaN(percentagemaster) || percentagefloatmaster < 0 || percentagefloatmaster > 100) {
        req.errorobject.percentagemaster = "* Please Enter Percentage between 0 and 100";
    }
    }
    
    //------------experience validation
    //backend side validation not done in experience

    // const { companyname,companydesignation,companyfrom,companyto } = req.body;

    // //all field not undefined then check
    // if(companyname || companydesignation || companyfrom || companyto){

    //     if(companyname.length === 0){
    //         req.errorobject.companyname = 
    //     }
    // }

    //-----------reference validation 
    //backend side reference validation not done in reference

    //------------preferance validation
    
    if(!req.body.preferedlocation){ 
        req.errorobject.preferancelocationdropdown = "* require";
    }

    if(!req.body.department){
        req.errorobject.preferancedepartmentdropdown = "* require";
    }

    if((isNaN(req.body.noticeperiod) || req.body.noticeperiod.trim().length === 0) && req.body.noticeperiod !== ""){
        req.errorobject.noticeperiod = "* Please Enter Only Number";
    }

    if((isNaN(req.body.expectedctc) || req.body.expectedctc.trim().length === 0) && req.body.expectedctc !== ""){
        req.errorobject.expectedctc = "* Please Enter Only Number";
    }

    if((isNaN(req.body.currentctc) || req.body.currentctc.trim().length === 0) && req.body.currentctc !== ""){
        req.errorobject.currentctc = "* Please Enter Only Number";
    }

    //-----------------Technology Known Validation

    if(req.body.technology1){
        if(!req.body.firsttechnologyproficiency){
            req.errorobject.technology1 = "* Please Select Proficiency";
        }
    }

    if(req.body.technology2){
        if(!req.body.secondtechnologyproficiency){
            req.errorobject.technology2 = "* Please Select Proficiency";
        }
    }

    if(req.body.technology3){
        if(!req.body.thirdtechnologyproficiency){
            req.errorobject.technology3 = "* Please Select Proficiency";
        }
    }

    if(req.body.technology4){
        if(!req.body.fourthtechnologyproficiency){
            req.errorobject.technology4 = "* Please Select Proficiency";
        }
    }

    //---------Languge Known

    if(req.body.language1){
        if(!req.body.languageread1 && !req.body.languagewrite1 && !req.body.languagespeak1){
            req.errorobject.language1 = "* Please Select Language profoiciency";
        }
    }

    if(req.body.language2){
        if(!req.body.languageread2 && !req.body.languagewrite2 && !req.body.languagespeak2){
            req.errorobject.language2 = "* Please Select Language profoiciency";
        }
    }

    if(req.body.language3){
        if(!req.body.languageread3 && !req.body.languagewrite3 && !req.body.languagespeak3){
            req.errorobject.language3 = "* Please Select Language profoiciency";
        }
    }

    next();
}



module.exports = {jobapplicationformdatabackend : jobapplicationformdatabackend}