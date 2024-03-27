//tab switch

function opentab(event,tabname){
    var i, tabcontent, tablink;
    tabcontent = document.getElementsByClassName("collanguage2");
    for(i=0;i<tabcontent.length;i++){
        tabcontent[i].style.display = "none";
    }

    tablink = document.getElementsByClassName("tablink");
    for(i=0;i<tablink.length;i++){
        tablink[i].className = tablink[i].className.replace("active","");
        // alert(tablink[i].parentElement.parentElement.className);
        tablink[i].parentElement.parentElement.style.backgroundColor = "#FBFCFE"; 
        //access the parent to parent element
    }
    document.getElementById(tabname).style.display = "block";
    event.currentTarget.className += " active";
    event.currentTarget.parentElement.parentElement.style.backgroundColor = "#F0F6FF";
}


//-------------------------------slider

function sliderLeft(){
    var row = document.getElementById("rowforslider");
    row.scrollLeft -= 100;
}

function sliderRight(){
    var row = document.getElementById("rowforslider");
    row.scrollLeft += 100;
}


