//---------------------Java Script Add New Row & Column and A;so Delete using HTML DOM Table Object-------------------
function addNewRow(){
    //first we count total row 
    //then how many column that row contains
    var table=document.getElementById("AddRowColumn");
    var totalRow=table.rows.length;
    var countCell = table.rows[totalRow-1].cells.length; 

    var insertNewRow = table.insertRow(-1);

    for(var i=0;i<countCell;i++){
        insertNewRow.insertCell(i);    //insert Cell
    }
}

function removeRow(){
    var table=document.getElementById("AddRowColumn");
    var totalRow = table.rows.length;

    if(totalRow > 2){
        if(confirm("Are You Sure To Delete Row?")){
            table.deleteRow(-1);
        }
    }
    
}

function addNewColumn(){
    var table=document.getElementById('AddRowColumn');
    var rowss = table.getElementsByTagName('tr');

    for(var i=0;i<rowss.length;i++){
        var countCell = table.rows[i].cells.length; 
        rowss[i].insertCell(countCell);    //rowss[i],insertCell(countCell);  cellcount start from 0 index
    }
}

function removeNewColumn(){
    var table = document.getElementById('AddRowColumn');
    var rowss = table.getElementsByTagName('tr');
    var totalRow=table.rows.length;
    var countCell = table.rows[totalRow-1].cells.length; 

    if(rowss[0].cells.length>2){
        if(confirm("Are you sure to delete column?")){
            for(var i=0;i<rowss.length;i++){
                var countCell = table.rows[i].cells.length; 
                rowss[i].deleteCell(-1);    //rowss[i],insertCell(countCell);  cellcount start from 0 index
            }
        }
    }
}