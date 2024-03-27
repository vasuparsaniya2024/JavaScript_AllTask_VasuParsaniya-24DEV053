// var user_id;
async function forgotpassword() {

    const forgotpasswordboxinput = document.querySelectorAll(".passwordbox input");

    let forgotpasswordData = {};

    if (forgotpasswordboxinput.length !== 0) {
        forgotpasswordboxinput.forEach((input) => {
            forgotpasswordData[input.name] = input.value;
        });
    }

    // let erroratfrontend = false;
    let errorobject = forgotpasswordvalidation(forgotpasswordData);


    // errorobject = {};
    //frontend side error show

    if (Object.keys(errorobject).length > 0) {
        errorshow(errorobject);
        // erroratfrontend = true;
        console.log("error in frontend forgot password");
    } else {
        //if frontend side not error then fetch()
        console.log("fetch call in forgotpassword");
        // console.log(registrationData);

        try {
            var response = await fetch('/forgotpassword', {
                method: 'POST',
                body: JSON.stringify(forgotpasswordData),
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (!response.ok) {
                console.log("Error From Backend");
                throw new Error("Error From Backend");
            }

            if (response.status === 200) {
                document.getElementById("acticationlinkbox").style.display = "block";
                const forgotpasswordresponse = await response.json();

                if (forgotpasswordresponse.message) {
                    messagepopup(forgotpasswordresponse.message);
                }

                const activationlink = document.getElementById("activationlink");
                activationlink.textContent = `${window.location.protocol}//${window.location.hostname}:${window.location.port}/forgotpasswordlink?id=${forgotpasswordresponse.userid}&activationcode=${forgotpasswordresponse.activationcode}`;

                activationlink.setAttribute("href", `${window.location.protocol}//${window.location.hostname}:${window.location.port}/forgotpasswordlink?id=${forgotpasswordresponse.userid}&activationcode=${forgotpasswordresponse.activationcode}`);

            }
        } catch (error) {
            console.log(error);

            if (response.status === 400) {
                const errorobject = await response.json()
                console.log(errorobject);
                errorshow(errorobject);
            }

            if (response.status === 404) {
                const forgotpasswordresponse = await response.json();
                messagepopup(forgotpasswordresponse.message);
            }

            if (response.status === 500) {
                const forgotpasswordresponse = await response.json();

                messagepopup(forgotpasswordresponse.message);
            }
        }
    }
}


//use to show error
function errorshow(errorobject) {
    const allspan = document.querySelectorAll(".errorspan");
    allspan.forEach((element) => {
        element.remove();
    });

    if (Object.keys(errorobject).length > 0) {
        for (let element in errorobject) {
            const suberrorobject = errorobject[element];
            for (let ele in suberrorobject) {
                const targetelement = document.querySelector(`[name="${ele}"]`);
                if (targetelement) {
                    const errorSpan = targetelement.nextElementSibling;

                    if (errorSpan && errorSpan.classList.contains("errorspan")) {
                        errorSpan.textContent = suberrorobject[ele];
                    } else {
                        //if already not present then add new
                        const createspan = document.createElement("span");
                        createspan.textContent = suberrorobject[ele];
                        createspan.setAttribute("class", "errorspan");
                        createspan.style.color = "red";
                        targetelement.insertAdjacentElement("afterend", createspan);
                    }
                }
            }
        }
    }

}

//show message pop up
function messagepopup(message) {
    var messagepopupdiv = document.getElementById("messagepopupdiv");
    //before move further make above div none
    const alreadymessagepopup = document.querySelectorAll(".messagepopup");
    // alert(alreadymessagepopup.length);
    if (alreadymessagepopup.length > 0) {
        alreadymessagepopup.forEach((element) => {
            element.remove();
        });
    }

    const createp = document.createElement('p');
    createp.setAttribute("class", "messagepopup");
    createp.style.color = "red";
    createp.style.backgroundColor = "snow";
    createp.style.padding = "10px";
    createp.style.maxWidth = "150px";
    createp.style.overflowWrap = "break-word";
    createp.style.transition = ".5s ease";
    createp.style.transitionDelay = ".2s";
    createp.style.transitionDuration = ".4s";
    createp.style.borderRadius = "10px";
    createp.textContent = message;

    messagepopupdiv.style.display = "block";

    messagepopupdiv.appendChild(createp);
}

async function showpasswordbox() {

    console.log("Show Password Call");

    const passwordbox = document.getElementById("passwordbox");
    // const thankyoubox = document.getElementById("thankyoubox");

    //now when this function is call then we first check that particular user have active their activationcode
    //so i send that ser id and activationcode to the post request

    const href = window.location.href;
    const querystring = href.split('?')[1];
    const subquery = querystring.split("&");
    const user_id = subquery[0].split("=")[1];
    const activationcode = subquery[1].split("=")[1];
    console.log(user_id);
    console.log(activationcode);

    const sendobject = {};
    sendobject.userid = user_id;
    sendobject.activationcode = activationcode;

    // console.log(sendobject);

    const response = await fetch('/checkactivationlink', {
        method: 'POST',
        body: JSON.stringify(sendobject),
        headers: {
            'Content-Type': 'application/json'
        }
    });

    const responsefromcheck = await response.json();

    console.log(responsefromcheck.message);

    //activationdata is not valid
    if (response.status === 401) {
        const hidepassword = document.getElementById("setpasswordbutton");
        hidepassword.style.display = "none";

        //password box none
        passwordbox.style.display = "none";

        messagepopup(responsefromcheck.message);


        //add button for regenerate link
        const thankyoubox = document.getElementById("thankyoubox");
        const createp = document.createElement("p");
        createp.setAttribute("id", `regeneratelinkbutton`);    //regenerate link id
        createp.setAttribute("onclick", `regeneratelink(${user_id})`);    //regenerate link with parameter user id
        createp.textContent = "Regenerate Link Please Click Me";
        createp.style.padding = "20px";
        createp.style.backgroundColor = "aliceblue";
        createp.style.borderRadius = "20px";
        createp.style.marginTop = "10px";
        createp.style.textAlign = "center";
        createp.style.cursor = "pointer";
        thankyoubox.appendChild(createp);
    }

    if (response.status === 200) {
        passwordbox.style.display = "block";
        // pageexpire(60,user_id);
    }
}

async function regeneratelink(userid) {
    //sendpost request

    console.log("Regenerate Function call");

    const user = {}
    user.userid = userid;
    const response = await fetch('/regenerateactivationcode', {
        method: 'POST',
        body: JSON.stringify(user),
        headers: {
            'Content-Type': 'application/json'
        }
    });

    const regenerateresponse = await response.json();

    const passwordbox = document.getElementById("passwordbox");
    const regeneratelinkbutton = document.getElementById("regeneratelinkbutton");

    if (response.status === 200) {
        //password box none
        passwordbox.style.display = "block";
        regeneratelinkbutton.style.display = "none";


        window.open(`${window.location.protocol}//${window.location.hostname}:${window.location.port}/forgotpasswordlink?id=${regenerateresponse.userid}&activationcode=${regenerateresponse.activationcode}`, '_self');
    }

    if (response.status === 500) {
        messagepopup(regenerateresponse.message);   //show messagepopoup
        regeneratelinkbutton.style.display = "block";
    }
}


//------Now logic for password save----------

async function usernewpasswordset() {

    const href = window.location.href;
    const querystring = href.split('?')[1];
    const subquerystring = querystring.split('&');
    const userid = subquerystring[0].split('=')[1];
    const activationcode = subquerystring[1].split('=')[1];

    // console.log(userid);
    // console.log(activationcode);
    const passwordboxinput = document.querySelectorAll(".passwordbox input");

    let passwordData = {};

    if (passwordboxinput.length !== 0) {
        passwordboxinput.forEach((input) => {
            passwordData[input.name] = input.value;
        });
    }

    let errorobject = newforgotpasswordvalidation(passwordData);

    if (Object.keys(errorobject).length > 0) {
        console.log(errorobject);
        errorshow(errorobject);
        console.log("error in frontend forgot password set");
    } else {
        //if frontend side not error then fetch()
        console.log("fetch call forgot password set");
        // console.log(registrationData);

        passwordData.userid = userid;
        passwordData.activationcode = activationcode;

        try {
            var response = await fetch('/updatepassword', {
                method: 'POST',
                body: JSON.stringify(passwordData),
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (!response.ok) {
                console.log("Error From forgot password set Backend");
                throw new Error("Error From forgot password set Backend");
            }

            if (response.status === 200) {
                const passwordinsertresponse = await response.json();

                if (passwordinsertresponse.message) {

                    messagepopup(passwordinsertresponse.message);
                }

                // // console.log(message);
                // const activationlink = document.getElementById("activationlink");
                // activationlink.setAttribute("href",`${window.location.protocol}//${window.location.hostname}:${window.location.port}/checkactivationlink?id=${userregistrationresponse.userid}&activationcode=${userregistrationresponse.activationcode}`);
            }
        } catch (error) {
            // console.error(error);

            //backend side validation error fire from middleware
            if (response.status === 400) {
                const errorobject = await response.json()
                console.log(errorobject);
                errorshow(errorobject);
            }

            const newpasswordresponse = await response.json();

            if (response.status === 401) {
                // const passwordinsertresponse = await response.json();
                messagepopup(newpasswordresponse.message);

                //here hide password section

                const hidepassword = document.getElementById("setpasswordbutton");
                hidepassword.style.display = "none";

                //password box none
                passwordbox.style.display = "none";

                //add button for regenerate link
                const thankyoubox = document.getElementById("thankyoubox");
                const createp = document.createElement("p");
                createp.setAttribute("id", `regeneratelinkbutton`);    //regenerate link id
                createp.setAttribute("onclick", `regeneratelink(${userid})`);    //regenerate link with parameter user id
                createp.textContent = "Regenerate Link Please Click Me";
                createp.style.padding = "20px";
                createp.style.backgroundColor = "aliceblue";
                createp.style.borderRadius = "20px";
                createp.style.marginTop = "10px";
                createp.style.textAlign = "center";
                createp.style.cursor = "pointer";
                thankyoubox.appendChild(createp);

            }


            if (response.status === 404) {
                // const passwordinsertresponse = await response.json();
                messagepopup(newpasswordresponse.message);
            }

            if (response.status === 409) {
                // const passwordinsertresponse = await response.json();
                messagepopup(newpasswordresponse.message);
            }

            if (response.status === 500) {
                messagepopup(newpasswordresponse.message);
            }
        }
    }
}
