//show current tab

var currenttab = 0;
var maxslidetab = 0;

function showcurrenttab(n) {
    let formtab = document.querySelectorAll(".formsection");

    let navlink = document.querySelectorAll(".navlink");

    navlink.forEach((link) => {
        link.classList.remove("navlinkstyle");
    })
    navlink[n].classList.add("navlinkstyle");
 
    if (window.location.pathname === "/jobapplicationformajax") {
        for (let i = 0; i < formtab.length; i++) {
            formtab[i].style.display = "none";
        }

        formtab[n].style.display = "block";

        if (n === 0) {
            document.getElementById("previousbutton").style.display = "none";
        } else {
            document.getElementById("previousbutton").style.display = "inline";
        }

        if (n === formtab.length - 1) {
            document.getElementById("submit").style.display = "inline";
            document.getElementById("nextbutton").style.display = "none";

        } else {
            document.getElementById("submit").style.display = "none";
            document.getElementById("nextbutton").style.display = "inline";
        }
    } else if (window.location.pathname === "/jobapplicationformupdateajax") {
        for (let i = 0; i < formtab.length; i++) {
            formtab[i].style.display = "none";
        }

        formtab[n].style.display = "block";

        if (n === 0) {
            document.getElementById("previousbutton").style.display = "none";
        } else {
            document.getElementById("previousbutton").style.display = "inline";
        }

        if (n === formtab.length - 1) {
            document.getElementById("nextbutton").style.display = "none";
            document.getElementById("update").style.display = "inline";

        } else {
            document.getElementById("update").style.display = "none";
            document.getElementById("nextbutton").style.display = "inline";
        }
    }

}


function nextprev(n) {

    let formtab = document.querySelectorAll(".formsection");
    let temp = currenttab + n;

    let jobapplicationformstatus = jobapplicationformdatafrontend();

    // let jobapplicationformstatus = true;

    // alert(jobapplicationformstatus);
    if (n === -1 || jobapplicationformstatus) {
        //currenttab display none
        formtab[currenttab].style.display = "none";
        // maxslidetab = Math.max(maxslidetab, currenttab);

        //increase currenttab
        currenttab = currenttab + n;
        showcurrenttab(currenttab);
    }
    // if(n === formtab.length - 2){
    //     currenttab = currenttab + n;
    //     showcurrenttab(currenttab);
    // }
}


// function nextprev(n) {
//     let formtab = document.querySelectorAll(".formsection");

//     let jobapplicationformstatus = jobapplicationformdatafrontend();

//     if ((n === -1 || jobapplicationformstatus) && (currenttab + n >= 0 && currenttab + n <= maxslide)) {
//         // Hide the current tab
//         formtab[currenttab].style.display = "none";

//         // Update maxslide if the current tab is greater
//         maxslide = Math.max(maxslide, currenttab);

//         // Increase/decrease current tab index
//         currenttab += n;

//         // Show the next/previous tab
//         showcurrenttab(currenttab);
//     }
// }


//add city 
async function getstateid() {
    const state = document.getElementById("state").value;

    var statename = {
        statename: state
    }

    // let xml = new XMLHttpRequest();
    // xml.open("POST","/state",true);
    // xml.setRequestHeader("Content-type","application/json; charset=utf-8");
    // xml.send(JSON.stringify(statename));

    const response = await fetch(`/jobapplicationformajax`, {
        method: 'POST',
        body: JSON.stringify(statename),
        headers: {
            'Content-Type': 'application/json'
        }
    });  //return promise 
    const cityarray = await response.json();
    // console.log(cityarray);


    const cityselectbox = document.getElementById("city");

    const option1 = document.createElement('option');
    option1.value = "";
    option1.textContent = "select city";

    cityselectbox.innerHTML = "";
    cityselectbox.appendChild(option1);

    cityarray.forEach((element, index) => {
        const createoption = document.createElement('option');
        createoption.value = element.cityname;
        createoption.textContent = element.cityname;
        createoption.setAttribute('id', `city${index + 1}`);
        cityselectbox.appendChild(createoption);
    });
}

