function TicTacToe(){
    var totalCell = 9;
    var alltd = document.querySelectorAll('td');

    for(var i=0;i<totalCell;i++){
        alltd[i].setAttribute("onclick","XO(this)");
    }
    document.getElementById("turn").innerHTML = "O";
    // document.getElementById("restart").setAttribute("onclick","Restart()");
}


var click = 0;
var clickForDecideWinner = 0;
var indexForPlayerO = 0;
var indexForPlayerX = 0;
var playerO = [];
var playerX = [];
var validPairForWinner = [[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]];

var statusForFinalWinner_O = false;
var statusForWinnerInProgress_O = false;

var statusForFinalWinner_X = false;
var statusForWinnerinProgress_X = false;

function XO(cell){
    var sign = ["O","X"];
    var cellId = cell.getAttribute("id");

    if(click % 2 == 0){
        document.getElementById("sign"+cellId).innerHTML = sign[0];
        document.getElementById('turn').innerHTML = "X";
        click++;
        playerO[indexForPlayerO++] = cellId;
    }else{
        document.getElementById("sign"+cellId).innerHTML = sign[1];
        document.getElementById('turn').innerHTML = "O";
        click++;
        playerX[indexForPlayerX++] = cellId;
    }
    cell.removeAttribute("onclick");

    if(click == 9){
        document.getElementById("turn").innerHTML = "Game Finished";
    }

    if(click>4){
        
        // playerO.sort(function(a,b){return a-b});
        // playerX.sort(function(a,b){return a-b});

        var lengthOfPlayerO = playerO.length;
        var lengthOfPlayerX = playerX.length;

        if(clickForDecideWinner % 2 == 0){
            //--------------------for Player O

            for(var i=0;i<validPairForWinner.length;i++){
                for(var j=0;j<3;j++){
                    const temp = validPairForWinner[i][j];
                    // alert("answer"+temp);
                    for(var k=0;k<lengthOfPlayerO;k++){
                        if(playerO[k] == temp){
                            statusForWinnerInProgress_O = true;
                            break;
                        }else{
                            statusForWinnerInProgress_O = false;
                        }
                        // alert("playerOMove:"+playerO[k]+" "+statusForWinnerInProgress_O);
                    }
                    if(statusForWinnerInProgress_O){
                        statusForFinalWinner_O = true;
                    }else{
                        statusForFinalWinner_O = false;
                        break;
                    }
                }

                if(statusForFinalWinner_O){
                    document.getElementById("winner").innerHTML = "O";
                    document.getElementById("turn").innerHTML = " ";
                    const alltd = document.querySelectorAll("td");
                    for(var l=0;l<9;l++){
                        alltd[l].removeAttribute("onclick");
                    }
                }
            } 
            clickForDecideWinner++;
        }
        else{
            //----------------player X
            for(var i=0;i<validPairForWinner.length;i++){
                for(var j=0;j<3;j++){
                    const temp = validPairForWinner[i][j];
                    for(var k=0;k<lengthOfPlayerX;k++){
                        if(playerX[k] == temp){
                            statusForWinnerinProgress_X = true;
                            break;
                        }else{
                            statusForWinnerinProgress_X = false;
                        }
                    }

                    if(statusForWinnerinProgress_X){
                        statusForFinalWinner_X = true;
                    }else{
                        statusForFinalWinner_X = false;
                        break;
                    }
                }

                if(statusForFinalWinner_X){
                    document.getElementById("winner").innerHTML = "X";
                    const alltd = document.querySelectorAll("td");

                    for(var l=0;l<9;l++){
                        alltd[l].removeAttribute("onclick");
                    }
                }
            }
            clickForDecideWinner++;
        }
    }
}


