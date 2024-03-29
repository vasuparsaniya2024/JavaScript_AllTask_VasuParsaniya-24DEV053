async function userlogin(){
    
    const loginboxinput = document.querySelectorAll('.loginbox input');
    

    let loginData = {};

    if(loginboxinput.length !== 0){
        loginboxinput.forEach((input)=>{
            loginData[input.name] = input.value;
        });
    }
    console.log("Login Data"+loginData);

    let errorobject = userloginvalidation(loginData);

    //frontend error
    if(Object.keys(errorobject).length > 0){
        //show error
        errorshow(errorobject);
    }else{
        //backend side error show and response message
        console.log("Fetch call login");

        try{
            var response = await fetch('/userlogin',{
                method:'POST',
                body: JSON.stringify(loginData),
                headers:{
                    "Content-Type":"application/json"
                }
            });

            if(!response.ok){
                console.log("Error from backend in login");
                throw new Error("Error From Backend In Login");
            }

            if(response.status === 200){                
            const loginresponse = await response.json();
            // console.log(loginresponse);
                //handle success message
                if(loginresponse.message){
                messagepopup(loginresponse.message);
                }

                //we use cookie so this not need
                
                // if(loginresponse.token){
                //     localStorage.setItem("token",loginresponse.token); //token store in localStorage
                // }

                window.open(`${window.location.protocol}//${window.location.hostname}:${window.location.port}/listtask`, '_self');

                
                // var temp = await fetch('/temp',{
                //     method:'POST',
                //     body: JSON.stringify(loginData),
                // headers:{
                //     "Content-Type":"application/json",
                //     "authorization":"token " + `${localStorage.getItem("token")}`
                // }
                // });

                // if(temp.status === 403){
                //     const res = await temp.json();
                //     messagepopup(res.message);
                // }           
            }
            
        }catch(error){
            console.log(error);
                        
            if (response.status === 400) {
                const errorobject = await response.json()
                console.log(errorobject);
                errorshow(errorobject);
            }

            //other response status handle
            const loginresponse = await response.json();
            if(response.status === 401){
                //handle success message
                if(loginresponse.message){
                    // console.log(loginresponse.message);
                messagepopup(loginresponse.message);
                }
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