//---------------------------validation----------------------
function jobapplicationformdatafrontend() {


    let errorvalidaterequirefields = false;

    const reqfields = document.querySelectorAll(".reqerror");
    const reqfieldcss = document.querySelectorAll(".reqerrorstyle");

    let formValid = true;

    //error show for require fields that is simmilar
    for (let i = 0; i < reqfields.length; i++) {
        if (reqfields[i].value.length === 0) {
            reqfieldcss[i].innerHTML = "* require";
            errorvalidaterequirefields = true;
        } else {
            reqfieldcss[i].innerHTML = "";
            errorvalidaterequirefields = false;
        }
    }

    //---------------------validate gender radio button
    const radiogender = document.getElementsByName("gender");
    const radioerror = document.getElementById("reqgender");
    let errorradiogender = true;


    for (let i = 0; i < radiogender.length; i++) {
        if (radiogender[i].checked) {
            errorradiogender = false;
            break;
        }
    }
    if (errorradiogender) {
        radioerror.innerHTML = "* Please Select Gender";
        // formValid = false;
    } else {
        radioerror.innerHTML = "";
    }

    //--------------------------validate for state dropdown
    const statedropdown = document.getElementsByName("state");  //return as array
    const stateerror = document.getElementById("errorstate");
    let errorstatedropdown = false;
    if (statedropdown[0].selectedIndex < 1) {
        stateerror.innerHTML = "* Please Select State";
        errorstatedropdown = true;
        // formValid = false;
    } else {
        stateerror.innerHTML = "";
        errorstatedropdown = false;
    }

    //---------------------------validate for relationship dropdown
    const relationshipdropdown = document.getElementsByName("relationship");
    const relationshiperror = document.getElementById("errorrelationship");
    let errorrelationshipdropdown = false;

    if (relationshipdropdown[0].selectedIndex < 1) {
        relationshiperror.innerHTML = "* Please Select RelationShip";
        // formValid = false;
        errorrelationshipdropdown = true;
    } else {
        relationshiperror.innerHTML = "";
        errorrelationshipdropdown = false;
    }


    //--------------------validate basic details
    let validatebasicdetailsstatus = validatebasicdetails();

    //-----------validate education details
    // if(!document.getElementById("sscresult").checked){

    // }else{
    // }
    let validateeducationdetailsstatus = validateeducationdetails();


    //-----------validte experience details
    let validateexperiencedetailsstatus = validateexperiencedetails();

    //------------validate reference details
    let validatereferencedetailsstatus = validatereferencedetails();

    //---------------validate preferance details
    let validatepreferancestatus = validatepreferance();

    //-------------validate technology known

    let validatetechnologyknownstatus = validatetechnologyknown();

    //------------validate language known
    let validatelanguageknownstatus = validatelanguageknown();


    // console.log(errorvalidaterequirefields);
    // console.log(errorradiogender);
    // console.log(errorstatedropdown);
    // console.log(errorrelationshipdropdown);
    // console.log(validatelanguageknownstatus);
    // console.log(validatetechnologyknownstatus);
    // console.log(validatepreferancestatus);
    // console.log(validatereferencedetailsstatus);
    // console.log(validateexperiencedetailsstatus);
    // console.log(validateeducationdetailsstatus);
    // console.log(validatebasicdetailsstatus);

    // Validation functions for specific sections
    const validationFunctions = [
        validatebasicdetails,
        validateeducationdetails,
        validateexperiencedetails,
        validatereferencedetails,
        validatelanguageknown,
        validatetechnologyknown,
        validatepreferance,
    ];


    // Only call the validation function related to the current section
    if (currenttab < validationFunctions.length) {
        // console.log("current tab"+currenttab);
        var validatefunction = validationFunctions[currenttab]();
        // alert(validatefunction);
    }

    // console.log(errorvalidaterequirefields);
    // console.log(errorradiogender);
    // console.log(errorstatedropdown);
    // console.log(errorrelationshipdropdown);
    // console.log(validatefunction);

    if (errorvalidaterequirefields || errorradiogender || errorstatedropdown || errorrelationshipdropdown || validatefunction) {
        console.log("error in form");
        return false;     // form has error
    } else {
        console.log("No Error");
        errorvalidaterequirefields = false;
        errorradiogender = true;
        errorstatedropdown = false;
        errorrelationshipdropdown = false;
        validatebasicdetailsstatus = false;
        // validatefunction = false;
        return true;
    }
}

