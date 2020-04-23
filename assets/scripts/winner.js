//winning states 8.
//[][], [][], [][]  columns all same value || rows all same value || (row===col && row+col===2
function winner(boardState) {
    xCount = 0;
    oCount = 0;
    result = '';
    xRowCoordinates= [];
    xColCoordinates= [];
    oRowCoordinates= [];
    oColCoordinates= [];
    for (i=0; i<boardState.length;i++){     // row
        for (j=0; j<boardState[i].length;j++){      // col
            if (boardState[i][j]==='X'){
                xCount+=1;
                xRowCoordinates.push(i);
                xColCoordinates.push(j);
            }  
            else if (boardState[i][j]==='O'){
                 oCount+=1;
                 oRowCoordinates.push(i);
                 oColCoordinates.push(j);
            }
        }
    }

    if( containsThree(0,xRowCoordinates) || containsThree(1,xRowCoordinates) || containsThree(2,xRowCoordinates) ||
    containsThree(0,xColCoordinates) || containsThree(1,xColCoordinates) || containsThree(2,xColCoordinates) || containsDiagonalThree(xRowCoordinates,xColCoordinates) ) {
        result = 'X is winner!';
    } else if ( containsThree(0,oRowCoordinates) || containsThree(1,oRowCoordinates) || containsThree(2,oRowCoordinates) ||
    containsThree(0,oColCoordinates) || containsThree(1,oColCoordinates) || containsThree(2,oColCoordinates) || containsDiagonalThree(oRowCoordinates,oColCoordinates) ) {
        result = 'O is winner!';
    } else result = 'No winner';

    return result;
}

function containsThree(element,array){  // determines whether line contains 3 'X's or 'O's, NOT for diagonals!
    var sameLine=[];
    var i=array.indexOf(element);
    while (i!=-1) {
        sameLine.push(i);
        i=array.indexOf(element,i+1);
    }
    if(sameLine.length >2) return true;
    else return false;
}

function containsDiagonalThree(array1,array2){
    // top left to bottom right.
    counter=0;
    for(i=0;i<array1.length;i++){
        if(array1[i]===array2[i]) counter++;
    }
    if (counter>2) return true;     
    // top right to bottom left.
    counter=0;
    for(i=0;i<array1.length;i++){
        if(array1[i]+array2[i]===2) counter++;
    }
    if (counter>2) return true; 
    return false;
}