async function calltaskroute(route){
    try {
        var response = await fetch(route, {
            method: 'GET',                                 //most route method is GET
            headers: {
                'Content-Type': 'application/json',
                'authorization': `Bearer ${localStorage.getItem("token")}`
            }
        });

        if (!response.ok) {
            console.log("Error From Authentication");
            throw new Error("Error From Authentication");
        }else{
            window.open(`${window.location.protocol}//${window.location.hostname}:${window.location.port}${route}`, '_blank');
            // let url = window.URL.createObjectURL(response.blob());
            // window.open(url,"_blank").focus();
        }
        

    } catch (error) {
        console.log(error);

        if (response.status === 401 || response.status === 403) {
            const responseerror = await response.json();

            if(responseerror.message){
                console.log(responseerror.message);
                messagepopup(responseerror.message);

                let redirecttohomepage = setTimeout(()=>{
                    window.open(`${window.location.protocol}//${window.location.hostname}:${window.location.port}/`, '_self');
                },2000);
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