function validatebasicdetails() {
    let arrayofbasicdetailsfields = ["Firstname", "Lastname", "Designation", "Address1", "Address2", "Email", "Phonenumber", "City", "Zipcode", "Dateofbirth"];

    let errorfoundbasicdetails = false;
    const regexwhitespace = /\s/;
    const regexemail = /^[a-z0-9]+@[a-z]+\.[a-z]{2,3}$/;
    const regxdateofbirth = /^([0-9]{4})-([0-9]{2})-([0-9]{2})$/;

    for (let i = 0; i < arrayofbasicdetailsfields.length; i++) {
        // console.log("for loop");

        switch (arrayofbasicdetailsfields[i]) {
            case "Firstname":
                const firstname = document.getElementById("fname");
                if (firstname.value.trim().length === 0 && firstname.value !== "") {
                    document.getElementById("errorfname").innerHTML = "* Please Enter Valid Firstname";
                    errorfoundbasicdetails = true;
                    // console.log("fname");
                }
                break;

            case "Lastname":
                const lastname = document.getElementById("lname");
                if (lastname.value.trim().length === 0 && lastname.value !== "") {
                    document.getElementById("errorlname").innerHTML = "* Please Enter Valid Lastname";
                    errorfoundbasicdetails = true;
                    // console.log("lname");
                }
                break;

            case "Designation":
                const designation = document.getElementById("designation");
                if (designation.value.trim().length === 0 && designation.value !== "") {
                    document.getElementById("errordesignation").innerHTML = "* Please Enter Valid Designation";
                    errorfoundbasicdetails = true;
                    // console.log("designation");
                }
                break;

            case "Address1":
                const address1 = document.getElementById("address1");
                if (address1.value.trim().length === 0 && address1.value !== "") {
                    document.getElementById("erroraddress1").innerHTML = "* Please Enter Valid Address1";
                    errorfoundbasicdetails = true;
                    // console.log("address1");
                }
                break;

            case "Address2":
                const address2 = document.getElementById("address2");
                if (address2.value.trim().length === 0 && address2.value !== "") {
                    document.getElementById("erroraddress2").innerHTML = "* Please Enter Valid Address2";
                    errorfoundbasicdetails = true;
                    // console.log("address2");
                }
                break;

            case "Email":
                const email = document.getElementById("email");
                if (!regexemail.test(email.value) && email.value !== "") {
                    document.getElementById("erroremail").innerHTML = "* Please Enter Valid Email";
                    errorfoundbasicdetails = true;
                    // console.log("email");
                }
                break;

            case "Phonenumber":
                const phonenumber = document.getElementById("phonenumber");
                if ((isNaN(phonenumber.value) || phonenumber.value.length !== 10 || phonenumber.value.trim().length === 0 || phonenumber.value.charAt(0) === "0") && phonenumber.value !== "") {
                    document.getElementById("errorphonenumber").innerHTML = "* Please Enter Valid phonenumber";
                    // console.log("phonenumber");
                    errorfoundbasicdetails = true;
                }
                break;

            case "City":
                const city = document.getElementById("city");
                if (city.value.trim().length === 0 && city.value !== "") {
                    document.getElementById("errorcity").innerHTML = "* Please Enter Valid City";
                    errorfoundbasicdetails = true;
                    // console.log("city");
                }
                break;

            case "Zipcode":
                const zipcode = document.getElementById("zipcode");
                if (isNaN(zipcode.value) || zipcode.value.trim().length === 0) {
                    document.getElementById("errorzipcode").innerHTML = "* Please Enter Valid Zipcode";
                    errorfoundbasicdetails = true;
                    // console.log("zipcode");
                }
                break;

            case "Dateofbirth":
                const dateofbirth = document.getElementById("dob");
                if (!regxdateofbirth.test(dateofbirth.value) && dateofbirth.value !== "") {
                    document.getElementById("errordateofbirth").innerHTML = "* Please Enter Valid Date(YYYY-MM-DD)";
                    errorfoundbasicdetails = true;
                    // console.log("dob");
                }
                break;
        }
    }

    // console.log("basic details  " + errorfoundbasicdetails);
    if (errorfoundbasicdetails) {
        errorfoundbasicdetails = false;
        return true;
    } else {
        return false;
    }
}

