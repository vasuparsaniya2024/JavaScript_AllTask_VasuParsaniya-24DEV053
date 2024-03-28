async function selectcity(){
    const city = document.getElementById("city").value;
    // alert(city);

    const cityobject = {}
    cityobject.cityname = city;
    const response = await fetch('/citytimezone',{
        method:'POST',
        body: JSON.stringify(cityobject),
        headers: {
            'Content-Type': 'application/json'
        }
    });

    const cityresponse = await response.json();


    let timezonediv = document.getElementById("timezone");
    timezonediv.style.display = "flex";
    timezonediv.style.flexDirection = "column";
    timezonediv.style.gap = "10px";

    timezonediv.innerHTML = "";
    //current time
    const currenttimediv = document.createElement('div');
    currenttimediv.style.backgroundColor = "chocolate";
    currenttimediv.style.padding = "10px";
    currenttimediv.style.borderRadius = "10px";



    const createcurrenttimep = document.createElement('p');
    createcurrenttimep.textContent = "Current Time";
    createcurrenttimep.style.backgroundColor = "white";
    createcurrenttimep.style.padding = "20px";
    createcurrenttimep.style.fontSize = "25px";
    createcurrenttimep.style.textAlign = "center";

    currenttimediv.appendChild(createcurrenttimep);


    const currenttimep = document.createElement('p');
    currenttimep.textContent = cityresponse.currenttime;
    currenttimep.style.backgroundColor = "cornsilk";
    currenttimep.style.padding = "20px";
    currenttimep.style.fontSize = "20px";


    currenttimediv.appendChild(currenttimep);
    timezonediv.appendChild(currenttimediv);

    //---------------

    //selectcity time
    const selectcitytimediv = document.createElement('div');
    selectcitytimediv.style.backgroundColor = "chocolate";
    selectcitytimediv.style.padding = "10px";
    selectcitytimediv.style.borderRadius = "10px";


    const selectcitytimep = document.createElement('p');
    selectcitytimep.textContent = `${city} Time`;
    selectcitytimep.style.backgroundColor = "white";
    selectcitytimep.style.padding = "20px";
    selectcitytimep.style.fontSize = "25px";
    selectcitytimep.style.textAlign = "center";

    selectcitytimediv.appendChild(selectcitytimep);

    const selecttimep = document.createElement('p');
    selecttimep.textContent = cityresponse.selectcitytime;
    selecttimep.style.backgroundColor = "cornsilk";
    selecttimep.style.padding = "20px";
    selecttimep.style.fontSize = "20px";


    selectcitytimediv.appendChild(selecttimep);

    timezonediv.appendChild(selectcitytimediv);

} 
   
