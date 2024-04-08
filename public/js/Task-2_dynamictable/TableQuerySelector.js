function Default(){
    var table = document.getElementById('AddRowColumn');
    for(var i=0;i<2;i++){
        var tr=document.createElement('tr');
        for(var j=0;j<2;j++){
            var td = document.createElement('td');
            tr.appendChild(td);
        }
        table.appendChild(tr);
    }
}

function addNewRow(){
    var table=document.getElementById('AddRowColumn');
    var totalRow = table.rows.length;
    var countCell = table.rows[totalRow-1].cells.length;
    var newRow = document.createElement('tr');
    // var tr = document.querySelectorAll('tr');
    var temp=0;

    while(temp < countCell){
        var newCell = document.createElement('td');
        newRow.appendChild(newCell);
        temp++;
    }

    // tr.forEach( () => {
    // var newCell = document.createElement("td");
    // tr.appendChild(newCell);
    // });
    table.appendChild(newRow);
}

function removeRow(){
    var table=document.getElementById('AddRowColumn');
    var totalRow = table.rows.length;

    var removeRow = document.getElementsByTagName('tr');
    if(totalRow>2){
        removeRow[totalRow-1].remove('tr');
    }
    
}

function addNewColumn(){
    var table = document.getElementById('AddRowColumn');
    var totalRow = table.rows.length;
    var countCell = table.rows[totalRow-1].cells.length;

    var tr=document.querySelectorAll('tr');
    for(var i=0;i<totalRow;i++){
        var newCell = document.createElement('td');
        tr[i].appendChild(newCell);
    }
}

function removeNewColumn(){
    var table = document.getElementById('AddRowColumn');
    var totalRow = table.rows.length;
    var countCell = table.rows[totalRow-1].cells.length;


    // var tr=document.ruerySelectorAll('tr');
    var removeRow = document.getElementsByTagName('tr');


    if(countCell>2){
        for(var i=0;i<totalRow;i++){
            var row = removeRow[i];
            row.removeChild(row.lastElementChild);
        }
    }
    
}