function validateeducationdetails() {
    let errorfoundeducationdetails = false;
    const educationdetailscheckbox = document.querySelectorAll(".educationdetailscheckbox");
    const reqerroreducationdetails = document.querySelectorAll(".reqerroreducationdetails");
    const reqerroreducationdetailsstyle = document.querySelectorAll(".reqerroreducationdetailsstyle");

    const percentageerror = document.querySelectorAll(".percentageerror");
    const errorpercentagestyle = document.querySelectorAll(".errorpercentagestyle");

    const passingyearerror = document.querySelectorAll(".passingyearerror");
    const errorpassingyearstyle = document.querySelectorAll(".errorpassingyearstyle");

    for (let i = 0; i < educationdetailscheckbox.length; i++) {
        if (educationdetailscheckbox[i].checked) {
            for (let j = 0; j < reqerroreducationdetails.length; j++) {
                if (reqerroreducationdetails[j].value.length === 0) {
                    reqerroreducationdetailsstyle[j].innerHTML = "* require";
                    errorfoundeducationdetails = true;
                } else if (reqerroreducationdetails[j].value.trim().length === 0 && reqerroreducationdetails[j].value !== "") {
                    reqerroreducationdetailsstyle[j].innerHTML = "* Please Enter Data Not Only Space";
                    errorfoundeducationdetails = true;
                } else {
                    reqerroreducationdetailsstyle[j].innerHTML = "";
                }
            }

            //if condition check error in percentage
            if (!errorfoundeducationdetails) {
                for (let k = 0; k < percentageerror.length; k++) {

                    let percentage = percentageerror[k].value;   //string type
                    let percentagefloat = parseFloat(percentage);  //convert into float

                    let passingyear = passingyearerror[k].value;  //string type
                    let passingyearint = parseInt(passingyear);
                    let cureent_year = new Date().getFullYear();

                    if (isNaN(percentagefloat) || percentagefloat < 0 || percentagefloat > 100) {
                        errorpercentagestyle[k].innerHTML = "* Please Enter Percentage between 0 and 100";
                        errorfoundeducationdetails = true;
                    } else {
                        errorpercentagestyle[k].innerHTML = "";
                    }

                    //passing year validation
                    if (isNaN(passingyearint)) {
                        errorpassingyearstyle[k].innerHTML = "* Only Number is Allow";
                        errorfoundeducationdetails = true;
                    }
                    else if (passingyear.length !== 4) {   //here length check in string
                        errorpassingyearstyle[k].innerHTML = "* Year is not proper";
                        errorfoundeducationdetails = true;
                    } else if ((passingyearint < 1950) || (cureent_year < passingyearint)) {
                        errorpassingyearstyle[k].innerHTML = "* please Enter year 1950 to Current year";
                        errorfoundeducationdetails = true;
                    } else {
                        errorpassingyearstyle[k].innerHTML = "";
                    }
                }
            }
        }
    }

    if (errorfoundeducationdetails) {
        for (let i = 0; i < educationdetailscheckbox.length; i++) {
            if (educationdetailscheckbox[i].checked) {
                educationdetailscheckbox[i].checked = true;
            }
        }
        errorfoundeducationdetails = false;
        return true;
    } else {
        return false;
    }
}

//----------functions for add education details component-------------------
function addsscresult() {
    const sscresultcheckbox = document.getElementById("sscresult");
    const sscresultcomponent = document.getElementById("sscresultcomponent");

    if (sscresultcheckbox.checked) {
        const tableadd = document.createElement("table");
        tableadd.setAttribute("id", "sscresulttable");
        // <%= errorobject.nameofboardssc%>
        // <%= errorobject.passingyearssc%>
        // <%= errorobject.percentagessc%>
        tableadd.innerHTML = `
                <tr>
                    <td>
                        <label for="nameofboardssc">Name Of Board</label>
                        <input type="text" id="nameofboardssc" class="reqerroreducationdetails" name="nameofboardssc">
                        <span class="reqerroreducationdetailsstyle"></span>
                    </td>
                    <td>
                        <label for="passingyearssc">Passing Year</label>
                        <input type="text" id="passingyearssc" name="passingyearssc" class="reqerroreducationdetails passingyearerror">
                        <span class="reqerroreducationdetailsstyle errorpassingyearstyle"></span>
                    </td>
                    <td>
                        <label for="percentagessc">Percentage</label>
                        <input type="text" id="percentagessc" name="percentagessc" class="reqerroreducationdetails percentageerror">
                        <span class="reqerroreducationdetailsstyle errorpercentagestyle"></span>
                    </td>
                </tr>`;

        sscresultcomponent.appendChild(tableadd);
    } else {
        let result = confirm("Are You Sure To Remove sscresult");

        if (result === true) {
            const sscresulttable = document.getElementById("sscresulttable");
            sscresulttable.remove();
        } else {
            sscresultcheckbox.checked = true;
        }
    }

}

