// -------------------Mouse Events
function OnClick(){
    alert("onclick() event is Trigger");
}

function OnMouseOver(){
    alert("onmouseover() event is Trigger");
}

function OnMouseOut(){
    alert("onmouseout() event is Trigger");
}

function OnMouseDown(){
    alert("onmousedown() event is Trigger");
}

function OnMouseUp(){
    alert("onmouseup() event is Trigger");
}

function OnMouseMove(){
    alert("onmousemove() event is Trigger");
}

function OnMouseEnter(){
    alert("onmouseenter() event is Trigger");
}

function OnMouseWheel(){
    alert("onmousewheel() event is Trigger");
}


// --------------------Keyboard Events
function OnKeyDown(){
    alert("onkeydown() is Trigger");
}

function OnKeyUp(){
    alert("onkeyup() is Trigger");
}

function OnKeyPress(){
    alert("onkeypress() is Trigger");
}

// ---------------------Form Events
function OnFocus(){
    alert("onfocus() is Trigger");
}

function OnBlur(){
    alert("onblur() is Trigger");
}

function OnChange(){
    alert("onchange() is Trigger");
}

function OnContextMenu(){
    alert("oncontextmenu() event is Trigger");
}

function OnInput(){
    alert("oninput() event is Trigger");
}

function OnSelect(){
    alert("onselect() event is Trigger");
}



//--------------------Clip Board
function OnCopy(){
    alert("oncopy() event is Trigger");
}

function OnCut(){
    alert("oncut() event is Trigger");
}

function OnPaste(){
    alert("onpaste() event is Trigger");
}


//------------------Drag Events
function OnDrag(){
    alert("ondrag() event is Trigger");
}

function OnDragEnd(){
    alert("ondragend() event is Trigger");
}

function OnDragEnter(){
    alert("ondragenter() event is Trigger");
}

function OnDragLeave(){
    alert("ondragleave() event is Trigger");
}

function OnDragOver(){
    alert("ondragover() event is Trigger");
}

function OnDragStart(){
    alert("ondragstart() event is Trigger");
}

function ondragstart(event){
    event.dataTransfer.setData("text",event.target.id);
    alert("Drag Started");
}

function allowDrop(event){
    event.preventDefault();
}

function drop(event){
    event.preventDefault();
    const data=event.dataTransfer.getData("Text");
    alert("Dropped!!");
}
function OnDrop(event){
    alert("ondrop() event is Trigger");
}

function OnScroll(){
    alert("onscroll() event is Trigger");
}


//-----------Window Events

function OnError(){
    alert("onerror() event is Trigger");
}

function OnHashChange(){
    alert("onhashchange() event is Trigger");
}

function changepart(){
    location.hash="part5";
}

function OnLoad(){
    alert("onload() event is Trigger");
}

function OnPageShow(){
    alert("onpageshow() event is Trigger");
}

function OnResize(){
    alert("onresize() event is Trigger");
}