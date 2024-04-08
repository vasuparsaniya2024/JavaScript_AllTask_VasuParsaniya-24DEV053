async function formdata() {
    // alert("formdata call");

    const jobapplicationform = document.getElementById("JobApplicationForm");

    alert(jobapplicationform);
    //form input value in key-value pair 
    const formData = new FormData(jobapplicationform);

    //formData object to plan javascript object

    const jobapplicationformdata = {};

    // console.log(formData);

    for (let [key, value] of formData.entries()) {
        jobapplicationformdata[key] = value;
    }

    //experience details in array convert and put in object jobapplicationdata

    let companyname = [];
    let companydesignation = [];
    let companyfrom = [];
    let companyto = [];
    // console.log(jobapplicationformdata);


    let cname = document.querySelectorAll(".companyname");
    let cdesignation = document.querySelectorAll(".companydesignation");
    let cfrom = document.querySelectorAll(".companyfrom");
    let cto = document.querySelectorAll(".companyto");

    for (let key in jobapplicationformdata) {
        if (key === "companyname") {
            delete jobapplicationformdata[key];
            for (let i = 0; i < cname.length; i++) {
                companyname.push(cname[i].value);
            }
            jobapplicationformdata[key] = companyname;
        }
        if (key === "companydesignation") {
            delete jobapplicationformdata[key];
            for (let i = 0; i < cname.length; i++) {
                companydesignation.push(cdesignation[i].value);
            }
            jobapplicationformdata[key] = companydesignation;
        }

        if (key === "companyfrom") {
            delete jobapplicationformdata[key];
            for (let i = 0; i < cfrom.length; i++) {
                companyfrom.push(cfrom[i].value);
            }
            jobapplicationformdata[key] = companyfrom;
        }
        if (key === "companyto") {
            delete jobapplicationformdata[key];
            for (let i = 0; i < cto.length; i++) {
                companyto.push(cto[i].value);
            }
            jobapplicationformdata[key] = companyto;
        }
    }


    //language known details in array convert and put in object jobapplicationdata
    let lname = document.querySelectorAll(".language");
    let lread = document.querySelectorAll(".languageread");
    let lwrite = document.querySelectorAll(".languagewrite");
    let lspeak = document.querySelectorAll(".languagespeak");

    let language = [];
    let languageread = [];
    let languagewrite = [];
    let languagespeak = [];

    for (let i = 0; i < lname.length; i++) {
        if (lname[i].checked) {
            language.push(lname[i].value);
        }
    }

    for (let i = 0; i < lread.length; i++) {
        if (lread[i].checked) {
            languageread.push(lread[i].value);
        }
    }

    for (let i = 0; i < lwrite.length; i++) {
        if (lwrite[i].checked) {
            languagewrite.push(lwrite[i].value);
        }
    }

    for (let i = 0; i < lspeak.length; i++) {
        if (lspeak[i].checked) {
            languagespeak.push(lread[i].value);
        }
    }

    if (language.length !== 0) {
        jobapplicationformdata["language"] = language;
    }

    if (languageread.length !== 0) {
        jobapplicationformdata["languageread"] = languageread;
    }

    if (languagewrite.length !== 0) {
        jobapplicationformdata["languagewrite"] = languagewrite;
    }

    if (languagespeak.length !== 0) {
        jobapplicationformdata["languagespeak"] = languagespeak;
    }

    //technology known details in array convert and put in object jobapplicationdata

    let technology = [];
    let technologyproficiency = [];

    let tech = document.querySelectorAll(".technology");
    let techproarray = [".firsttechnologyproficiency", ".secondtechnologyproficiency", ".thirdtechnologyproficiency", ".fourthtechnologyproficiency"]

    for (let i = 0; i < tech.length; i++) {
        if (tech[i].checked) {
            let techproficiency = document.querySelectorAll(techproarray[`${i}`]);
            for (let j = 0; j < techproficiency.length; j++) {
                if (techproficiency[j].checked) {
                    // alert("alert "+techproficiency.length);
                    technology.push(tech[i].value);

                    technologyproficiency.push(techproficiency[j].value);
                }
            }
        }
    }

    if (technology.length !== 0 && technologyproficiency.length !== 0) {
        jobapplicationformdata["technology"] = technology;
        jobapplicationformdata["technologyproficiency"] = technologyproficiency;
    }



    //reference contact details in array convert and put in object jobapplicationdata
    let rname = document.querySelectorAll(".referencename");
    let rnumber = document.querySelectorAll(".referencenumber");
    let rrelation = document.querySelectorAll(".referencerelation");

    let referencename = [];
    let referencenumber = [];
    let referencerelation = [];


    for (let key in jobapplicationformdata) {
        if (key === "referencename") {
            delete jobapplicationformdata[key];
            for (let i = 0; i < rname.length; i++) {
                referencename.push(rname[i].value);
            }
            jobapplicationformdata[key] = referencename;
        }
        if (key === "referencenumber") {
            delete jobapplicationformdata[key];
            for (let i = 0; i < rnumber.length; i++) {
                referencenumber.push(rnumber[i].value);
            }
            jobapplicationformdata[key] = referencenumber;
        }

        if (key === "referencerelation") {
            delete jobapplicationformdata[key];
            for (let i = 0; i < rrelation.length; i++) {
                referencerelation.push(rrelation[i].value);
            }
            jobapplicationformdata[key] = referencerelation;
        }
    }


    // console.log(jobapplicationformdata);

    // alert(window.location.pathname);
    if (window.location.pathname === "/jobapplicationformajax") {
        const response = await fetch(`/jobapplicationformsubmitajax`, {
            method: 'POST',
            body: JSON.stringify(jobapplicationformdata),
            headers: {
                'Content-Type': 'application/json'
            }
        });

        const formsubmitmessage = document.getElementById("formsubmitmessage");
        const responsemessage = await response.json();
        // console.log(responsemessage.message);
        formsubmitmessage.classList.add("formsubmitmessagestyle");
        formsubmitmessage.innerHTML = responsemessage.message;
        formsubmitmessage.style.backgroundColor = "aquamarine";
        formsubmitmessage.style.padding = "20px";
        formsubmitmessage.style.borderRadius = "20px";
        formsubmitmessage.style.fontSize = "25px";
        formsubmitmessage.style.color = "blue";
        formsubmitmessage.style.width = "50%";
        formsubmitmessage.style.transition = ".5s ease";
        formsubmitmessage.style.marginTop = "10px";

    } else if (window.location.pathname === "/jobapplicationformupdateajax") {

        const url = window.location.href;
        const querystring = url.split("?")[1];
        const studentidquerystring = querystring.split("&")[0]; //for the safty because new query parameter add then need
        const student_id = studentidquerystring.split("=")[1];
        // alert(student_id);

        jobapplicationformdata.student_id = student_id;

        const responseupdate = await fetch(`/jobapplicationformupdatesuccessfullyajax`, {
            method: 'POST',
            body: JSON.stringify(jobapplicationformdata),
            headers: {
                'Content-Type': 'application/json'
            }
        });

        const formsubmitmessage = document.getElementById("formsubmitmessage");
        const responsemessage = await responseupdate.json();
        // console.log(responsemessage.message);
        formsubmitmessage.classList.add("formsubmitmessagestyle");

        formsubmitmessage.innerHTML = responsemessage.message;
        formsubmitmessage.style.backgroundColor = "aquamarine";
        formsubmitmessage.style.padding = "20px";
        formsubmitmessage.style.borderRadius = "20px";
        formsubmitmessage.style.fontSize = "25px";
        formsubmitmessage.style.color = "blue";
        formsubmitmessage.style.width = "50%";
        // formsubmitmessage.style.position = "absolute";
        // formsubmitmessage.style.bottom = "0";
        // formsubmitmessage.style.left = "100%";
        formsubmitmessage.style.transition = ".5s ease";
        formsubmitmessage.style.marginTop = "10px";
    }
}