function addhscresult() {
    const hscresultcheckbox = document.getElementById("hscresult");
    const hscresultcomponent = document.getElementById("hscresultcomponent");

    if (hscresultcheckbox.checked) {
        const tableadd = document.createElement("table");
        tableadd.setAttribute("id", "hscresulttable");
        // <%= errorobject.nameofboardhsc%>
        // <%= errorobject.passingyearhsc%>
        // <%= errorobject.percentagehsc%>
        tableadd.innerHTML = `
                <tr>
                    <td>
                        <label for="nameofboardhsc">Name Of Board</label>
                        <input type="text" id="nameofboardhsc" class="reqerroreducationdetails" name="nameofboardhsc">
                        <span class="reqerroreducationdetailsstyle"></span>
                    </td>
                    <td>
                        <label for="passingyearhsc">Passing Year</label>
                        <input type="text" id="passingyearhsc" class="reqerroreducationdetails passingyearerror" name="passingyearhsc">
                        <span class="reqerroreducationdetailsstyle errorpassingyearstyle"></span>
                    </td>
                    <td>
                        <label for="percentagehsc">Percentage</label>
                        <input type="text" id="percentagehsc" class="reqerroreducationdetails percentageerror" name="percentagehsc">
                        <span class="reqerroreducationdetailsstyle errorpercentagestyle"></span>
                    </td>
                </tr>`;

        hscresultcomponent.appendChild(tableadd);
    } else {
        let result = confirm("Are You Sure To Remove hscresult");

        if (result === true) {
            const hscresulttable = document.getElementById("hscresulttable");
            hscresulttable.remove();
        } else {
            hscresultcheckbox.checked = true;
        }
    }
}


function bachelordegreeresult() {
    const bachelordegreecheckbox = document.getElementById("bachelordegree");
    const bachelordegreecomponent = document.getElementById("bachelordegreecomponent");

    if (bachelordegreecheckbox.checked) {
        const tableadd = document.createElement("table");
        tableadd.setAttribute("id", "bachelordegreetable");
        // <%= errorobject.nameofcoursebachelor%>
        // <%= errorobject.nameofuniversitybachelor%>
        // <%= errorobject.passingyearbachelor%>

        tableadd.innerHTML = `
                <tr>
                    <td>
                        <label for="nameofcoursebachelor">Name Of Course</label>
                        <input type="text" id="nameofcoursebachelor" class="reqerroreducationdetails" name="nameofcoursebachelor">
                        <span class="reqerroreducationdetailsstyle"></span>
                    </td>
                    <td>
                        <label for="nameofuniversitybachelor">Name Of University</label>
                        <input type="text" class="reqerroreducationdetails" id="nameofuniversitybachelor" name="nameofuniversitybachelor">
                        <span class="reqerroreducationdetailsstyle"></span>
                    </td>
                    <td>
                        <label for="passingyearbachelor">Passing Year</label>
                        <input type="text" id="passingyearbachelor" class="reqerroreducationdetails passingyearerror" name="passingyearbachelor">
                        <span class="reqerroreducationdetailsstyle errorpassingyearstyle"></span>
                    </td>
                    <td>
                        <label for="percentagebachelor">Percentage</label>
                        <input type="text" id="percentagebachelor" class="reqerroreducationdetails percentageerror" name="percentagebachelor">
                        <span class="reqerroreducationdetailsstyle errorpercentagestyle"><%= errorobject.percentagebachelor%></span>
                    </td>
                </tr>`;
        bachelordegreecomponent.appendChild(tableadd);
    } else {
        let result = confirm("Are You Sure To Remove bachelordegree");

        if (result === true) {
            const bachelordegreetable = document.getElementById("bachelordegreetable");
            bachelordegreetable.remove();
        } else {
            bachelordegreecheckbox.checked = true;
        }
    }

}

function masterdegreeresult() {
    const masterdegreecheckbox = document.getElementById("masterdegree");
    const masterdegreecomponent = document.getElementById("masterdegreecomponent");

    if (masterdegreecheckbox.checked) {
        const tableadd = document.createElement("table");
        tableadd.setAttribute("id", "masterdegreetable");
        // <%= errorobject.nameofcoursemaster%>
        // <%= errorobject.nameofuniversitymaster%>
        // <%= errorobject.passingyearmaster%>

        tableadd.innerHTML = `
                <tr>
                    <td>
                        <label for="nameofcoursemaster">Name Of Course</label>
                        <input type="text" id="nameofcoursemaster" class="reqerroreducationdetails" name="nameofcoursemaster">
                        <span class="reqerroreducationdetailsstyle"></span>
                    </td>
                    <td>
                        <label for="nameofuniversitymaster">Name Of University</label>
                        <input type="text" id="nameofuniversitymaster" class="reqerroreducationdetails" name="nameofuniversitymaster">
                        <span class="reqerroreducationdetailsstyle"></span>
                    </td>
                    <td>
                        <label for="passingyearmaster">Passing Year</label>
                        <input type="text" id="passingyearmaster" name="passingyearmaster" class="reqerroreducationdetails passingyearerror">
                        <span class="reqerroreducationdetailsstyle errorpassingyearstyle"></span>
                    </td>
                    <td>
                        <label for="percentagemaster">Percentage</label>
                        <input type="text" id="percentagemaster" class="reqerroreducationdetails percentageerror" name="percentagemaster">
                        <span class="reqerroreducationdetailsstyle errorpercentagestyle"><%= errorobject.percentagemaster%></span>
                    </td>
                </tr>`;
        masterdegreecomponent.appendChild(tableadd);
    } else {
        let result = confirm("Are You Sure To Remove masterdegree");

        if (result === true) {
            const masterdegreetable = document.getElementById("masterdegreetable");
            masterdegreetable.remove();
        } else {
            masterdegreecheckbox.checked = true;
        }
    }
}


