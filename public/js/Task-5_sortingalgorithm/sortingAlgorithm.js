//Sorting Algorithm

//sort the array elements without using inbuilt sorting function

// var arr = [25, 56, 20, 2,10, 12];
var arr = ["Vasu","vasu","Parsaniya","parsaniya","1","2"];
// var arr = ['A1', 'A10', 'A11', 'A12', 'A3A', 'A3B', 'A3', 'A4', 'B10', 'B2', 'F1', '1', '2', 'F3'];

function GivenArray(){
    document.getElementById("givenarray").innerHTML = "["+arr+"]";
}

function BubbleSort() {
    for (var i = 0; i < arr.length; i++) {
        for (var j = 0; j < arr.length - i - 1; j++) {
            if (arr[j] > arr[j + 1]) {
                var temp = arr[j];
                arr[j] = arr[j + 1];
                arr[j + 1] = temp;
            }
        }
    } 
    document.getElementById("sortedarray").innerHTML = "["+arr+"]";
}
function InsertionSort(){
    for(var i=1;i<arr.length;i++){
        var element = arr[i];
        j = i-1;
        while(j>=0 && arr[j]>element){
            arr[j+1] = arr[j];
            j--;
        }
        arr[j+1] = element;
    }
    document.getElementById("insertionsort").innerHTML = "["+arr+"]";
}