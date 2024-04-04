async function liststudentdata(){
    const response = await fetch("/allstudentlist",{
        method:'GET'
    });
    const studentarray = await response.json();

    // console.log(studentarray.length);
    const studenttable = document.getElementById("studenttable");

    //th create
    const createthead = document.createElement("thead");
    const createtrforth = document.createElement('tr');
    createtrforth.setAttribute("class","tableheader");
 
    for(let key in studentarray[0]){
        const createth = document.createElement('th');
        createth.textContent = key;
        createtrforth.appendChild(createth);
    }
    const createth = document.createElement('th');
    createth.textContent = "Update";
    createtrforth.appendChild(createth);
    createthead.appendChild(createtrforth);
    studenttable.appendChild(createthead);

    //data load in tr
    for(let element of studentarray){
        const createtr = document.createElement("tr");
        for(let key in element){
            const createtd = document.createElement("td");
            createtd.setAttribute("class","studentdatatd");
            createtd.textContent = element[key];
            createtr.appendChild(createtd);
        }
        const createupdatebutton = document.createElement("p");
        createupdatebutton.textContent = "Update"
        createupdatebutton.setAttribute("id",`student${element.StudentId}`);
        createupdatebutton.setAttribute("class","updatebutton");
        createupdatebutton.setAttribute("onclick","updatestudentdata(this)");
        createtr.appendChild(createupdatebutton);
        studenttable.appendChild(createtr);
    }
}

async function updatestudentdata(student){
    const tempid = student.id;
    const student_id = tempid.split('student')[1];
    
    const response = await fetch(`/jobapplicationformupdate?student_id=${student_id}`,{
        method: 'GET',
        success: window.location.replace(window.location.protocol + "//" +
        window.location.host + `/jobapplicationformupdate?student_id=${student_id}`)
    });
}

function hidetable(){
    const updatetable = document.getElementById("studenttable");
    updatetable.setAttribute("class","hidetable");

    //call route /jobapplicationform

    // const xml = new XMLHttpRequest();
    // xml.open('GET',`${window.location.protocol}//${window.location.host}/jobapplicationform`,true);
    // xml.send();
    window.location.href = `${window.location.protocol}//${window.location.host}/jobapplicationform`;
}

function showtable(){
    const updatetable = document.getElementById("studenttable");
    const section = document.getElementById("studentsection");
    section.style.height = "100%";
    updatetable.removeAttribute("class","hidetable");
    updatetable.setAttribute("class","showtable");
}