//-------------------------validate Experience Details-------------------------------
function validateexperiencedetails() {
    let errorfoundexperience = false;

    const reqerrorexperience = document.querySelectorAll(".reqerrorexperience");
    const reqerrorexperiencestyle = document.querySelectorAll(".reqerrorexperiencestyle");

    const companydateerror = document.querySelectorAll(".companydateerror");
    const companydateerrorstyle = document.querySelectorAll(".companydateerrorstyle");

    const current_year = new Date().getFullYear();
    const regexdate = /^([0-9]{4})-([0-9]{2})-([0-9]{2})$/;


    for (let i = 0; i < reqerrorexperience.length; i++) {
        if (reqerrorexperience[i].value.length === 0) {
            reqerrorexperiencestyle[i].innerHTML = "* require";
            errorfoundexperience = true;
        } else if (reqerrorexperience[i].value.trim().length === 0 && reqerrorexperience[i].value !== "") {
            reqerrorexperiencestyle[i].innerHTML = "* Please enter valid data";
            errorfoundexperience = true;
        } else {
            reqerrorexperiencestyle[i].innerHTML = "";
        }
    }

    for (let i = 0; i < companydateerror.length; i++) {
        if (!regexdate.test(companydateerror[i].value) && companydateerror[i].value !== "") {
            companydateerrorstyle[i].innerHTML = "* Please Enter Valid Date YYYY-MM-DD";
            errorfoundexperience = true;
        } else if (companydateerror[i].value.split("-")[0] > current_year) {
            companydateerrorstyle[i].innerHTML = "* Date is greate than current year";
        } else {
            companydateerrorstyle[i].innerHTML = "";
        }
    }


    if (errorfoundexperience) {
        errorfoundexperience = false;
        return true;
    } else {
        return false;
    }
}
//-------------------------------function to add Experience Details------------------------------

function countexperience() {
    const existexperience = document.querySelectorAll(".companynameerror");
    return existexperience.length;
}

function addexperience() {
    const experience = document.getElementById("experience");

    const experiencecomponent = document.createElement("tr");
    experiencecomponent.setAttribute("class", "experiencecomponent");
    let experiencecomponent_id = countexperience() + 1;

    experiencecomponent.innerHTML = `
    <td>
        <label for="companyname${experiencecomponent_id}">Company Name</label>
        <input type="text" id="companyname${experiencecomponent_id}" name="companyname" class="reqerrorexperience companynameerror companyname">
        <span class="reqerrorexperiencestyle companynameerrorstyle"></span>
    </td>
    <td>
        <label for="companydesignation${experiencecomponent_id}">Designation</label>
        <input type="text" id="companydesignation${experiencecomponent_id}" name="companydesignation" class="reqerrorexperience companydesignationerror companydesignation">
        <span class="reqerrorexperiencestyle companydesignationerrorstyle"></span>
    </td>

    <td>
        <label for="companyfrom${experiencecomponent_id}">From</label>
        <input type="text" id="companyfrom${experiencecomponent_id}" name="companyfrom" class="reqerrorexperience companydateerror companyfrom">
        <span class="reqerrorexperiencestyle companydateerrorstyle"></span>
    </td>
    <td>
        <label for="companyto${experiencecomponent_id}">To</label>
        <input type="text" id="companyto${experiencecomponent_id}" name="companyto" class="reqerrorexperience companydateerror companyto">
        <span class="reqerrorexperiencestyle companydateerrorstyle"></span>
    </td>
    <td>
        <a href="#fieldsetexperience" class="removeexperiencebutton" id="removeexperiencebutton${experiencecomponent_id}" onclick="removeaddexperiencebutton(this)"><i class="fa-solid fa-trash"></i></a>
    </td>`;

    experience.appendChild(experiencecomponent);
}

function removeaddexperiencebutton(button) {
    const button_id = button.id;
    const parent = document.getElementById(button_id).parentNode;
    const parenttoparent = parent.parentNode;

    const confirmremove = confirm("Are You Sure To Remove Experience?");

    if (confirmremove) {
        parenttoparent.remove();
    }
}


//-------------validate Reference Details

