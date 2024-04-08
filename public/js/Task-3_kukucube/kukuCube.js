function DefaultTable(status){
    var table = document.getElementById("mytable");
    var colorForCell = RandomColor();

    if(status){
        for(var i=0;i<2;i++){
            var tr=document.createElement("tr");
            for(var j=0;j<2;j++){
                var td=document.createElement("td");
                td.style.backgroundColor = colorForCell;
                td.style.opacity = 1.0;
                tr.appendChild(td);
            }
            table.appendChild(tr);
        }
    }

    var totalRow = table.rows.length;
    var countCellInOneRow = table.rows[totalRow - 1].cells.length;
    var totalCell = totalRow * countCellInOneRow;

    var min = 0;
    var max = totalCell;

    var randomNumberForCell = Math.floor(Math.random() * (max-min)+min);

    var alltd = document.querySelectorAll('td');
    alltd[randomNumberForCell].style.opacity = 0.5;
    alltd[randomNumberForCell].setAttribute("onclick","expandTable(this)");
}

function RandomColor(){
    var randomColor = "#";
    var string = "0123456789abcdef";
    var min = 0;
    var max = string.length;
     for(var i=0;i<6;i++){
        var randomNumber = Math.floor(Math.random() * (max-min)+min);
        var char = string.charAt(randomNumber);
        randomColor += char;
     }

     if(randomColor == "#f5f5dc" || randomColor == "#ffffff"){
        return "#ffff00";
     }else{
        return randomColor;
     }
}

function AddNewRow_AddNewColumn(){
    var table=document.getElementById("mytable");
    var totalRow = table.rows.length;
    var countCellInOneRow = table.rows[totalRow-1].cells.length;
    var tr=document.createElement('tr');
    var temp = 0;
    while(temp<countCellInOneRow){
        var td=document.createElement('td');
        tr.appendChild(td);
        temp++;
    }
    table.appendChild(tr);

    //add new column

    var totalNewRow = table.rows.length;
    var alltr = document.querySelectorAll('tr');

    for(var i=0;i<totalNewRow;i++){
        var td = document.createElement('td');
        alltr[i].appendChild(td);
    }
}

var score = 0 ;
function expandTable(cell){
    var mytable = document.getElementById("mytable");
    var totalRow = mytable.rows.length;

    if(totalRow < 13){
        AddNewRow_AddNewColumn();
    }

    var color = RandomColor();
    var allCell = document.querySelectorAll('td');

    for(var i=0;i<allCell.length;i++){
        allCell[i].style.backgroundColor = color;
    }

    cell.removeAttribute("onclick");
    cell.style.opacity = 1.0;

    score++;
    document.getElementById("score").innerHTML = score;
    DefaultTable(0);
}

var count=60;
var timer = setInterval(()=>{
    count--;
    document.getElementById('timer').innerHTML = count;

    if(count == 0){
        clearInterval(timer);
        alert("Game Over!");
        alert("Your Score is:"+score);
        score = 0;
    }
},1000);