function validatereferencedetails() {
    let errorfoundreference = false;

    const reqerrorreference = document.querySelectorAll(".reqerrorreference");
    const reqerrorreferencestyle = document.querySelectorAll(".reqerrorreferencestyle");

    const referencenumbererror = document.querySelectorAll(".referencenumbererror");
    const referencenumbererrorstyle = document.querySelectorAll(".referencenumbererrorstyle");


    for (let i = 0; i < reqerrorreference.length; i++) {
        if (reqerrorreference[i].value.length === 0) {
            reqerrorreferencestyle[i].innerHTML = "* require";
            errorfoundreference = true;
        } else if (reqerrorreference[i].value.trim().length === 0 && reqerrorreference[i].value !== "") {
            reqerrorreferencestyle[i].innerHTML = "* Please enter valid data";
            errorfoundreference = true;
        } else {
            reqerrorreferencestyle[i].innerHTML = "";
        }
    }

    // for(let i=0;i<referencenumbererror.length;i++){
    //     if(isNaN((referencenumbererror[i].value) || referencenumbererror[i].value.length !== 10 && referencenumbererror[i].value.charAt(0) === "0") && companydateerror[i].value !== ""){
    //         referencenumbererrorstyle[i].innerHTML = "* Please Enter Valid Phonenumber";
    //         errorfoundreference = true;
    //     }
    // }

    for (let i = 0; i < referencenumbererror.length; i++) {
        if ((isNaN(referencenumbererror[i].value) || referencenumbererror[i].value.length !== 10 || referencenumbererror[i].value.charAt(0) === "0") && referencenumbererror[i].value !== "") {
            referencenumbererrorstyle[i].innerHTML = "* Please Enter Valid Phonenumber";
            errorfoundreference = true;
        } else {
            referencenumbererrorstyle[i].innerHTML = "";
        }
    }

    if (errorfoundreference) {
        errorfoundreference = false;
        return true;
    } else {
        return false;
    }
}

//-------------------------------function to add Reference Details------------------------------

function countreference() {
    const existreference = document.querySelectorAll(".referencenameerror");
    return existreference.length;
}

function addreference() {
    const reference = document.getElementById("referencecontact");

    const referencecomponent = document.createElement("tr");
    referencecomponent.setAttribute("class", "referencecomponent");
    let referencecomponent_id = countreference() + 1;

    referencecomponent.innerHTML = `
    <td>
        <label for="referencename${referencecomponent_id}">Name</label>
        <input type="text" id="referencename${referencecomponent_id}" name="referencename" class="reqerrorreference referencenameerror referencename">
        <span class="reqerrorreferencestyle"></span>
    </td>
    <td>
        <label for="referencenumber${referencecomponent_id}">Contact Number</label>
        <input type="text" id="referencenumber${referencecomponent_id}" name="referencenumber" class="reqerrorreference referencenumbererror referencenumber">
        <span class="reqerrorreferencestyle referencenumbererrorstyle"></span>
    </td>
    <td>
        <label for="referencerelation${referencecomponent_id}">Relation</label>
        <input type="text" id="referencerelation${referencecomponent_id}" name="referencerelation" class="reqerrorreference referencerelation">
        <span class="reqerrorreferencestyle"></span>
    </td>
    <td>
        <a href="#referencecontactfieldset" class="removereferencebutton" id="removereferencebutton${referencecomponent_id}" onclick="removereferencebutton(this)"><i class="fa-solid fa-trash"></i></a>
    </td>`;

    reference.appendChild(referencecomponent);
}

function removereferencebutton(button) {
    const button_id = button.id;
    const parent = document.getElementById(button_id).parentNode;
    const parenttoparent = parent.parentNode;

    const confirmremove = confirm("Are You Sure To Remove Reference?");

    if (confirmremove) {
        parenttoparent.remove();
    }
}


//------------------validation Preferance Details----------------
// function validatepreferance(){
//     let errorfoundpreferance = false;
//     const preferancedropdown = document.querySelectorAll(".preferancedropdown");
//     const preferancedropdownerrorstyle = document.querySelectorAll(".preferancedropdownerrorstyle");

//     const errorpreferance = document.querySelectorAll(".errorpreferance");
//     const errorpreferancestyle = document.querySelectorAll('.errorpreferancestyle');


//     for(let i=0;i<preferancedropdown.length;i++){
//         if(preferancedropdown[i].selectedIndex < 1){
//             preferancedropdownerrorstyle[i].innerHTML = "* require";
//             errorfoundpreferance = true;
//         }else{
//             preferancedropdownerrorstyle[i].innerHTML = "";
//         }
//     }

//     for(let i=0;i<errorpreferance.length;i++){
//         if((isNaN(errorpreferance[i].value) || errorpreferance[i].value.trim().length === 0) && errorpreferance[i].value !== ""){
//             errorpreferancestyle[i].innerHTML = "* Please Enter only number";
//             errorfoundpreferance = true;
//         }else{
//             errorpreferancestyle[i].innerHTML = "";
//         }
//     }

//     if(errorfoundpreferance){
//         errorfoundpreferance = false
//         return true;
//     }else{
//         return false;
//     }
// }

function validatepreferance() {
    let errorfoundpreferance = false;
    const preferancedropdown = document.querySelectorAll(".preferancedropdown");
    const preferancedropdownerrorstyle = document.querySelectorAll(".preferancedropdownerrorstyle");

    const errorpreferance = document.querySelectorAll(".errorpreferance");
    const errorpreferancestyle = document.querySelectorAll('.errorpreferancestyle');

    // Reset error messages
    preferancedropdownerrorstyle.forEach(style => style.innerHTML = "");
    errorpreferancestyle.forEach(style => style.innerHTML = "");

    // Validate dropdowns
    // preferancedropdown.forEach((dropdown, index) => {
    //     if (dropdown.selectedIndex < 1) {
    //         preferancedropdownerrorstyle[index].innerHTML = "* require";
    //         errorfoundpreferance = true;
    //     }
    // });

    // Validate input fields
    errorpreferance.forEach((input, index) => {
        if ((isNaN(input.value) || input.value.trim().length === 0) && input.value !== "") {
            errorpreferancestyle[index].innerHTML = "* Please Enter only number";
            errorfoundpreferance = true;
        }
    });

    // Return validation status
    return !errorfoundpreferance;
}

//-----------Technology Known

function validatetechnologyknown() {
    let errortechnologyknown = false;
    const technologycheckbox = document.querySelectorAll(".reqtechnologyproficiency");
    const reqtechnologyproficiencystyle = document.querySelectorAll(".reqtechnologyproficiencystyle");

    const technologyproficiencyclass = [".firsttechnologyproficiency", ".secondtechnologyproficiency", ".thirdtechnologyproficiency", ".fourthtechnologyproficiency"];

    let statusfortechproficiencychecked = true;

    for (let i = 0; i < technologycheckbox.length; i++) {
        if (technologycheckbox[i].checked) {
            let techproficiencyradio = document.querySelectorAll(technologyproficiencyclass[i]);

            for (let j = 0; j < techproficiencyradio.length; j++) {
                if (!techproficiencyradio[j].checked) {
                    statusfortechproficiencychecked = false;
                } else {
                    statusfortechproficiencychecked = true;
                    break;
                }
            }

            if (!statusfortechproficiencychecked) {
                reqtechnologyproficiencystyle[i].innerHTML = "* Please Select Technology Proficiency";
                errortechnologyknown = true;
            } else {
                reqtechnologyproficiencystyle[i].innerHTML = "";
            }
        }
    }

    if (errortechnologyknown) {
        errortechnologyknown = false
        return true;
    } else {
        return false;
    }
}


//-----------Language Known
function validatelanguageknown() {
    // console.log("in function language");

    let errorfoundlanguageknown = false;
    const reqlanguageproficiency = document.querySelectorAll('.reqlanguageproficiency');
    const reqlanguageproficiencystyle = document.querySelectorAll(".reqlanguageproficiencystyle");

    const languageproficiency = [".firstlanguageproficiency", ".secondlanguageproficiency", ".thirdlanguageproficiency"];

    let statusforlanguageproficiencychecked = true;

    for (let i = 0; i < reqlanguageproficiency.length; i++) {
        if (reqlanguageproficiency[i].checked) {
            // console.log("checked");
            let languageproficiencycheckebox = document.querySelectorAll(languageproficiency[i]);

            for (let j = 0; j < languageproficiencycheckebox.length; j++) {
                if (!languageproficiencycheckebox[j].checked) {
                    // console.log("not check proficiency");
                    statusforlanguageproficiencychecked = false;
                } else {
                    statusforlanguageproficiencychecked = true;
                    // console.log("check proficiency");
                    break;
                }
            }

            if (!statusforlanguageproficiencychecked) {
                // console.log("Error language");
                reqlanguageproficiencystyle[i].innerHTML = "* Please Select language proficiency";
                errorfoundlanguageknown = true;
            } else {
                errorfoundlanguageknown = false;
                reqlanguageproficiencystyle[i].innerHTML = "";
            }
        }
    }

    if (errorfoundlanguageknown) {
        errorfoundlanguageknown = false;
        return true;
    } else {
        return false;
    }
}
